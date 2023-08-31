document.addEventListener("DOMContentLoaded", function () {
    /* Toggle Menu Button */
    var toggleBtn = document.querySelector(".toggle-btn");
    var toggleNav = document.querySelector(".toggle-nav");
    const bodyElement = document.body

    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        if (toggleBtn.classList.contains("active")) {
            toggleNav.classList.add("active");
            bodyElement.style.overflow = "hidden";
            bodyElement.style.position = "fixed";
            bodyElement.style.left = 0;
            bodyElement.style.right = 0;
            bodyElement.style.margin = "0 auto";
        } else {
            toggleNav.classList.remove("active");
            bodyElement.style.overflow = "auto";
            bodyElement.style.position = "relative";
        }
    });

    /* Active Menu */

    var currentUrl = window.location.href.split('?')[0];

    var menuItems = document.querySelectorAll(".sugi-smile-header .menu-list li a");

    menuItems.forEach(function (item) {
        var menuItemUrl = item.href.split('?')[0];
        if (menuItemUrl === currentUrl) {
            item.classList.add("active");
        }
    });
});