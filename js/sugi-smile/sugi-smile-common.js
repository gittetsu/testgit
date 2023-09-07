document.addEventListener("DOMContentLoaded", function () {
    /* Toggle Menu Button */
    var toggleBtn = document.querySelector(".toggle-btn");
    var toggleNav = document.querySelector(".toggle-nav");
    const bodyElement = document.body;
    const viewportWidth = window.innerWidth;
    let scrollYPosition = 0;

    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        if (toggleBtn.classList.contains("active")) {
            scrollYPosition = window.scrollY;
            toggleNav.classList.add("active");
            bodyElement.style.overflow = "hidden";
            if (viewportWidth <= 1024) {
                bodyElement.style.position = "fixed";
            }
        } else {
            toggleNav.classList.remove("active");
            bodyElement.style.overflow = "";
            bodyElement.style.position = "";
            if (viewportWidth <= 1024) {
                window.scrollTo(0, scrollYPosition);
            }
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