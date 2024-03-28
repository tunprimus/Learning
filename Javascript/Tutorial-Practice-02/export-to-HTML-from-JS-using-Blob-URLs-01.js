//@ts-check

/**
 * @author Jim Nielsen
 * @link https://blog.jim-nielsen.com/2020/export-to-html-from-javascript-using-blob-urls/
 * @param {string} html 
 */
function openHtmlInNewTab(html) {
	let a = document.createElement('a');
	a.setAttribute(
		'href',
		'data:text/html;charset=utf-8,'
		+ encodeURIComponent(html));
	a.setAttribute('target', '_blank');
	a.style.display = 'none';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

openHtmlInNewTab('<h1>Hello World</h1>');
