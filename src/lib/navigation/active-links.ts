/**
 * Highlight link of current page in navigation bar.
 */
document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname
  const element = document.querySelector('a[href="' + pathname + '"]').parentNode as HTMLElement
  element.classList.add('active')
})
