'use strict'
document.addEventListener('DOMContentLoaded', () => {
  let pathname = window.location.pathname
  document.querySelector('a[href="' + pathname + '"]').parentNode.classList.add('active')
  // $('#nav-list').find('a[href="' + pathname + '"]').parent().addClass('active')
})
