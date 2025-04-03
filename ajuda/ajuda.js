const toggleButton = document.getElementById('menu-toggle');
const menu = document.querySelector('nav ul.menu');

if (toggleButton && menu) {
  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
}
