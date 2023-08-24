// number only input
function validateNumericInput(inputElement) {
	inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
}