function alignElementsBasedOnHeight() {
  const elements = document.querySelectorAll('.healthcare-item p');
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
window.addEventListener("resize",  alignElementsBasedOnHeight);
window.addEventListener('load', alignElementsBasedOnHeight);