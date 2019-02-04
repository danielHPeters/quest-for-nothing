/**
 * Highlight link of current page in navigation bar.
 */
document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname
  const child = document.querySelector('a[href="' + pathname + '"]')

  if (child) {
    const element = child.parentNode as HTMLElement
    element.classList.add('active')
  }
})
