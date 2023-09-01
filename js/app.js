//tabs
function handleTabClick(tabs, tabContents) {
	tabs.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			const target = tabContents[index];
			tabContents.forEach((tabContent) => {
				tabContent.classList.remove('active');
			});
			tabs.forEach((tab) => {
				tab.classList.remove('active');
			});
			tab.classList.add('active');
			target.classList.add('active');
		});
	});
}

function setupTabs(parentClass) {
	const parent = document.querySelector(parentClass);
	const tabs = parent.querySelectorAll('.tablinks');
	const tabContents = parent.querySelectorAll('.tab-cnt');
	handleTabClick(tabs, tabContents);
}

setupTabs('.sec-news .tab-list');
setupTabs('.sec-number-area .number-gp-blk');

//height line js
function alignElementsBasedOnHeight() {
  const elements = document.querySelectorAll('.topics-txt .text-02');
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


//mv slider for top page
var i = 1; // Start from the first image
var slideTime = 3000; // 3 seconds
var pcImages = [
  '/img/img_mv_bg_01.png',
  '/img/img_mv_bg_02.png',
  '/img/img_mv_bg_03.png',
  '/img/img_mv_bg_04.png'
];

var spImages = [
  '/img/img_mv_bg_01_sp.png',
  '/img/img_mv_bg_02_sp.png',
  '/img/img_mv_bg_03_sp.png',
  '/img/img_mv_bg_04_sp.png'
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


//image slider for top page
const slideshowContainer = document.querySelector('.slider-image');
const slides = document.querySelector('.slides-list');
const slideItems = document.querySelectorAll('.slide-item');
const slideWidth = slideItems[0].clientWidth;
const intervalTime = 3000;
const initialSlideCount = 4;
const transitionDuration = 2000; // Change this value to adjust the transition duration

let currentSlide = 0;
let translateXValue = 0;

function showSlide(slideIndex) {
  if (slideIndex < 0 || slideIndex >= slideItems.length) return;

  currentSlide = slideIndex;

  slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;
  translateXValue = -(currentSlide * slideWidth);
  slides.style.transform = `translateX(${translateXValue}px)`;
}

function nextSlide() {
  const nextSlideIndex = (currentSlide + 1) % slideItems.length;

  slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;

  // If the next slide is the first slide (after the last one), append the first slide to the end
  if (nextSlideIndex === 0) {
    // Calculate the new translateXValue to move to the first slide smoothly
    translateXValue = -(slideItems.length * slideWidth);

    // After the transition, reset the translateXValue to 0 without transition
    setTimeout(() => {
      slides.style.transition = 'none';
      slides.style.transform = `translateX(0)`;
      setTimeout(() => {
        slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;
      }, 50);
    }, transitionDuration);
  } else {
    translateXValue = -(nextSlideIndex * slideWidth);
  }

  slides.style.transform = `translateX(${translateXValue}px)`;

  currentSlide = nextSlideIndex;
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
  showSlide(currentSlide);
}

// Initialize the slideshow
function initSlideshow() {
  for (let i = 0; i < initialSlideCount; i++) {
    slides.appendChild(slideItems[i].cloneNode(true));
  }

  // Set initial position without transition
  slides.style.transition = 'none';
  slides.style.transform = `translateX(0)`;

  // Wait a moment to allow the initial position to be set before adding the transition again
  setTimeout(() => {
    slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;
  }, 50);

  setInterval(nextSlide, intervalTime);
}

initSlideshow();


//progress bar slider for top page
const crouselSlide = document.querySelector(".topics-slider");
const crouselImages = document.querySelectorAll(".topics-slider .topics-item");
const progressBar = document.querySelector(".progress");
const progressBarContainer = document.querySelector(".progress-bar");

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

let counter = 3;
const size = crouselImages[0].clientWidth;
crouselSlide.style.transform = "translateX(" + -size * counter + "px)";
updateProgressBar();

nextBtn.addEventListener("click", () => {
  if (counter >= crouselImages.length - 4) return;
  crouselSlide.style.transition = "transform 0.4s ease-in-out";
  counter++;
  crouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  console.log(counter);
  console.log(crouselSlide.style.transform)
  updateProgressBar();
});

prevBtn.addEventListener("click", () => {
  if (counter <= 2) return;
  crouselSlide.style.transition = "transform 0.4s";
  counter--;
  crouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  updateProgressBar();

});


function updateProgressBar() {
  const progress = ((counter - 1) / (crouselImages.length - 6)) * 100; // Subtract 1 from counter to account for starting at 1 instead of 0
  const progressBarWidth = Math.min(100, Math.max(25, progress)); // Set a minimum width of 25% and a maximum width of 100%
  progressBar.style.width = progressBarWidth + "%";
}

crouselSlide.addEventListener("transitionend", () => {
  if (crouselImages[counter].id === "lastClone") {
    crouselSlide.style.transition = "none";
    counter = crouselImages.length - counter - 3;
    crouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  if (crouselImages[counter].id === "firstClone") {
    crouselSlide.style.transition = "none";
    counter = crouselImages.length - counter - 1;
    crouselSlide.style.transform = "translateX(" + -size * counter + "px)";
  }
  updateProgressBar();
});

window.addEventListener("load", () => {
  const progressBarContainerWidth = progressBarContainer.clientWidth;
  const initialProgress = (25 / 100) * progressBarContainerWidth;
  progressBar.style.width = initialProgress + "px";
});
