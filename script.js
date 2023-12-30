/* global MutationObserver */

function updateStrategy () {
  const branch = document.querySelector('.head-ref').textContent;
  if (branch.startsWith('release/')) {
    // do a MERGE if the branch is a release branch
    // console.log('ONLY merge')
    document.querySelector('.merge-message details button[value=merge]').click()
    // hide the other buttons
    document.querySelector('.merge-message details button[value=squash]').style.visibility = "hidden";
    document.querySelector('.merge-message details button[value=rebase]').style.visibility = "hidden";
  } else {
    // Otherwise squash by default
    // console.log('ONLY squash and merge')
    document.querySelector('.merge-message details button[value=squash]').click()
    // hide the other buttons
    document.querySelector('.merge-message details button[value=merge]').style.visibility = "hidden";
    document.querySelector('.merge-message details button[value=rebase]').style.visibility = "hidden";
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
    if (document.querySelector('.merge-message details')) {
      observer.disconnect()
      // console.log('Merge message updated, running')
      updateStrategy()
    } else {
      // console.log('Merge message updated, not ready')
    }
  })

  observer.observe(actions, { subtree: true, childList: true })
}

main()
