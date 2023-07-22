// Get current URL
const currentURL = location.search;

// Fix current URL by replacing '+' with ' '
const fixedURL = currentURL.replace(/\+/g, ' ');

// Loop through the query string and create an array based on name and value
const data = {};
if (fixedURL) {
  fixedURL
    .substr(1)
    .split('&')
    .forEach(item => {
      var substr = item.split('='),
      key = substr[0],
      value = substr[1] && decodeURIComponent(substr[1]);
      (data[key] = data[key] || []).push(value);
    });
}

// Create a new table
const table = document.createElement('table');
table.className += 'summary-table';

// Add the table header
const tr = document.createElement('tr');
const leftRow = document.createElement('td');
const rightRow = document.createElement('td');
tr.appendChild(leftRow);
tr.appendChild(rightRow);
table.appendChild(tr);

// Add the table rows
for (const name in data) {
  const value = data[name];
  const tr = document.createElement('tr');
  const leftRow = document.createElement('td');
  leftRow.innerHTML = name + ':';
  tr.appendChild(leftRow);

  const rightRow = document.createElement('td');
  rightRow.innerHTML = value;
  tr.appendChild(rightRow);
  table.appendChild(tr);
}

// Add the created table to the HTML page
document.querySelector('.wrapper').appendChild(table);
