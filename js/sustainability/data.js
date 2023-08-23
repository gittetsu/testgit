const tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')

tabs.forEach(tab => {
	tab.addEventListener('click', () => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
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

document.addEventListener("DOMContentLoaded", function (e) {
	tabs.forEach(tab => {
		tab.classList.remove('active')
	})
	tabContents.forEach(tabContent => {
		tabContent.classList.remove('active')
	})
	if (window.location.hash) {
		let hash = decodeURIComponent(window.location.hash.trim());
		document.querySelector(hash).scrollIntoView();
		if (hash === "#integrated-report") {
			var report = document.body.querySelector('.report[data-tab-target="#integrated-report"]')
			report.classList.add('active');
			const target = document.querySelector(report.dataset.tabTarget)
			target.classList.add('active');
		}
		else if (hash == "#nonfinancial-indicators") {
			var indicators = document.body.querySelector('.indicators[data-tab-target="#nonfinancial-indicators"]')
			indicators.classList.add('active');
			const target = document.querySelector(indicators.dataset.tabTarget)
			target.classList.add('active');
		}
		else if (hash == "#GRI-std-comparison") {
			var comparison = document.body.querySelector('.comparison[data-tab-target="#GRI-std-comparison"]')
			comparison.classList.add('active');
			const target = document.querySelector(comparison.dataset.tabTarget)
			target.classList.add('active');
		}
	}
  else{
    var currentRoute = window.location.pathname;
    var newUrl = currentRoute + "#integrated-report";
    history.pushState(null, null, newUrl);
    var report = document.body.querySelector('.report[data-tab-target="#integrated-report"]')
			report.classList.add('active');
			const target = document.querySelector(report.dataset.tabTarget)
			target.classList.add('active');
  }
});

window.onload = function () {
	window.scrollTo(0, 0);
};