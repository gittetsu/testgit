//mv slider for top page
var i = 0; // Start from the first image
var slideTime = 3000; // 3 seconds
var pcImages = [
	'/img/sugi-medical/img_mv_bg_01.png',
	'/img/sugi-medical/img_mv_bg_02.png',
	'/img/sugi-medical/img_mv_bg_01.png',
	'/img/sugi-medical/img_mv_bg_01.png'
];

var spImages = [
	'/img/sugi-medical/img_mv_bg_01_sp.png',
	'/img/sugi-medical/img_mv_bg_02_sp.png',
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

window.onload = function () {
	changePicture();
};

// Handle window resize to update images when screen width changes
window.addEventListener('resize', function () {
	updateImages();
	clearTimeout(slideTimeout); // Clear existing timeout

	// Refresh pagination dots and continue the current slide
	updatePagination();
	changePicture();
});

// Update the images when the window is resized
function updateImages() {
	var currentImages = window.innerWidth >= 768 ? pcImages : spImages; // Use PC images for larger screens, SP images for smaller screens
	images = currentImages;
	updatePagination();
}

//height line js
function alignElementsBasedOnHeight() {
  const elements = document.querySelectorAll('.tab-left .common-txt');
  let maxHeight = 0;

  // Find the maximum height
  elements.forEach(element => {
    element.style.removeProperty("height");
    const height = element.getBoundingClientRect().height;
    maxHeight = Math.max(maxHeight, height);
  });

  // Set the maximum height to all elements
  elements.forEach(element => {
    element.style.height = `${maxHeight}px`;
  });
}

// Call the alignment function when the page loads
window.addEventListener("resize", alignElementsBasedOnHeight);
window.addEventListener('load', alignElementsBasedOnHeight);