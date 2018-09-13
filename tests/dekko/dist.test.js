const $ = require('dekko');

$('dist')
  .isDirectory()
  .hasFile('wmstool.css')
  .hasFile('wmstool.min.css')
  .hasFile('wmstool.js')
  .hasFile('wmstool.min.js');

// eslint-disable-next-line
console.log('`dist` directory is valid.');

