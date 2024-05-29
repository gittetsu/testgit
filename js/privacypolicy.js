/*tab*/
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

document.addEventListener("DOMContentLoaded", function (e) {
	tabs.forEach(tab => {
		tab.classList.remove('active')
	})
	tabContents.forEach(tabContent => {
		tabContent.classList.remove('active')
	})
	if (window.location.hash) {
		let hash = decodeURIComponent(window.location.hash.trim());
		console.log(hash);
		document.querySelector(hash).scrollIntoView();
		if (hash === "#security") {
			var security = document.body.querySelector('.security[data-tab-target="#security"]')
			security.classList.add('active');
			const target = document.querySelector(security.dataset.tabTarget)
			target.classList.add('active');
		}
		else if (hash == "#privacy-policy") {
			var privacy = document.body.querySelector('.privacy[data-tab-target="#privacy-policy"]')
			privacy.classList.add('active');
			const target = document.querySelector(privacy.dataset.tabTarget)
			target.classList.add('active');
		}
		else if (hash == "#mynumber") {
			var mynumber = document.body.querySelector('.mynumber[data-tab-target="#mynumber"]')
			mynumber.classList.add('active');
			const target = document.querySelector(mynumber.dataset.tabTarget)
			target.classList.add('active');
		}
		else if (hash == "#anonymous") {
			var anonymous = document.body.querySelector('.anonymous[data-tab-target="#anonymous"]')
			anonymous.classList.add('active');
			const target = document.querySelector(anonymous.dataset.tabTarget)
			target.classList.add('active');
		}
		
	}
	else{
    var currentRoute = window.location.pathname;
    var newUrl = currentRoute + "#privacy-policy";
    history.pushState(null, null, newUrl);
		var privacy = document.body.querySelector('.privacy[data-tab-target="#privacy-policy"]')
		privacy.classList.add('active');
		const target = document.querySelector(privacy.dataset.tabTarget)
		target.classList.add('active');
}
});

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 50); // Adjust the delay as needed
});
// Redirect to pdf file 
function redirectPdf() {
	const redirects = document.querySelectorAll('.js-redirect');
	redirects.forEach(redirect => {
		redirect.addEventListener('click', function (e) {
			e.preventDefault();
			const pdfFile = this.getAttribute('data-pdf'); // Get the PDF file from data attribute
			window.location.href = pdfFile;
		})
	})
} setTimeout("redirectPdf()", 100);