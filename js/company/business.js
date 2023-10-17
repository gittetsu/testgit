// Tabs
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

setupTabs('.sec-effort-support .tab-list:first-child');
setupTabs('.sec-effort-support .tab-list:last-child');
setupTabs('.sec-our-mission .tab-list:first-child');

// Tab Slider
let counter = 2; // Set the initial value of counter to 2 for image slide 2
let size;
const carouselSlide = document.querySelector(".carousel-slide");
const carouselImages = document.querySelectorAll(".carousel-slide .slide");
const tabLists = document.querySelectorAll(".tab-list li a");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const imageElement = carouselImages[0];

function handleSlider() {
	const imageRect = imageElement.getBoundingClientRect();
	const actualWidth = imageRect.width;
	const marginRight = parseFloat(getComputedStyle(imageElement).marginRight);
	size = actualWidth + marginRight;

	carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	updateActiveTab(counter - 1);
}

nextBtn.addEventListener("click", () => {
	counter++;
	if (counter >= carouselImages.length) counter = 0; // Reset to the first slide if reached the end
	carouselSlide.style.transition = "transform 0.4s ease-in-out";
	carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	updateActiveTab(counter - 1);
});

prevBtn.addEventListener("click", () => {
	counter--;
	if (counter < 0) counter = carouselImages.length - 1; // Wrap around to the last slide if at the beginning
	carouselSlide.style.transition = "transform 0.4s ease-in-out";
	carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	updateActiveTab(counter - 1);
});

carouselSlide.addEventListener("transitionend", () => {
	if (carouselImages[counter].id === "lastClone") {
		carouselSlide.style.transition = "none";
		counter = carouselImages.length - 2;

		carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		updateActiveTab(carouselImages.length - 3);
	}

	if (carouselImages[counter].id === "firstClone") {
		carouselSlide.style.transition = "none";
		counter = carouselImages.length - counter;

		carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		updateActiveTab(0);
	}
});

// Function to update the active class for tablist elements
function updateActiveTab(index) {
	tabLists.forEach((tab, i) => {
		if (i === index) {
			tab.classList.add("active");
		} else {
			tab.classList.remove("active");
		}
	});
}

// Event listener for each tablist element
tabLists.forEach((tab, index) => {
	tab.addEventListener("click", () => {
		counter = index + 1;
		if (counter >= carouselImages.length - 1) counter = 1;
		carouselSlide.style.transition = "transform 0.4s ease-in-out";
		carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		updateActiveTab(index);
	});
});

window.addEventListener("load", handleSlider);
window.addEventListener("resize", handleSlider);