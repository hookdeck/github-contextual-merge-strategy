function main () {
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

function onPage () {
  if (!location.pathname.match(/\/pull\/\d+$/)) {
    return
  }

  console.log('Matched PR URL')

  if (document.querySelector('.merge-message details')) {
    // Already loaded
    console.log('Merge message found!')
    main()
  }

  // Still watch for updates, needed especially for race conditions in single-page navigation
  const observer = new MutationObserver(() => {
    observer.disconnect()
    console.log('Merge message updated, running')
    main()
  })

  observer.observe(document.querySelector('.discussion-timeline-actions'), { subtree: true, childList: true })
}

// Best way I found to intercept single-page navigation
new MutationObserver(() => {
  console.log('On page change')

  // Add some delay because the URL is usually updated a bit after the body
  // and there's no reliable way to detect that
  setTimeout(onPage, 200)
}).observe(document.body, { childList: true })

onPage()
