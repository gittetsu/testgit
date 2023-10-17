const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
		const target = document.querySelector(tab.dataset.tabTarget)
		tabContents.forEach(tabContent => {
			tabContent.classList.remove('active')
		})
		tabs.forEach(tab => {
			tab.classList.remove('active')
		})
    var hrefValue = tab.getAttribute("data-tab-target");
    var currentRoute = window.location.pathname;
    var newUrl = currentRoute + hrefValue;
    history.pushState(null, null, newUrl);
		tab.classList.add('active')
		target.classList.add('active')
	})
});

const currentPath = window.location.href.split('/').slice(5);
if(currentPath == "" || currentPath == "#fiscal-year-2023" || currentPath == "#fiscal-year-2024") {
	document.addEventListener("DOMContentLoaded", function() {
		setTimeout(function() {
			window.scrollTo(0, 0);
		}, 50);
	});
}

document.addEventListener("DOMContentLoaded", function (e) {
	tabs.forEach(tab => {
		tab.classList.remove('active')
	})
	tabContents.forEach(tabContent => {
		tabContent.classList.remove('active')
	})
	if (window.location.hash) {
		let hash = decodeURIComponent(window.location.hash.trim());
		if (hash == "#fiscal-year-2024") {
			var tabTitle = document.body.querySelector('[data-tab-target="#fiscal-year-2024"]')
			tabTitle.setAttribute('class','active');
			const target = document.querySelector(tabTitle.dataset.tabTarget)
			target.classList.add('active');
		} else {
			var tabTitle = document.body.querySelector('[data-tab-target="#fiscal-year-2023"]')
			tabTitle.setAttribute('class','active');
			const target = document.querySelector(tabTitle.dataset.tabTarget)
			target.classList.add('active');
		}
	}
  else{
    var currentRoute = window.location.pathname;
    var newUrl = currentRoute + "#fiscal-year-2023";
    history.pushState(null, null, newUrl);
    var tablTitle = document.body.querySelector('[data-tab-target="#fiscal-year-2023"]')
		tablTitle.setAttribute('class','active');
		const target = document.querySelector(tablTitle.dataset.tabTarget)
		target.classList.add('active');
  }
});