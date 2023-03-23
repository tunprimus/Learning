/*
An HTML table is built with the following tag structure:

<table>
    <tr>
        <th>name</th>
        <th>height</th>
        <th>place</th>
    </tr>
    <tr>
        <td>Kilimanjaro</td>
        <td>5895</td>
        <td>Tanzania</td>
    </tr>
</table>

For each row, the <table> tag contains a <tr> tag. Inside of these <tr> tags, we can put cell elements: either heading cells (<th>) or regular cells (<td>).
Given a data set of mountains, an array of objects with name, height, and place properties, generate the DOM structure for a table that enumerates the objects. It should have one column per key and one row per object, plus a header row with <th> elements at the top, listing the column names.
Write this so that the columns are automatically derived from the objects, by taking the property names of the first object in the data.
Add the resulting table to the element with an id attribute of "mountains" so that it becomes visible in the document.
Once you have this working, right-align cells that contain number values by setting their style.textAlign property to "right".
*/

const MOUNTAINS = [
    {name: "Kilimanjaro", height: 5895, place: "Tanzania"},
    {name: "Everest", height: 8848, place: "Nepal"},
    {name: "Mount Fuji", height: 3776, place: "Japan"},
    {name: "Vaalserberg", height: 323, place: "Netherlands"},
    {name: "Denali", height: 6168, place: "United States"},
    {name: "Popocatepetl", height: 5465, place: "Mexico"},
    {name: "Mont Blanc", height: 4808, place: "Italy/France"}
];

const divElement = document.getElementById("mountains");


/* 
const trElement = document.createElement("tr");
const thElement = document.createElement("th");
const tdElement = document.createElement("td");
 */


/* Better to create a function that will contain most of the logic */

function createTable(data) {
    // Create a new table element
    const tableElement = document.createElement("table");

    // Need to create headers separate from rest of the data
    // This can be done statically or dynamically
    // Dynamic approach will need to get keys from 1st object for labels
    const headerFields = Object.keys(data[0]);
    console.log(headerFields);

    // Create a header row element and add the fields to it
    const headerRow = document.createElement("tr");
    headerFields.forEach(function (headerField) {
        const headerCell = document.createElement("th");
        headerCell.appendChild(document.createTextNode(headerField));
        headerRow.appendChild(headerCell);
    });
    tableElement.appendChild(headerRow);
    console.log(tableElement);
    
}

// tableElement.appendChild(trElement);
divElement.appendChild(createTable(MOUNTAINS));
