/* global chrome */

function logOnHistoryStateUpdated (details) {
  if (!details.url.includes('/pull/')) {
    return
  }

  // console.log(`Run script: ${details.url}`)
  chrome.scripting.executeScript({ target: { tabId: details.tabId }, files: ['script.js'] })
  // chrome.tabs.executeScript(details.tabId, { file: 'script.js' })
}

chrome.webNavigation.onHistoryStateUpdated.addListener(logOnHistoryStateUpdated, {
  url: [{ hostEquals: 'github.com', pathPrefix: '/drata' }]
})
