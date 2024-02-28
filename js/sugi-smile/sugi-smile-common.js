function commonloadSmile() {
    /* Toggle Menu Button */
    var toggleBtn = document.querySelector(".toggle-btn");
    var toggleNav = document.querySelector(".toggle-nav");
    var toggleNavList = toggleNav.querySelectorAll("a");
    const bodyElement = document.body;
    const viewportWidth = window.innerWidth;
    let scrollYPosition = 0;

    toggleBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        if (toggleBtn.classList.contains("active")) {
            scrollYPosition = window.scrollY;
            toggleNav.classList.add("active");
            toggleNav.style.height = "100vh";
            toggleNav.style.paddingBottom = "60px";
            bodyElement.style.overflow = "hidden";
            if (viewportWidth <= 1024) {
                bodyElement.style.position = "fixed";
                toggleNav.style.paddingBottom = "300px";
            }
        } else {
            toggleNav.style.height = "0px";
            toggleNav.style.paddingBottom = "0px";
            toggleNav.classList.remove("active");
            bodyElement.style.overflow = "";
            bodyElement.style.position = "";
            if (viewportWidth <= 1024) {
                window.scrollTo(0, scrollYPosition);
            }
        }
    });
    toggleBtn.addEventListener("keyup", function (event) {
        if (event.key === "Tab") {
            event.preventDefault();

            this.classList.toggle("active");
            if (toggleBtn.classList.contains("active")) {
                scrollYPosition = window.scrollY;
                toggleNav.style.height = "100vh";
                toggleNav.style.paddingBottom = "60px";
                bodyElement.style.overflow = "hidden";
                if (viewportWidth <= 1024) {
                    bodyElement.style.position = "fixed";
                    toggleNav.style.paddingBottom = "300px";
                }
            } else {
                toggleNav.style.height = "0px";
                toggleNav.style.paddingBottom = "0px";
                bodyElement.style.overflow = "";
                bodyElement.style.position = "";
                if (viewportWidth <= 1024) {
                    window.scrollTo(0, scrollYPosition);
                }
            }
        }
    });

    toggleNavList.forEach(function (link) {
        link.addEventListener("focus", function () {
            if (!toggleBtn.classList.contains("active")) {
                toggleBtn.classList.add("active");
                scrollYPosition = window.scrollY;
                toggleNav.style.height = "100vh";
                toggleNav.style.paddingBottom = "60px";
                bodyElement.style.overflow = "hidden";
                if (viewportWidth <= 1024) {
                    bodyElement.style.position = "fixed";
                    toggleNav.style.paddingBottom = "300px";
                }
            }
        });
        link.addEventListener("focusout", function (e) {
            if (link.id == "creation") {
                toggleNav.style.height = "0px";
                toggleNav.style.paddingBottom = "0px"
                toggleBtn.classList.remove("active");
            }
        });
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
}