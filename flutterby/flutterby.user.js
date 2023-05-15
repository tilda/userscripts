// ==UserScript==
// @name         flutterby
// @namespace    http://www.uta-net.com/
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/tilda/userscripts/main/flutterby/flutterby.user.js
// @downloadURL  https://raw.githubusercontent.com/tilda/userscripts/main/flutterby/flutterby.user.js
// @description  Removes copy restrictions from uta-net pages
// @author       tilda
// @match        https://www.uta-net.com/song/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=uta-net.com
// @grant        none
// ==/UserScript==

let removeHandlers = ['copy', 'cut', 'selectstart', 'contextmenu'];
let lyrics = document.querySelector('.moviesong')

for (const handler in removeHandlers) {
  console.log(`removing noCopy from ${removeHandlers[handler]}`)
  lyrics.removeEventListener(removeHandlers[handler], noCopy)
}
