// ==UserScript==
// @name        rumble - Quality
// @description rumble - Quality - quality: least
// @version     1.3
// @namespace   Violentmonkey Scripts
// @match       https://rumble.com/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=rumble.com
// @downloadURL https://github.com/Olivetti/public/raw/master/rumble-quality.js
// @updateURL   https://github.com/Olivetti/public/raw/master/rumble-quality.js
// @homepageURL https://github.com/Olivetti/public
// @supportURL  https://github.com/Olivetti/public
// @author      Martin______X / Olivetti
// @grant       none
// @license     MIT
// ==/UserScript==

let $url = "";
let $click_times = 0;

const simpleClick = (async (target, a)=>{
    if(target){
        target.click();
    }
    if(a){
        $click_times++;
    }
});

const rumbleQualityInterval = setInterval(() => {
    let url = document.URL;
    if(url != $url){
        try{
            // playback setting
            let playback = document.getElementsByClassName("touched_overlay_item")[0].nextElementSibling.lastChild.lastChild;
            // setting click object
            let playback_click = playback.firstChild;
            //click setting
            simpleClick(playback_click);
            //quality click
            //let quality = playback.lastChild.lastChild.lastChild;
            // children[0]=auto children[1]=least lastChild=best
            let quality = playback.lastChild.lastChild.children[1];
            simpleClick(quality, true);
        }catch{/*do nothing*/}

        // multi clicks check
        if($click_times > 3){
            $click_times = 0;
            $url = url;
        }
        //alert($click_times);
    }
}, 500);
