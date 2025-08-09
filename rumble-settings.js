// ==UserScript==
// @name        rumble - Settings
// @description rumble - Settings
// @version     1.0
// @namespace   Violentmonkey Scripts
// @match       https://rumble.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=rumble.com
// @downloadURL https://github.com/Olivetti/public/raw/master/rumble-settings.js
// @updateURL   https://github.com/Olivetti/public/raw/master/rumble-settings.js
// @homepageURL https://github.com/Olivetti/public
// @supportURL  https://github.com/Olivetti/public
// @author      Olivetti
// @grant       none
// @license     MIT
// ==/UserScript==

// theme: dark
// collapse menu: true

let attr1  = 'data-theme';
let value1 = 'dark';

let attr2  = 'class';
let value2 = 'main-menu-mode-permanent '+value1;

try {
  document.documentElement.setAttribute(attr1,value1);
  document.documentElement.setAttribute(attr2,value2);
} catch(error) {
  console.error(error);
}
