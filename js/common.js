/*accordion*/
var accordionItem = document.querySelectorAll('.accordion')
accordionItem.forEach((item) => {
    var header =
        item.querySelector('.accordion-ttl') != null
            ? item.querySelector('.accordion-ttl')
            : item.querySelector('.sidebar-ttl')
    if (header != null) {
        const mediaQuery = window.matchMedia('(max-width: 1024.9px)')
        var content = item.querySelector('.accordion-content')
        if (content) {
            header.addEventListener('click', () => {
                if (!item.classList.contains('open')) {
                    // Close all other active items
                    accordionItem.forEach((otherItem) => {
                        if (otherItem !== item && otherItem.classList.contains('open')) {
                            const otherContent = otherItem.querySelector('.accordion-content')
                            if (
                                otherContent &&
                                ((otherContent.classList.contains('sidebar-detail') &&
                                    content.classList.contains('sidebar-detail')) ||
                                    (!otherContent.classList.contains('sidebar-detail') &&
                                        !content.classList.contains('sidebar-detail')))
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
                        } else if (content.classList.contains('sidebar-detail')) {
                            content.style.padding = '0 0 20px 20px'
                            content.style.margin = '0'
                        }
                    } else {
                        if (content.classList.contains('bg-gray')) {
                            content.style.padding = '30px 29px 30px'
                        } else if (content.classList.contains('sidebar-detail')) {
                            content.style.padding = '0px 25px 30px'
                            content.style.margin = '0'
                        } else {
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
                        content.style.height = 'auto'
                        content.style.opacity = '1'
                        content.style.padding = '0px 25px 30px'
                        content.style.margin = '0'
                    }
                }
            } else {
                if (content) {
                    if (item.classList.contains('open')) {
                        content.style.padding = '0 0 20px 20px'
                        content.style.margin = '0'
                        content.style.opacity = '1'
                        content.style.height = 'auto'
                    }
                }
            }
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
const mediaQuery2 = window.matchMedia('(max-width: 1025px)')
const bodyElement = document.body
if (toggleButton) {
    toggleButton.addEventListener('click', function () {
        slideContent.classList.toggle('open')
        jsSidebar.classList.toggle('sb-open')
        if (jsSidebar.classList.contains('sb-open')) {
            bodyElement.style.overflow = 'hidden'
            bodyElement.style.position = 'fixed'
        } else {
            bodyElement.style.overflow = 'auto'
            bodyElement.style.position = 'relative'
        }
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
var commonbutton = document.querySelectorAll('.common-button')

var tabList = [...tabList1, ...tabList2, ...commonbutton]
tabList.forEach(function (button) {
    button.addEventListener('click', function () {
        tabList.forEach(function (tab) {
            tab.classList.remove('active')
        })
        button.classList.toggle('active')
    })
})

/*anchor-link*/
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            console.log(targetId);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
            history.replaceState(null, null, '#' + targetId);
        });
    });
});
function smoothScrollTo(targetElement) {
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; // Include current
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
// var dropdown = document.querySelectorAll(".dropdown");
var dropdowns = document.querySelectorAll('.dropdown .dropdown-list')

dropdowns.forEach(function (toggle) {
    var dropdownMenu = toggle.nextElementSibling
    const query = window.matchMedia('(max-width: 1024.9px)')

    if (!query.matches) {
        toggle.addEventListener('mouseenter', function (e) {
            e.preventDefault()
            dropDownMenuFunc(toggle)
        })
        dropdownMenu.addEventListener('mouseenter', function (e) {
            e.preventDefault()
            dropDownMenuFunc(toggle)
        })

        toggle.addEventListener('mouseleave', function (event) {
            closeAllDropdowns()
        })
        dropdownMenu.addEventListener('mouseleave', function (event) {
            closeAllDropdowns()
        })
    } else {
        toggle.addEventListener('click', function (e) {
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
        })
    }
})

function calculateMaxHeight(element) {
    var contentHeight = element.scrollHeight
    return contentHeight
}

const newImg = document.createElement('img')

/*menubar */
document.addEventListener('DOMContentLoaded', function () {
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
                if (searchButton.classList.contains('show-submenu')) {
                    subMenu.style.height = 0
                    searchButton.classList.remove('show-submenu')
                    submenu.classList.remove('show-submenu')
                    // console.log("show-menu");
                    existingImg = searchIcon.querySelector('img')
                    if (existingImg) {
                        newImg.src = '/img/common/ico_search.png'
                        newImg.alt = 'search'
                        searchIcon.replaceChild(newImg, existingImg)
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
})

function handleClick() {
    console.log('Button clicked!')
}

/*search-button*/
var searchButton = document.querySelector('.search-btn')
const subMenu = document.querySelector('.sub-menu')
const dropDownMenu = document.getElementsByClassName('dropdown')
var hamburger = document.querySelector('.hamburger')
var navMenu = document.querySelector('.nav-menu')
const mediaQuery = window.matchMedia('(max-width: 1025px)')
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
const query = window.matchMedia('(max-width: 1025px)')
const element = document.querySelector('.sidebar')
const header = document.querySelector('.header-inner')

// This function handles the media query changes
function handle(event) {
    if (event.matches) {
        if (element) {
            header.style.marginBottom = '60px'
        } else {
            header.style.marginBottom = '0px'
        }
    } else {
        header.style.marginBottom = '0px'
    }
}
handle(query)
query.addListener(handle)

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

// Call the alignment function when the page loads
window.addEventListener('load', accordionHeight)
window.addEventListener('resize', accordionHeight)

function setOverflow(query) {
    if (query.matches) {
        if(hamburger){
            if (hamburger.classList.contains('active')) {
                bodyElement.style.overflow = 'hidden'
            }
        }
       
    } else {
        bodyElement.style.overflow = 'auto'
        bodyElement.style.position = 'relative'
    }
}
setOverflow(query)
query.addListener(setOverflow)
window.addEventListener('resize', setOverflow(query))

/*header nav-menu add active-class*/
var currentUrl = window.location.href.split('?')[0]
var menuItems = document.querySelectorAll(
    '.sugi-nursing-header .nav-menu-list li a, .sugi-nursing-header .header-contact-btn a, .sugi-medical-header .nav-menu-list li a, .sugi-holding-header .nav-menu-list li a,.sugi-holding-header .sub-nav-list a',
)
menuItems.forEach(function (item) {
    var menuItemUrl = item.href.split('?')[0]
    if (menuItemUrl === currentUrl) {
        item.classList.add('active')
    }
})

document.addEventListener('DOMContentLoaded', function () {
    var menuItems = document.querySelectorAll(
        '.sugi-holding-header .nav-menu-list li .dropdown-list',
    )
    var activeClass = 'active'
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
            item.classList.add(activeClass)
        })
    })
})

/*new-window-open-js*/
function openFullScreenWindow(url) {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var newWindow = window.open(url, '_blank', 'width=' + screenWidth + ',height=' + screenHeight);
    if (!newWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this site.');
    }
  }