'use strict'
/**
 * Highlight link of current page in navigation bar.
 */
document.addEventListener('DOMContentLoaded', () => {
  let pathname = window.location.pathname
  document.querySelector('a[href="' + pathname + '"]').parentNode.classList.add('active')
})
