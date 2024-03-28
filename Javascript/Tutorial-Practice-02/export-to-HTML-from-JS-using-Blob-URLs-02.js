//@ts-check

/**
 * @author Jim Nielsen
 * @link https://blog.jim-nielsen.com/2020/export-to-html-from-javascript-using-blob-urls/
 * @param {Array} data 
 */
function dataToHtml(data) {
	let html = `
		<html>
			<head>
				<meta charset="UTF-8">
				<title>${data.some.value}</title>
			</head>
			<body>
				<h1>${data.some.otherValue}</h1>
				<hr />
				${data.array.map((thing) => thing.nestedHtml).join("")}
			</body>
		</html>
	`;
	const blob = new Blob([html], { type: 'text/html' });
	const blobUrl = URL.createObjectURL(blob);
	window.open(blobUrl, '_blank');
}

