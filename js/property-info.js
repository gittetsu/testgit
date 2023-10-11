function alignElementsBasedOnHeight() {
	const isMobile = window.innerWidth < 767.9;
	const elements = document.querySelectorAll('.inquiry-ttl');
	let maxHeight = 0;
	if (isMobile) {
		elements.forEach(element => {
			element.style.removeProperty("height");
		});
	}
	else {
		elements.forEach(element => {
			const height = element.getBoundingClientRect().height;
			maxHeight = Math.max(maxHeight, height);
		});

		// Set the maximum height to all elements
		elements.forEach(element => {
			element.style.height = `${maxHeight}px`;
		});
	}

}

// Call the alignment function when the page loads
window.addEventListener("resize", alignElementsBasedOnHeight);
window.addEventListener('load', alignElementsBasedOnHeight);