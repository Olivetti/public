// ==UserScript==
// @name        rumble - Settings
// @version     1.0
// @description rumble - Settings
// @author      Olivetti
// @namespace   Violentmonkey Scripts
// @match       https://rumble.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=rumble.com
// @grant       none
// @license     MIT
// @downloadURL https://github.com/Olivetti/public/raw/master/rumble-settings.js
// @updateURL   https://github.com/Olivetti/public/raw/master/rumble-settings.js
// ==/UserScript==

// theme: light, dark, system
// collapse menu: true

let attr1  = 'data-theme';
let value1 = 'dark';

let attr2  = 'class';
let value2 = value1+' main-menu-mode-permanent';

try{
  document.documentElement.setAttribute(attr1,value1);
  document.documentElement.setAttribute(attr2,value2);
}catch{/*do nothing*/}

//alert(document.documentElement.getAttribute(attr1));
