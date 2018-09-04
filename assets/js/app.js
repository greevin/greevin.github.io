
// Adiciona a classe 'Active' para o elemento atual adaptado para o ES6
// https://www.w3schools.com/howto/howto_js_active_element.asp

const listItems = document.querySelectorAll('#navbarSupportedContent li');

listItems.forEach(listItem => {
  listItem.addEventListener("click", changeActiveListItem);
})

function changeActiveListItem() {
  const current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
}

// Scroll suave baseado no código do André Origamid
// https://codepen.io/origamid/pen/eKGvdo

const menuItems = document.querySelectorAll('#navbarSupportedContent a');

menuItems.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick);
})

function scrollToIdOnClick(event) {
  event.preventDefault();
  const to = getScrollTopByHref(event.currentTarget) - 50;
  scrollToPosition(to);
}

function getScrollTopByHref(element) {
  const id = element.getAttribute('href');
  return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  // Caso queira o nativo apenas
	// window.scroll({
	// top: to,
	// behavior: "smooth",
	// })
  smoothScrollTo(0, to);
}

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 1200;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};
