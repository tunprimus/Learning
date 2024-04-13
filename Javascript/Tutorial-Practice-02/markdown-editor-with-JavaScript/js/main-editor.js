// import * as marked from './marked.umd.min.js';
import * as marked from './marked.min.js';
// import * as DOMPurify from 'dompurify';
import * as cleanHTML from './clean-HTML.js';

/**
 * Event listener is used to update the preview when the `markdown-content` textarea changes
 */
document.getElementById('markdown-content').addEventListener('input', function() {
	// Get references to the elements
	const markdownContent = document.getElementById('markdown-content');
	const htmlPreview = document.getElementById('html-preview');

	// Convert Markdown to HTML
	const htmlContent = marked.parse(markdownContent.value);
	// Sanitise the generated HTML and display it
	htmlPreview.innerHTML = cleanHTML(htmlContent);
});

document.getElementById('editor-mode').addEventListener('click', function() {
	// Toggle the presence of the class 'distraction-free' on the element with the id 'editor'.
	document.getElementById('editor').classList.toggle('distraction-free');
});
