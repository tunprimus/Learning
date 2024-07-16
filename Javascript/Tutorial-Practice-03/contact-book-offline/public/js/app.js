//@ts-check

const CONTACT_ID_ATTR_NAME = 'data-contractid';
const CONTACT_REMOVE_CONFIRM = 'Are you sure?';
const NO_CONTACTS_TEXT = 'No contacts';

class ContactBook {
	constructor(storeClass, remote) {
		this.store = new storeClass('contacts', remote, () => this.refresh()); // Refresh contact list when data changes

		this.init();
		this.refresh();
		this.toggleContactFormEditing(false);
	}

	init() {
		this.initElements();
		this.initItemTemplate();
		this.attachHandlers();
	}

	initElements() {
		this.contactList = document.getElementById('contactList');

		this.contactDetailsForm = document.getElementById('contactDetails');
		this.contactIdField = document.getElementById('contactId');
		this.firstNameField = document.getElementById('firstname');
		this.surnameField = document.getElementById('surname');
		this.phoneField = document.getElementById('phone');

		this.addContactButton = document.getElementById('addContact');
		this.editContactButton = document.getElementById('editContact');
		this.removeContactButton = document.getElementById('removeContact');
		this.saveContactButton = document.getElementById('saveContact');
		this.cancelEditButton = document.getElementById('cancelEdit');
	}

	initItemTemplate() {
		let contactListItem = this.contactList.querySelector('li');
		this.contactList.removeChild(contactListItem);
		this._contactTemplate = contactListItem;
	}

	attachHandlers() {
		this.contactDetailsForm.addEventListener('submit', evt => evt.preventDefault());

		this.addContactButton.addEventListener('click', () => this.addContact());

		this.editContactButton.addEventListener('click', () => this.editContact());
		this.removeContactButton.addEventListener('click', () => this.removeContact());
		this.saveContactButton.addEventListener('click', () => this.saveContact());
		this.cancelEditButton.addEventListener('click', () => this.cancelEdit());
	}

	refresh() {
		this.store.getAll().then(contacts => {
			this.sortContacts(contacts);
			this.renderContactList(contacts);
		});
	}

	sortContacts(contacts) {
		contacts.sort((contact1, contact2) => {
			return (contact1.firstname + contact1.surname).localeCompare(contact2.firstname + contact2.surname);
		});
	}

	renderContactList(contacts) {
		this.contactList.innerHTML = '';
		this.contactList.appendChild(this.createContactList(contacts));
	}

	createContactList(contacts) {
		if (!contacts.length) {
			return this.createNoDataItem();
		}

		const result = document.createDocumentFragment();
		contacts.forEach(contact => {
			result.appendChild(this.createContact(contact));
		});
		return result;
	}

	createNoDataItem() {
		let result = document.createElement('li');
		result.className = 'contact-list-empty';
		result.textContent = NO_CONTACTS_TEXT;
		return result;
	}

	createContact(contact) {
		let result = this._contactTemplate.cloneNode(true);
		result.setAttribute(CONTACT_ID_ATTR_NAME, contact._id);
		result.querySelector('.contact-name').innerText = contact.firstName + ' ' + contact.surname;
		result.querySelector('.contact-phone').innerText = contact.phone;
		result.addEventListener('click', evt => this.showContact(evt));
		return result;
	}

	showContact(evt) {
		// Get contact id from the clicked element attributes
		let contactId = evt.currentTarget.getAttribute(CONTACT_ID_ATTR_NAME);
		// Get contact by id
		this.store.get(contactId).then((contact) => {
			// Show contact details
			this.setContactDetails(contact);
			// Turn off editing
			this.toggleContactFormEditing(false);
		});
	}

	addContact() {
		this.setContactDetails({ firstName: 'Name' });
		this.toggleContactFormEditing(true);
	}

	editContact() {
		// Get id of selected contact
		let contactId = this.getContactId();
		// Get contact by id
		this.store.get(contactId).then((contact) => {
			// Show contact details
			this.setContactDetails(contact);
			// Turn on editing
			this.toggleContactFormEditing(true);
		});
	}

	saveContact() {
		// Get contact details from edit form
		let contact = this.getContactDetails();
		// Save contact
		this.store.save(contact).then(() => {
			// Clear contact details form
			this.setContactDetails({});
			// Turn off editing
			this.toggleContactFormEditing(false);
			// Refresh contact list
			this.refresh();
		});
	}

	removeContact() {
		// Ask user to confirm deletion
		if (!window.confirm(CONTACT_REMOVE_CONFIRM)) {
			return;
		}

		// Get id of selected contact
		let contactId = this.getContactId();

		// Remove contact by id
		this.store.remove(contactId).then(() => {
			// Clear contact details form
			this.setContactDetails({});
			// Turn off editing
			this.toggleContactFormEditing(false);
			// Refresh contact list
			this.refresh();
		});
	}

	cancelEdit() {
		this.setContactDetails({});
		this.toggleContactFormEditing(false);
	}

	getContactDetails() {
		return {
			_id: this.getContactId(),
			firstName: this.firstNameField.value,
			surname: this.surnameField.value,
			phone: this.phoneField.value,
		};
	}

	getContactId() {
		return this.contactIdField.value;
	}

	setContactDetails(contactDetails) {
		this.contactIdField.value = contactDetails._id || '';
		this.firstNameField.value = contactDetails.firstName || '';
		this.surnameField.value = contactDetails.surname || '';
		this.phoneField.value = contactDetails.phone || '';
	}

	toggleContactFormEditing(isEditing) {
		const isContactSelected = !this.getContactId();

		this.toggleFade(this.contactDetailsForm, !isEditing && isContactSelected);

		this.toggleElement(this.editContactButton, !isEditing && !isContactSelected);
		this.toggleElement(this.removeContactButton, !isEditing && !isContactSelected);

		this.toggleElement(this.addContactButton, !isEditing);
		this.toggleElement(this.saveContactButton, !isEditing);
		this.toggleElement(this.cancelEditButton, !isEditing);

		this.toggleDisabled(this.firstNameField, !isEditing);
		this.toggleDisabled(this.surnameField, !isEditing);
		this.toggleDisabled(this.phoneField, !isEditing);

		this.firstNameField.focus();
		this.firstNameField.setSelectionRange(0, this.firstNameField.value.length);
	}

	toggleElement(element, isShown) {
		element.style.display = isShown ? 'block' : 'none';
	}

	toggleFade(element, isFade) {
		element.style.opacity = isFade ? 0.5 : 1;
	}

	toggleDisabled(element, isDisabled) {
		if (isDisabled) {
			element.setAttribute('disabled', '');
		} else {
			element.removeAttribute('disabled');
		}
	}
}

window.ContactBook = ContactBook;
