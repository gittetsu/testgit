

window.addEventListener('load', function () {
    /*accordion*/
    var accordionItem = document.querySelectorAll('.accordion')

    accordionItem.forEach((item) => {
        var header =
            item.querySelector('.accordion-ttl') != null
                ? item.querySelector('.accordion-ttl')
                : item.querySelector('.sidebar-ttl')
        const mediaQuery = window.matchMedia('(max-width: 1024px)')
        var content = item.querySelector('.accordion-content')
        var sidebarttl = item.querySelector(".sidebar-ttl-link");
        if (header.classList.contains('accordion-ttl')) {
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'false');
        }
        if (content) {
            header.addEventListener('click', () => {
                if (!item.classList.contains('open')) {
                    // Close all other active items
                    accordionItem.forEach((otherItem) => {
                        if (otherItem !== item && otherItem.classList.contains('open')) {
                            const otherContent = otherItem.querySelector('.accordion-content')
                            if (
                                otherContent && otherContent.classList.contains("sidebar-detail") &&
                                content.classList.contains("sidebar-detail")
                            ) {
                                otherItem.classList.remove('open')
                                otherContent.style.height = '0'
                                otherContent.style.opacity = '0'
                                otherContent.style.padding = '0'
                            }
                        }
                    })

                    // Open the clicked item
                    item.classList.add('open')
                    if (mediaQuery.matches) {
                        content.style.padding = '20px 0 20px 0'
                        if (content.classList.contains('bg-gray')) {
                            content.style.padding = '20px'
                        } else if (content.classList.contains('sidebar-detail') && content.classList.contains('side-gp')) {
                            content.style.padding = '0px';
                            content.style.margin = '0';

                        } else if (content.classList.contains('sidebar-detail')) {
                            content.style.padding = '0 0 20px 20px'
                            content.style.margin = '0'
                        }
                    } else {
                        if (content.classList.contains('bg-gray')) {
                            content.style.padding = '30px 29px 30px'
                        }
                        else if (content.classList.contains('sidebar-detail') && content.classList.contains('side-gp')) {
                            content.style.padding = '0px';
                            content.style.margin = '0';
                        } else if (content.classList.contains('sidebar-detail')) {
                            content.style.padding = '2px 25px 30px'
                            content.style.margin = '0'
                        }
                        else {
                            content.style.padding = '30px 0 30px'
                        }
                    }
                    content.style.height = content.scrollHeight + 'px'
                    content.style.opacity = '1'
                } else {
                    item.classList.remove('open')
                    content.style.padding = '0'
                    content.style.height = '0'
                    content.style.opacity = '0'
                }
            })
            if (!mediaQuery.matches) {
                if (content) {
                    if (item.classList.contains('open')) {
                        if (content.classList.contains('sidebar-detail') && content.classList.contains('side-gp')) {
                            content.style.height = 'auto'
                            content.style.opacity = '1'
                            content.style.padding = '0px'
                            content.style.margin = '0'

                        }
                        else if (content.classList.contains('sidebar-detail')) {
                            content.style.height = 'auto'
                            content.style.opacity = '1'
                            content.style.padding = '2px 25px 30px'
                            content.style.margin = '0'
                        }
                        else if (content.classList.contains('bg-gray')) {
                            content.style.padding = '30px 29px 30px'
                        }
                    }
                }
            } else {
                if (content) {
                    if (content.classList.contains('sidebar-detail') && content.classList.contains('side-gp')) {
                        content.style.height = 'auto'
                        content.style.opacity = '1'
                        content.style.padding = '0px'
                        content.style.margin = '0'
                    }
                    else if (item.classList.contains('open')) {
                        if (content.classList.contains('sidebar-detail')) {
                            content.style.padding = '0 0 20px 20px'
                            content.style.margin = '0'
                            content.style.opacity = '1'
                            content.style.height = 'auto'
                        }
                    }
                }
            }
            // Add keyboard event handling
            header.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    // Handle Enter or Space key press (you can trigger a click event here)
                    header.click();
                } else if (event.key === 'Tab' && event.shiftKey) {
                    // Handle Shift + Tab to navigate backward
                    if (item > 0) {
                        event.preventDefault();
                        accordionItem[item - 1].querySelector('.accordion-ttl').focus();
                    }
                } else if (event.key === 'Tab' && !event.shiftKey) {
                    // Handle Tab to navigate forward
                    if (item < accordionItem.length - 1) {
                        event.preventDefault();
                        accordionItem[item + 1].querySelector('.accordion-ttl').focus();
                    }
                }
            });
            if (header.classList.contains("sidebar-ttl")) {
                sidebarttl.addEventListener("keyup", () => {
                    if (!item.classList.contains("open")) {
                        accordionItem.forEach((otherItem) => {
                            if (otherItem !== item && otherItem.classList.contains("open")) {
                                if (content.classList.contains("sidebar-detail")) {
                                    content.style.height = "auto";
                                    content.style.opacity = "1";
                                    content.style.padding = "2px 25px 30px";
                                    content.style.margin = "0";
                                }
                            }
                        });
                    }
                    item.classList.add("open")
                });
            }
        }

    })

    // dynamically accordion content high when window is resize
    function acc_content_hight() {
        var accordionItem = document.querySelectorAll('.accordion')
        accordionItem.forEach((item) => {
            var content = item.querySelector('.accordion-content')
            if (
                item.classList.contains('open') &&
                content &&
                !content.classList.contains('sidebar-detail')
            ) {
                content.style.height = 'auto'
                content.style.height = content.scrollHeight + 'px'
            }
        })
    }
    window.addEventListener('resize', acc_content_hight)

    /* sidebar banner toggle */

    var toggleButton = document.querySelector('.js-toggle-btn')
    var slideContent = document.querySelector('.slide-content')
    var jsSidebar = document.querySelector('.js-sidebar')
    var sidebarDeatils = document.querySelectorAll('.js-sidebar .sb-detail-link')
    var closeBtn = document.querySelector('.close-btn ')
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            slideContent.classList.toggle('open')
            jsSidebar.classList.toggle('sb-open')
            sideBar();
        })
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                slideContent.classList.remove('open')
                bodyElement.style.overflow = 'auto'
                jsSidebar.classList.remove('sb-open')
                bodyElement.style.overflow = 'auto'
                bodyElement.style.position = 'relative'
            })
        }
    }
    /*sideBar Resize Function*/
    function sideBar() {
        if (jsSidebar && mediaQuery.matches) {
            if (jsSidebar.classList.contains('sb-open')) {
                bodyElement.style.overflow = 'hidden'
                bodyElement.style.position = 'fixed'
            }
            else {
                bodyElement.style.overflow = 'auto'
                bodyElement.style.position = 'relative'
            }
        }

    }
    window.addEventListener("resize", sideBar);
    // for sidebar details link
    var toggleButtonID = document.querySelector('#js-toggle-btn')
    sidebarDeatils.forEach((element) => {
        element.addEventListener('click', function () {
            if (window.getComputedStyle(toggleButtonID).display != 'none') {
                slideContent.classList.toggle('open')
                jsSidebar.classList.toggle('sb-open')
                if (jsSidebar.classList.contains('sb-open')) {
                    bodyElement.style.overflow = 'hidden'
                    bodyElement.style.position = 'fixed'
                } else {
                    bodyElement.style.overflow = 'auto'
                    bodyElement.style.position = 'relative'
                }
            }
        })
    })


    /*button-add-active class*/
    var tabList1 = document.querySelectorAll('.tab-list-01 li a')
    var tabList2 = document.querySelectorAll('.tab-list-02 li a')

    var tabList = [...tabList1, ...tabList2]
    tabList.forEach(function (button) {
        button.addEventListener('click', function () {
            tabList.forEach(function (tab) {
                tab.classList.remove('active')
            })
            button.classList.toggle('active')
        })
    })

    /*anchor-link*/
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
            history.replaceState(null, null, '#' + targetId);
        });
    });
    function smoothScrollTo(targetElement) {
        let offset = 0;
        const mediaQuery = window.matchMedia('(max-width: 1024.9px)');
        if (mediaQuery.matches) {
            offset = 150;
        }
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset; // Include current
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Adjust the duration as needed
        const startTime = performance.now();

        function scrollStep(timestamp) {
            const currentTime = timestamp - startTime;
            const progress = Math.min(currentTime / duration, 1);
            const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            window.scrollTo(0, startPosition + distance * easeInOutCubic);

            if (currentTime < duration) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }

    // /* scrollTop*/
    let topBtn = document.getElementById('scrollTop')
    topBtn.onclick = function (e) {
        e.preventDefault()
        scrollToTop()
    }

    function scrollToTop() {
        const startPosition = window.pageYOffset
        const startTime = performance.now()
        function scrollStep(timestamp) {
            const currentTime = timestamp || performance.now()
            const progress = Math.min((currentTime - startTime) / 500, 1) // 500ms duration
            window.scrollTo(0, startPosition * (1 - progress))
            if (progress < 1) {
                requestAnimationFrame(scrollStep)
            }
        }
        requestAnimationFrame(scrollStep)
    }

    window.onscroll = function () {
        if (window.scrollY > 300) {
            topBtn.style.opacity = 1
            topBtn.style.visibility = 'visible'
        } else {
            topBtn.style.opacity = 0
            topBtn.style.visibility = 'hidden'
        }
    }

    /*submenu*/

    function closeAllDropdowns() {
        var openDropdowns = document.querySelectorAll('.sub-menu.show')
        var openDropdownttl = document.querySelector('.dropdown.show')
        openDropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('show')
            dropdown.style.height = '0'
            openDropdownttl.classList.remove('show')
        })
    }

    function dropDownMenuFunc(toggle) {
        var dropdownMenu = toggle.nextElementSibling
        var dropdownTitle
        var isDropdownShown = true
        if (dropdownMenu != null) {
            dropdownTitle = toggle.parentNode
            isDropdownShown = dropdownMenu.classList.contains('show')
        }
        if (!isDropdownShown) {
            dropdownMenu.style.display = 'block'
            var contentHeight = calculateMaxHeight(dropdownMenu)
            dropdownMenu.classList.add('show')
            dropdownMenu.style.height = contentHeight + 'px' // Set the height to sub-menu's content
            if (dropdownMenu.classList.contains('show')) {
                dropdownTitle.classList.add('show')
            }
        }
    }
    var dropdowns = document.querySelectorAll('.dropdown .dropdown-list');
    dropdowns.forEach(function (toggle) {
        var dropdownMenu = toggle.nextElementSibling
        var dropdownLink = dropdownMenu.getElementsByTagName("a")
        const query = window.matchMedia('(max-width: 1024px)')
        toggle.addEventListener('click', function (e) {
            var hrefValue = toggle.href;
            window.location.href = hrefValue;
        })
        if (!query.matches) {
            toggle.addEventListener('mouseenter', function (e) {
                // e.preventDefault()
                dropDownMenuFunc(toggle)
            })
            dropdownMenu.addEventListener('mouseenter', function (e) {
                // e.preventDefault()
                dropDownMenuFunc(toggle)
            })

            toggle.addEventListener('keyup', function (e) {
                dropDownMenuFunc(toggle)
            })
            dropdownMenu.addEventListener('keyup', function (e) {
                dropDownMenuFunc(toggle)
            })

            toggle.addEventListener('mouseleave', function (event) {
                closeAllDropdowns()
            })
            dropdownMenu.addEventListener('mouseleave', function (event) {
                closeAllDropdowns()
            })
            toggle.addEventListener('focusout', function (event) {
                closeAllDropdowns();
            });
            Array.from(dropdownLink).forEach(function (link) {
                link.addEventListener('focusout', function (event) {
                    const focusedElement = event.target.id;
                    if (focusedElement == "medical") {
                        closeAllDropdowns();
                    }
                })
            })
            toggle.addEventListener('focus', function (event) {
                closeAllDropdowns();
            });
        } else {
            var arrow = toggle.querySelector(".arrow-blk")
            arrow.addEventListener('click', function (e) {
                e.preventDefault()
                var dropdownMenu = toggle.nextElementSibling
                var dropdownTitle
                var isDropdownShown = true
                if (dropdownMenu != null) {
                    dropdownTitle = toggle.parentNode
                    isDropdownShown = dropdownMenu.classList.contains('show')
                }
                closeAllDropdowns()
                if (!isDropdownShown) {
                    dropdownMenu.style.display = 'block'
                    var contentHeight = calculateMaxHeight(dropdownMenu)
                    dropdownMenu.classList.add('show')

                    dropdownMenu.style.height = contentHeight + 'px' // Set the height to sub-menu's content
                    if (dropdownMenu.classList.contains('show')) {
                        dropdownTitle.classList.add('show')
                    }
                }
                e.stopPropagation();
            })
        }
    })

    var subMenuLists = document.querySelectorAll('.sub-menu-list li a:not(.other-link),.sugi-holding-header .nav-footer-list li a,.sugi-holding-footer .ft-nav li a');
    subMenuLists.forEach(function (subMenuList) {
        subMenuList.addEventListener('click', function () {
            hamburger.classList.remove('active')
            navMenu.classList.remove('active')
            bodyElement.style.overflow = 'auto'
            bodyElement.style.position = 'relative'
            var hrefValue = subMenuList.href;
            window.location.href = hrefValue;
            location.reload();
        })
    });

    function calculateMaxHeight(element) {
        var contentHeight = element.scrollHeight
        return contentHeight
    }

    const newImg = document.createElement('img')

    /*menubar */
    var hamburger = document.querySelector('.hamburger')
    var navMenu = document.querySelector('.nav-menu')
    var searchButton = document.querySelector('.search-btn')
    var submenu = document.querySelector('.sub-menu')
    var searchIcon = document.querySelector('.search-ico')
    const bodyElement = document.body
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active')
            if (hamburger.classList.contains('active')) {
                navMenu.classList.add('active')
                bodyElement.style.overflow = 'hidden'
                bodyElement.style.position = 'fixed'
                if (searchButton) {
                    if (searchButton.classList.contains('show-submenu')) {
                        subMenu.style.height = 0
                        searchButton.classList.remove('show-submenu')
                        submenu.classList.remove('show-submenu')
                        existingImg = searchIcon.querySelector('img')
                        if (existingImg) {
                            newImg.src = '/img/common/ico_search.png'
                            newImg.alt = 'search'
                            searchIcon.replaceChild(newImg, existingImg)
                        }
                    }
                }
            } else {
                navMenu.classList.remove('active')
                bodyElement.style.overflow = 'auto'
                bodyElement.style.position = 'relative'
                if (jsSidebar) {
                    if (jsSidebar.classList.contains('sb-open')) {
                        navMenu.classList.remove('active')
                        bodyElement.style.overflow = 'auto'
                        bodyElement.style.position = 'fixed'
                    }
                }
            }
        })
    }

    /*search-button*/
    var searchButton = document.querySelector('.search-btn')
    const subMenu = document.querySelector('.sub-menu')
    const dropDownMenu = document.getElementsByClassName('dropdown')
    var hamburger = document.querySelector('.hamburger')
    var navMenu = document.querySelector('.nav-menu')
    const mediaQuery = window.matchMedia('(max-width: 1024px)')
    var isSearch = false

    if (searchButton) {
        searchButton.addEventListener('click', function (event) {
            var searchIcon = document.querySelector('.search-ico')
            existingImg = searchIcon.querySelector('img')

            subMenu.classList.toggle('show-submenu')
            const contentHeight = subMenu.scrollHeight
            subMenu.style.height = subMenu.classList.contains('show-submenu')
                ? 'auto'
                : '0'

            if (subMenu.classList.contains('show-submenu')) {
                isSearch = true
                if (hamburger.classList.contains('active')) {
                    navMenu.classList.remove('active')
                    hamburger.classList.remove('active')
                    bodyElement.style.overflow = 'auto'
                    bodyElement.style.position = 'relative'
                }
                const inputElement = document.querySelector('.search input')
                searchButton.classList.add('show-submenu')
                inputElement.addEventListener('click', function (event) {
                    event.stopPropagation()
                })
            } else {
                isSearch = false
                searchButton.classList.remove('show-submenu')
                for (i = 1; i < dropDownMenu.length; i++) {
                    dropDownMenu[i].classList.remove('disable-pointer-events')
                }
            }
            newImg.alt = 'search'
            searchIcon.replaceChild(newImg, existingImg)

            handleMediaQueryChange(mediaQuery)
            mediaQuery.addListener(handleMediaQueryChange)
        })
    }

    function handleMediaQueryChange(event) {
        if (event.matches) {
            if (subMenu.classList.contains('show-submenu')) {
                newImg.src = '/img/common/ico_cross.png'
            } else {
                newImg.src = '/img/common/ico_search.png'
            }
        } else {
            newImg.src = '/img/common/ico_search.png'
            if (isSearch) {
                for (i = 1; i < dropDownMenu.length; i++) {
                    dropDownMenu[i].classList.add('disable-pointer-events')
                }
            }
        }
    }

    // Image Modal Box
    const modalBtns = Array.from(document.querySelectorAll('.zoom-in'))
    modalBtns.forEach((btn) => {
        btn.onclick = function () {
            const modal = btn.getAttribute('data-modal')
            document.getElementById(modal).style.display = 'block'
            document.querySelector('body').style.overflow = 'hidden'
        }
    })

    const closeBtns = Array.from(document.querySelectorAll('.close-button'))
    closeBtns.forEach((btn) => {
        btn.onclick = function () {
            let modal = btn.closest('.modal')
            modal.style.display = 'none'
            document.querySelector('body').style.overflow = 'visible'
        }
    })

    window.onclick = function (event) {
        if (event.target.className === 'modal') {
            event.target.style.display = 'none'
            document.querySelector('body').style.overflow = 'auto'
        }
    }
    const query = window.matchMedia('(max-width: 1024px)')
    const element = document.querySelector('.sidebar')
    const header = document.querySelector('.header-inner')

    // Accordion Height
    function accordionHeight() {
        const side_col03_detail_lists = document.querySelectorAll('.side-accor-col03')
        side_col03_detail_lists.forEach((element) => {
            const side_col03_detail = element.querySelectorAll(
                '.col03-detail .accordion-ttl',
            )
            setHeight(side_col03_detail)
        })

        const col02_detail_lists = document.querySelectorAll('.accor-col02')
        col02_detail_lists.forEach((element) => {
            const col02_detail = element.querySelectorAll(
                '.col02-detail .accordion-ttl',
            )
            setHeight(col02_detail)
        })
        const col03_detail_lists = document.querySelectorAll('.accor-col03')
        col03_detail_lists.forEach((element) => {
            const col03_detail = element.querySelectorAll(
                '.col03-detail .accordion-ttl',
            )
            setHeight(col03_detail)
        })
    }

    function setHeight(elements) {
        let maxHeight1 = 0
        let maxHeight2 = 0
        let i = 0
        let j = 0
        let size = 0

        const mediaQuery = window.matchMedia('(max-width: 767.9px)')
        if (elements.length > 2) {
            size = mediaQuery.matches ? 2 : 3
        }
        // Find the maximum height
        elements.forEach((element) => {
            element.style.removeProperty('height')
            const height = element.getBoundingClientRect().height
            if (i < size) {
                maxHeight1 = Math.max(maxHeight1, height)
            } else {
                maxHeight2 = Math.max(maxHeight2, height)
            }
            i++
        })
        // Set the maximum height to all elements
        elements.forEach((element) => {
            element.style.height = j < size ? `${maxHeight1}px` : `${maxHeight2}px`
            j++
        })
    }
    accordionHeight();
    window.addEventListener('resize', accordionHeight)

    var toggleBtn = document.querySelector('.toggle-btn');

    function setOverflow(query) {
        if (query.matches) {
            if (hamburger) {
                if (hamburger.classList.contains('active')) {
                    bodyElement.style.overflow = 'hidden'
                }
            }
            if (toggleBtn) {
                if (toggleBtn.classList.contains('active')) {
                    bodyElement.style.overflow = 'hidden',
                        bodyElement.style.position = 'fixed';
                }
            }

        } else {
            bodyElement.style.overflow = 'auto'
            bodyElement.style.position = 'relative';
            if (toggleBtn) {
                if (toggleBtn.classList.contains('active')) {
                    bodyElement.style.overflow = 'hidden',
                        bodyElement.style.position = 'fixed';
                }
            }
        }
    }
    setOverflow(query)
    query.addListener(setOverflow)
    window.addEventListener('resize', setOverflow(query))

    /*header nav-menu add active-class*/
    var currentUrl = window.location.href.split('?')[0]
    var menuItems = document.querySelectorAll(
        '.sugi-nursing-header .nav-menu-list li a, .sugi-nursing-header .header-contact-btn a, .sugi-medical-header .nav-menu-list li a, .sugi-holding-header .nav-menu-list li a,.sugi-holding-header .sub-nav-list a,.sugi-holding-footer .nav-list li a,.sugi-smile-footer .nav-list li a,.ft-medical .nav-list li a,.ft-nursing-care .nav-list li a',
    )
    menuItems.forEach(function (item) {
        var menuItemUrl = item.href.split('?')[0];
        var menuSplit = item.href.split('/').slice(3, -1);
        var currentSplit = currentUrl.split('/').slice(3, -1);
        if (menuItemUrl === currentUrl) {
            item.classList.add('visible')
        }
        if (menuSplit[0] === 'sugi-nursingcare' || menuSplit[0] === 'sugi-smile' || menuSplit[0] === 'sugi-medical' || menuSplit[0] === 'sugi-pharmacy') {
            if (menuSplit[1] === currentSplit[1]) {
                item.classList.add('visible')
            }
        } else if (currentUrl.includes("/news/") && menuItemUrl.endsWith("/news/")) {
            item.classList.add('visible')
        }
    })


    var menuItems = document.querySelectorAll(
        '.sugi-holding-header .nav-menu-list li .dropdown-list',
    )
    var activeClass = 'visible';
    var currentRoute = window.location.pathname

    menuItems.forEach(function (item) {
        var dataTarget = item.getAttribute('data-target')
        if (dataTarget === currentRoute) {
            item.classList.add(activeClass)
        }
        item.addEventListener('click', function (event) {
            event.preventDefault()
            menuItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove(activeClass)
                }
            })
        })
    })


    /*new-window-open-js*/
    var links = document.querySelector('a.new-window');
    if (links) {
        links.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(this.getAttribute('href'), '', [
                'width=' + screen.availWidth,
                'height=' + screen.availHeight
            ]);
        });
    }

    /*header calculate*/
    function headerHeigt() {
        var holding = document.querySelector(".sugi-holding-header");
        var smile = document.querySelector('.sugi-smile-header')
        var header = document.querySelector('header');
        var contentElements = document.querySelectorAll('.sec-mv, .cmn-banner, .sidebar , .ttl-bg, .top, .sec-medical-bnr');
        var content = document.querySelectorAll('.main-nursing-care, .sec-nursecare-company, .sec-nurcare-gp,.sec-nurcare-contact, .sec-nurcare-complete, .sec-nurcare-confirm')
        var headerHeight = header.offsetHeight + 'px';
        var bodyElement = document.body;
        if (holding) {
            if (element) {
                var sideNav = document.querySelector('.js-sidebar');
                var sideNavHeight = sideNav.offsetHeight + 'px';
                if (header && sideNav) {
                    var headerHeight = parseInt(header.offsetHeight);
                    var sideNavHeight = parseInt(sideNav.offsetHeight);
                    var totalHeight = headerHeight + sideNavHeight;
                    var totalHeightResult = totalHeight + 'px';
                    bodyElement.style.paddingTop = mediaQuery.matches ? totalHeightResult : 0;
                }
            }

        }
        else {
            bodyElement.style.paddingTop = 0;
        }

        contentElements.forEach(function (element) {
            element.style.marginTop = mediaQuery.matches ? headerHeight : 0;
        });
        content.forEach(function (element) {
            element.style.paddingTop = mediaQuery.matches ? headerHeight : 0;
        });
    }
    headerHeigt();

    window.addEventListener('resize', headerHeigt);

});

