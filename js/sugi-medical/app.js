//mv slider for top page
var i = 0; // Start from the first image
var slideTime = 3000; // 3 seconds
var pcImages = [
	'/img/sugi-medical/img_mv_bg_01.png',
	'/img/sugi-medical/img_mv_bg_02.png'
];

var spImages = [
	'/img/sugi-medical/img_mv_bg_01_sp.png',
	'/img/sugi-medical/img_mv_bg_02_sp.png'
];

var slideTimeout;

function changePicture() {
	var sliderElement = document.querySelector('.mv-slider'); // Select the slider container element

	// Apply a CSS transition for smoother slide
	sliderElement.style.transition = 'background-image 0.5s ease-in-out';

	var currentImages = window.innerWidth >= 768 ? pcImages : spImages; // Use PC images for larger screens, SP images for smaller screens

	sliderElement.style.backgroundImage = "url(" + currentImages[i] + ")";

	updatePagination(); // Update the pagination dots

	if (i < currentImages.length - 1) {
		i++;
	} else {
		i = 0;
	}

	// Clear the existing timeout
	clearTimeout(slideTimeout);

	// Set a new timeout with longer slideTime for slower transition
	slideTimeout = setTimeout(changePicture, slideTime * 2);
}

function updatePagination() {
	var pagination = document.querySelector('.dots');
	pagination.innerHTML = ''; // Clear previous pagination dots

	var currentImages = window.innerWidth >= 768 ? pcImages : spImages; // Use PC images for larger screens, SP images for smaller screens

	for (var j = 0; j < currentImages.length; j++) {
		var dot = document.createElement('span');
		dot.classList.add('dot');
		if (j === i) {
			dot.classList.add('active');
		}
		dot.dataset.slideIndex = j; // Store the slide index as a data attribute
		dot.addEventListener('click', function () {
			i = parseInt(this.dataset.slideIndex); // Update the current index based on the clicked dot's data attribute
			updatePagination(); // Update the pagination dots again

			// Reset the transition temporarily to prevent smooth transition during manual dot clicks
			var sliderElement = document.querySelector('.mv-slider');
			sliderElement.style.transition = 'none';

			changePicture();
		});
		pagination.appendChild(dot);
	}
}

window.addEventListener("load", changePicture);
window.addEventListener("resize", updateImages);

// Update the images when the window is resized
function updateImages() {
	var currentImages = window.innerWidth >= 768 ? pcImages : spImages; // Use PC images for larger screens, SP images for smaller screens

	// Update the background image of the slider container
	var sliderElement = document.querySelector('.mv-slider');
	sliderElement.style.backgroundImage = "url(" + currentImages[i] + ")";

	// Update the pagination dots
	updatePagination();
}

//height line js
function alignElementsBasedOnHeight() {
	const isMobile = window.innerWidth < 768; // Adjust this threshold to target smartphones

	const groups = {
		'.tab-left .common-txt': 0,
		'.website-blk p': 0,
	};

	// Find the maximum height for each group
	for (const selector in groups) {
		const elements = document.querySelectorAll(selector);
		let maxHeight = 0;

		elements.forEach(element => {
			element.style.removeProperty("height");
			const height = element.getBoundingClientRect().height;
			maxHeight = Math.max(maxHeight, height);
		});

		groups[selector] = maxHeight;
	}

	// Set the maximum height for each group of elements
	for (const selector in groups) {
		const elements = document.querySelectorAll(selector);
		const maxHeight = groups[selector];

		if (isMobile && selector === '.tab-left .common-txt') {
			// For SP (smartphone) layout and the specific selector
			elements.forEach(element => {
				element.style.height = `${maxHeight}px`;
			});
		} else {
			// For other cases, remove the height property
			elements.forEach(element => {
				element.style.removeProperty("height");
			});
		}
	}
}

// Call the alignment function when the page loads and on window resize
window.addEventListener("resize", alignElementsBasedOnHeight);
window.addEventListener('load', alignElementsBasedOnHeight);

// Initial alignment when the page loads
alignElementsBasedOnHeight();

// tabs
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
		tab.classList.add('active')
		target.classList.add('active')
	})
})