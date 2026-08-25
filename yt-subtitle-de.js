// ==UserScript==
// @name        youtube - Subtitles DE always on
// @description youtube - Subtitles DE always on
// @version     1.1
// @namespace   Violentmonkey Scripts
// @match       https://*.youtube.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL https://github.com/Olivetti/public/raw/master/yt-subtitle-de.js
// @updateURL   https://github.com/Olivetti/public/raw/master/yt-subtitle-de.js
// @homepageURL https://github.com/Olivetti/public
// @supportURL  https://github.com/Olivetti/public
// @author      Olivetti
// @grant       none
// @run-at      document-start
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';
    localStorage.setItem('yt-player-caption-language-preferences', '{"data":"de"}');
    localStorage.setItem('yt-player-caption-persistence',          '{"data":"true"}');
    localStorage.setItem('yt-player-volume',                       '{"data":"{\"volume\":50,\"muted\":false}"}');
    // localStorage.removeItem('yt-player-caption-sticky-language');
})();

// try {
//   document.documentElement.setAttribute(attr1,value1);
//   document.documentElement.setAttribute(attr2,value2);
// } catch(error) {
//   console.error(error);
// }
