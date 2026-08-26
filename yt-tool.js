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

  const TARGET_VOLUME = 50; // 0-100, wie im YouTube-UI
  const TARGET_MUTED = false; // true | false
  const STORAGE_KEY = 'yt-player-volume';
  const STORAGE_KEY2 = 'yt-player-caption-language-preferences';
  const STORAGE_KEY3 = 'yt-player-caption-persistence';

  // 1. session-/localStorage-Eintrag, den YouTube selbst zum Speichern der Lautstärke nutzt,
  //    beim Start und bei jeder Änderung überschreiben.
  function forceVolume() {
    try {
      const TIMESTAMP = Date.now();

      const value = JSON.stringify({
        volume: TARGET_VOLUME,
        muted: TARGET_MUTED,
      });
      const wrapped = JSON.stringify({
        data: value,
        creation: TIMESTAMP,
      });
      //localStorage.setItem(STORAGE_KEY, wrapped);
      sessionStorage.setItem(STORAGE_KEY, wrapped);

      const wrapped2 = JSON.stringify({
        data: "de",
        creation: TIMESTAMP,
     });
      sessionStorage.setItem(STORAGE_KEY2, wrapped2);

      const wrapped3 = JSON.stringify({
        data: true,
        creation: TIMESTAMP,
        expiration: TIMESTAMP + 1000 * 60 * 60 * 24 * 365 * 10, // 10 Jahre
      });
      localStorage.setItem(STORAGE_KEY3, wrapped3);

    } catch (e) {
      // ignore
    }
  }

  // Direkt beim Laden setzen
  forceVolume();
  //alert(sessionStorage.getItem(STORAGE_KEY)+'\n'+sessionStorage.getItem(STORAGE_KEY2)+'\n'+localStorage.getItem(STORAGE_KEY3));


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
