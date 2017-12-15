document.addEventListener('DOMContentLoaded', () => {
    let pathname = window.location.pathname;
    let element = document.querySelector('a[href="' + pathname + '"]').parentNode;
    element.classList.add('active');
});
