/// ==UserScript==
// @name         Headcount
// @namespace    https://osu.ppy.sh/
// @version      1.0
// @updateURL    https://raw.githubusercontent.com/tilda/userscripts/main/headcount/headcount.user.js
// @downloadURL  https://raw.githubusercontent.com/tilda/userscripts/main/headcount/headcount.user.js
// @description  Count & percentage of mutual friends on osu-web's friends page
// @author       tilda
// @match        https://osu.ppy.sh/home/friends
// @match        https://osu.ppy.sh/home/friends?filter=all
// @icon         https://www.google.com/s2/favicons?sz=64&domain=osu.ppy.sh
// @grant        none
// ==/UserScript==

(function() {
    window.onload = (event) => {
        const percentage = function(partial, total) {
            return ((100 * partial) / total).toFixed(2)
        }
        let body = document.body
        let addedFriends = body.getElementsByClassName("user-card-brick").length
        let mutualFriends = body.getElementsByClassName("user-card-brick--mutual").length
        const toolbarRow = body.getElementsByClassName("user-list__toolbar-row")[0]
        const toolbarItem = document.createElement('div')
        const spacing = document.createElement('div')
        const toolbarItemContent = document.createTextNode(`${mutualFriends}/${addedFriends} mutuals (${percentage(mutualFriends, addedFriends)}%)`)

        toolbarRow.style = 'align-items: center;'

        spacing.classList.add('user-list__toolbar-item')
        spacing.style = 'margin: auto;'
        toolbarItem.appendChild(toolbarItemContent)
        toolbarItem.classList.add('user-list__toolbar-item')
        toolbarItem.style = 'padding: 0; font-size: 20px; font-weight: bold; margin: 5px;'

        const firstElementChild = toolbarRow.firstElementChild
        toolbarRow.insertBefore(toolbarItem, firstElementChild)
        toolbarRow.insertBefore(spacing, firstElementChild)
    }
})();