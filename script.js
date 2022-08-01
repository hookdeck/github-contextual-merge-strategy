/* global MutationObserver */

function updateStrategy () {
  if (['master', 'main', 'staging', 'preview'].includes(document.querySelector('.head-ref').textContent)) {
    // If merging from staging or preview (likely to master), do a merge commit
    console.log('Clicking merge')
    document.querySelector('.merge-message details button[value=merge]').click()
  } else {
    // Otherwise squash by default
    console.log('Clicking squash')
    document.querySelector('.merge-message details button[value=squash]').click()
  }
}

function main () {
  const details = document.querySelector('.merge-message details')

  if (details) {
    updateStrategy()
    // Still watch for updates, needed especially for race conditions in single-page navigation
  }

  const actions = document.querySelector('.discussion-timeline-actions')

  if (!actions) {
    // Likely navigation fired before updating DOM but it typically fires again after
    return
  }

  const observer = new MutationObserver(() => {
    observer.disconnect()
    console.log('Merge message updated, running')
    updateStrategy()
  })

  observer.observe(actions, { subtree: true, childList: true })
}

main()
