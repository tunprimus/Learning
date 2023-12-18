// Disable enter key on input
function stopEnterKey(evt) {
  var evt = evt ? evt : event ? event : null;
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
  if (evt.keyCode === 13 && node.type === 'text') {
    return false;
  }
}

document.onkeypress = stopEnterKey;

// Declare tab variable
const tab = document.querySelectorAll('.tab');

// Set tab
let currentTab = 0;
showTab(currentTab);

// Display tab
function showTab(num) {
  tab[num].style.display = 'block';
  if (num === 0) {
    document.querySelector('#prevBtn').style.display = 'none';
  } else {
    document.querySelector('#prevBtn').style.display = 'inline'
  }

  if (num === tab.length - 1) {
    document.querySelector('#nextBtn').innerHTML = 'Submit';
  } else {
    document.querySelector('#nextBtn').innerHTML = 'Next';
  }
  fixStepIndicator(num);
}

// Show correct tab
function nextPrev(num) {
  if (num === 1 && !validateForm()) {
    return false;
  }
  tab[currentTab].style.display = 'none';
  currentTab = currentTab + num;

  if (currentTab >= tab.length) {
    document.querySelector('#application').submit();
    return false;
  }
  showTab(currentTab);
}

// Form validation
function validateForm() {
  let valid = true;

  // Select all types of input and put them into array
  const inputs = tab[currentTab].querySelectorAll('input, select, textarea');

  // A loop that checks every input field in the current tab:
  inputs.forEach((input) => {
    function warning() {
      alert('Please fill in your ' + input.name.toLowerCase() + '.');
    }
    if (!input.value) {
      warning();
      valid = false;
    } else if (input === document.querySelector('input[type=radio]') && !document.querySelector('input[type=radio]:checked')) {
      warning();
      valid = false;
    } else if (input === document.querySelector('input[type=checkbox]') && !document.querySelector('input[type=checkbox]:checked')) {
      warning();
      valid = false;
    }
  });

  // Add class if valid
  if (valid) {
    document.querySelectorAll('.step')[currentTab].className += ' finish';
  }

  // Return the valid status
  return valid;
}

// Remove active class
function fixStepIndicator(num) {
  const steps = document.querySelectorAll('.step');
  steps.forEach(step => {
    step.className = step.className.replace(' active', '');
  });
  steps[num].className += ' active';
}
