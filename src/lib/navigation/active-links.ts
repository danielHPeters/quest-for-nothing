/**
 * Highlight link of current page in navigation bar.
 */
document.addEventListener('DOMContentLoaded', () => {
  let pathname = window.location.pathname
  let element = document.querySelector('a[href="' + pathname + '"]').parentNode as HTMLElement
  element.classList.add('active')
})
