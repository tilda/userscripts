// ==UserScript==
// @name         Headcount
// @namespace    https://osu.ppy.sh/
// @version      1.2
// @updateURL    https://raw.githubusercontent.com/tilda/userscripts/main/headcount/headcount.user.js
// @downloadURL  https://raw.githubusercontent.com/tilda/userscripts/main/headcount/headcount.user.js
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @description  Count & percentage of mutual friends on osu-web's friends page
// @author       tilda
// @match        https://osu.ppy.sh/home/friends
// @match        https://osu.ppy.sh/home/friends?filter=all
// @icon         https://www.google.com/s2/favicons?sz=64&domain=osu.ppy.sh
// @grant        none
// ==/UserScript==

GM_config.init({
    'id': 'headcount_config',
    'title': 'Headcount Settings',
    'fields': {
        'displayType': {
            'label': 'Display type',
            'type': 'radio',
            'options': ['icon', 'text', 'none'],
            'default': 'icon'
        }
    }
})

let friendsPageRoot = document.getElementsByClassName('js-react--friends-index')[0]
const percentage = function(partial, total) {
    return ((100 * partial) / total).toFixed(2)
}

// ngl i hate this
const getIconPreference = function() {
    if (GM_config.get('displayType') === 'icon') {
        return '<span class="fas fa-user-friends"></span>'
    } else { return '' }
}
const getTextPreference = function() {
    if (GM_config.get('displayType') === 'text') {
        return 'mutuals'
    } else { return '' }
}

const setupMutualCounter = function() {
    let body = document.body
    let addedFriends = body.getElementsByClassName("user-card-brick").length
    let mutualFriends = body.getElementsByClassName("user-card-brick--mutual").length
    const toolbarRow = body.getElementsByClassName("user-list__toolbar-row")[0]
    const toolbarItem = document.createElement('div')
    const spacing = document.createElement('div')

    toolbarRow.style = 'align-items: center;'

    spacing.classList.add('user-list__toolbar-item')
    spacing.style = 'margin: auto;'
    toolbarItem.classList.add('user-list__toolbar-item')
    toolbarItem.style = 'padding: 0; font-size: 20px; font-weight: bold; margin: 5px; cursor: pointer;'
    toolbarItem.innerHTML = `${getIconPreference()} ${mutualFriends}/${addedFriends} ${getTextPreference()} (${percentage(mutualFriends, addedFriends)}%)`
    toolbarItem.addEventListener('click', () => {
        GM_config.open()
    })

    const firstElementChild = toolbarRow.firstElementChild
    toolbarRow.insertBefore(toolbarItem, firstElementChild)
    toolbarRow.insertBefore(spacing, firstElementChild)
}

const observer = new MutationObserver(setupMutualCounter)
observer.observe(friendsPageRoot, {
    childList: true,
    attributes: false,
    subtree: false
})