// ==UserScript==
// @name        Youtube - Tool
// @description Force Volume 50 & CC de
// @version     1.0
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @match       https://-music.youtube.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @downloadURL https://github.com/Olivetti/public/raw/master/yt-tool.js
// @updateURL   https://github.com/Olivetti/public/raw/master/yt-tool.js
// @homepageURL https://github.com/Olivetti/public
// @supportURL  https://github.com/Olivetti/public
// @author      Olivetti
// @grant       none
// @run-at      document-start
// @license     MIT
// ==/UserScript==

(function () {
  'use strict';

  const TARGET_VOLUME     = 50;     // 0-100
  const TARGET_MUTED      = false;  // true | false
  const FONTSIZEINCREMENT = 0;      // fontSizeIncrement  0 100%, -2 50%, -1 75%, 1 150%, 2 200%, 3 300%, 4 400%
  const CHAREDGESTYLE     = 0;      // charEdgeStyle      0 none, 1 erhöht, 2 abgesenkt, 3 umriss, 4 schlagschatten
  const QUALITY           = 0;      // quality            0 auto, 144, 240, 360, 480, 720, 1080, 1440, 2160

  const STORAGE_KEY   = 'yt-player-volume';                       // sessionStorage
  const STORAGE_KEY2  = 'yt-player-caption-sticky-language';      // localStorage
  //const STORAGE_KEY2  = 'yt-player-caption-language-preferences'; // sessionStorage
  const STORAGE_KEY3  = 'yt-player-caption-display-settings';     // localStorage
  const STORAGE_KEY4  = 'yt-player-caption-persistence';          // localStorage
  //const STORAGE_KEY4  = 'yt-player-sticky-caption';
  const STORAGE_KEY5  = 'yt-player-quality';                      // localStorage

  // 1. session-/localStorage-Eintrag, den YouTube selbst zum Speichern der Lautstärke nutzt,
  //    beim Start und bei jeder Änderung überschreiben.
  function forceSettings() {
    try {
      const TIMESTAMP = Date.now();
      const TIMESTAMP_EXP = TIMESTAMP + 1000 * 60 * 60 * 24 * 365 * 10;

      const value = JSON.stringify({
        volume: TARGET_VOLUME,
        muted:  TARGET_MUTED,
      });
      const wrapped = JSON.stringify({
        data: value,
        creation: TIMESTAMP,
        expiration: TIMESTAMP_EXP,
      });
      sessionStorage.setItem(STORAGE_KEY, wrapped);

      const wrapped2 = JSON.stringify({
        data: "de",
        creation: TIMESTAMP,
        expiration: TIMESTAMP_EXP,
      });
      //sessionStorage.setItem(STORAGE_KEY2, wrapped2);
      localStorage.setItem(STORAGE_KEY2, wrapped2);

      const value3 = JSON.stringify({
        fontSizeIncrement: FONTSIZEINCREMENT,
        charEdgeStyle: CHAREDGESTYLE,
      });
      const wrapped3 = JSON.stringify({
        //data: '{"fontSizeIncrement":FONTSIZEINCREMENT,"fontSizeIncrementOverride":true,"backgroundOpacity":0.75,"charEdgeStyle":CHAREDGESTYLE}',
        data: value3,
        creation: TIMESTAMP,
        expiration: TIMESTAMP_EXP,
      });
      localStorage.setItem(STORAGE_KEY3, wrapped3);

      const wrapped4 = JSON.stringify({
        data: true,
        creation: TIMESTAMP,
        expiration: TIMESTAMP_EXP,
      });
      localStorage.setItem(STORAGE_KEY4, wrapped4);

      const value5 = JSON.stringify({
        quality: QUALITY,
      });
      const wrapped5 = JSON.stringify({
        data: value5,
        creation: TIMESTAMP,
        expiration: TIMESTAMP_EXP,
      });
      localStorage.setItem(STORAGE_KEY5, wrapped5);

    } catch (e) {
      // ignore
    }
  }

  // Direkt beim Laden setzen
  forceSettings();
  //alert(sessionStorage.getItem(STORAGE_KEY)+'\n'+localStorage.getItem(STORAGE_KEY2)+'\n'+localStorage.getItem(STORAGE_KEY3)+'\n'+
  //localStorage.getItem(STORAGE_KEY4)+'\n'+localStorage.getItem(STORAGE_KEY5));


/*
  // Falls YouTube den Wert selbst ändert, sofort zurücksetzen
  const originalSetItem = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function (key, value) {
    if (key === STORAGE_KEY) {
      // Statt des von YouTube gewünschten Werts unseren Zielwert schreiben
      forceVolume();
      return;
    }
    return originalSetItem(key, value);
  };

  // 2. Zusätzlich direkt am <video>-Element ansetzen, falls die Lautstärke
  //    zur Laufzeit (z. B. per Tastatur, Mausrad auf dem Player) geändert wird.
  function applyVolumeToVideo(video) {
    if (!video) return;
    const desired = TARGET_VOLUME / 100;
    if (Math.abs(video.volume - desired) > 0.001) {
      video.volume = desired;
    }
    if (video.muted) {
      video.muted = TARGET_MUTED;
    }
  }

  function watchVideo(video) {
    if (!video || video.dataset.volumeLockAttached) return;
    video.dataset.volumeLockAttached = 'true';

    applyVolumeToVideo(video);

    video.addEventListener('volumechange', () => {
      applyVolumeToVideo(video);
    });
  }

  function scanForVideos() {
    document.querySelectorAll('video').forEach(watchVideo);
  }

  // Beobachtet DOM-Änderungen (YouTube ist eine SPA, Video-Elemente werden neu erzeugt)
  const observer = new MutationObserver(() => {
    scanForVideos();
  });

  function start() {
    scanForVideos();
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Sicherheitsnetz: alle paar Sekunden nochmal prüfen
  setInterval(() => {
    forceVolume();
    scanForVideos();
  }, 3000);
*/
})();
