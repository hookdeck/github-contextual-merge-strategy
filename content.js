function main () {
  if (['staging', 'preview'].includes(document.querySelector('.head-ref').textContent)) {
      // If merging from staging or preview (likely to master), do a merge commit
    document.querySelector('.merge-message details button[value=merge]').click()
  } else {
    // Otherwise squash by default
    document.querySelector('.merge-message details button[value=squash]').click()
  }
}

if (!document.querySelector('.merge-message details')) {
  // This part is loaded asynchronously so we need to observe it
  const observer = new MutationObserver(() => {
    observer.disconnect()
    main()
  })

  observer.observe(document.querySelector('.discussion-timeline-actions'), { subtree: true, childList: true })
} else {
  // Already loaded
  main()
}
