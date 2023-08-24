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

function handleSlider() {
	// Tab Slider
	const carouselSlide = document.querySelector(".carousel-slide");
	const carouselImages = document.querySelectorAll(".carousel-slide .slide");
	const tabLists = document.querySelectorAll(".tab-list li a");
	const prevBtn = document.querySelector("#prev-btn");
	const nextBtn = document.querySelector("#next-btn");
	const mediaQuery = window.matchMedia("only screen and (max-width: 767.9px)");

	// Set the initial value of counter to 2 for image slide 2
	let counter = 2;
	const size = carouselImages[0].clientWidth
	carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
	let leftPosition = 0;

	if (mediaQuery.matches) {
		carouselSlide.style.left = -40.6 + `%`;
	} else carouselSlide.style.left = -4 + `%`;

	updateActiveTab(counter - 1);

	nextBtn.addEventListener("click", () => {
		if (counter >= carouselImages.length - 1) return;
		carouselSlide.style.transition = "transform 0.2s ease-in-out";
		counter++;
		carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

		// Calculate left position based on counter
		if (mediaQuery.matches) {
			if (counter === 1) {
				leftPosition = -20.3;
			} else if (counter === 4) {
				leftPosition = -20.3;
			} else if (counter === 3) {
				leftPosition = -60.9;
			} else leftPosition = -40.6;
		} else {
			if (counter === 1) {
				leftPosition = -6;
			} else if (counter === 4) {
				leftPosition = -2;
			} else if (counter === 3) {
				leftPosition = -6;
			} else leftPosition = -4;
		}

		carouselSlide.style.left = `${leftPosition}%`;
		updateActiveTab(counter - 1);
	});

	prevBtn.addEventListener("click", () => {
		if (counter <= 0) return;
		carouselSlide.style.transition = "transform 0.2s ease-in-out";
		counter--;
		carouselSlide.style.transform = "translateX(" + -size * counter + "px)";
		if (mediaQuery.matches) {
			if (counter === 1) {
				leftPosition = -20.3;
			} else if (counter === 2) {
				leftPosition = -40.6;
			} else leftPosition = -60.9;
		} else {
			if (counter === 1) {
				leftPosition = -2.3;
			} else if (counter === 2) {
				leftPosition = -4.6;
			} else leftPosition = -6.9;
		}

		carouselSlide.style.left = `${leftPosition}%`;
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
			carouselSlide.style.transition = "transform 0.2s ease-in-out";
			carouselSlide.style.transform = "translateX(" + -size * counter + "px)";

			if (mediaQuery.matches) {
				if (counter === 1) {
					leftPosition = -20.3;
				} else if (counter === 2) {
					leftPosition = -40.6;
				} else leftPosition = -60.9;
			} else {
				if (counter === 1) {
					leftPosition = -2;
				} else if (counter === 2) {
					leftPosition = -4;
				} else leftPosition = -6;
			}

			carouselSlide.style.left = `${leftPosition}%`;
			updateActiveTab(index);
		});
	});
}

window.addEventListener("load", handleSlider);
window.addEventListener("resize", handleSlider);
