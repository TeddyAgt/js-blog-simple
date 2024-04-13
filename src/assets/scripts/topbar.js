const togglerBtn = document.querySelector(".main-navigation__toggler-btn");
const navigationMenu = document.querySelector("#navigation-links");
let isMenuExpanded = false;

togglerBtn.addEventListener("click", toggleNavigationMenu);
navigationMenu.addEventListener("click", (e) => e.stopPropagation());

function toggleNavigationMenu(e) {
  e.stopPropagation();
  navigationMenu.classList.toggle("expanded");
  isMenuExpanded = !isMenuExpanded;
  if (isMenuExpanded) {
    togglerBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    togglerBtn.ariaLabel = "Fermer le menu de navigation";
    togglerBtn.ariaExpanded = "true";
    window.addEventListener("click", toggleNavigationMenu);
  } else {
    togglerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    togglerBtn.ariaLabel = "Ouvrir le menu de navigation";
    togglerBtn.ariaExpanded = "false";
    window.removeEventListener("click", toggleNavigationMenu);
  }
}
