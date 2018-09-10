/* eslint-disable global-require */
import { jsdom } from 'jsdom';

// fixed jsdom miss
if (typeof window !== 'undefined') {
  const documentHTML = '<!doctype html><html><body><div id="root"></div></body></html>';
  global.document = jsdom(documentHTML);
  global.window = document.parentWindow;

  global.window.resizeTo = (width, height) => {
    global.window.innerWidth = width || global.window.innerWidth;
    global.window.innerHeight = height || global.window.innerHeight;
    global.window.dispatchEvent(new Event('resize'));
  };
}

global.requestAnimationFrame = global.requestAnimationFrame || function (cb) {
  return setTimeout(cb, 0);
};

const Enzyme = require('enzyme');

let Adapter;
if (process.env.REACT === '15') {
  Adapter = require('enzyme-adapter-react-15');
} else {
  Adapter = require('enzyme-adapter-react-16');
}

Enzyme.configure({ adapter: new Adapter() });
