// @ts-check
/**
 * Adapted from "FullStack - How to create a working blogging website with pure HTML, CSS and JS in 2021."
 * @author Modern Web
 * @link https://dev.to/themodernweb/fullstack-how-to-create-a-working-blogging-website-with-pure-html-css-and-js-in-2021-9di/
 */

const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, 'public');

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, 'home.html'));
});

app.listen('3000', () => {
  console.log('listening.....');
});