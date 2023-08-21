document.addEventListener("DOMContentLoaded", function () {
    /* Toggle Menu Button */
    var toggleBtn = document.querySelector(".toggle-btn");
    var toggleNav = document.querySelector(".toggle-nav");

    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        if (toggleBtn.classList.contains("active")) {
            toggleNav.classList.add("active");
            bodyElement.style.overflow = "hidden";
            bodyElement.style.position = "fixed";
        } else {
            toggleNav.classList.remove("active");
            bodyElement.style.overflow = "auto";
            bodyElement.style.position = "unset";
        }
    });

    /* Active Menu */

    var currentUrl = window.location.href;

    var menuItems = document.querySelectorAll(".sugi-smile-header .menu-list li a");
    menuItems.forEach(function (item) {
        if (item.href === currentUrl) {
            item.classList.add("active");
        }
    });
});