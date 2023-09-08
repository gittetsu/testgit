// number only input
function validateNumericInput(inputElement) {
	inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
}


var surNameError = document.getElementById("surname-error");
var nameError = document.getElementById("name-error");
var furiNameError = document.getElementById("furiName-error");
var furiSurNameError = document.getElementById("furiSurname-error")
var phnoError = document.getElementById("phno-error");
var emailError = document.getElementById("email-error");
var descriptionError = document.getElementById("description-error");
var customselectError = document.getElementById("customselect-error");
var agreementCheckboxErorr = document.getElementById("agreement-check-error");
var isFirstName = false;
var isLastName = false;
var isfuriName = false;
var isfuriSurName = false;
var isEmail = false;
var isDescription = false;
var isselectedOption = false;
var ishandleAgreement = false;
/*keyup*/
var surName = document.getElementById("surname");
surName.addEventListener("keyup", validateFirstName);
surName.addEventListener("focusout", validateFirstName);
function validateFirstName() {
	var surName = document.getElementById("surname").value;
	if (surName.length == 0) {
		isFirstName = false;
		surNameError.style.display = "block";
		document.getElementById("surname").classList.add("error");
	} else {
		isFirstName = true;
		surNameError.style.display = "none";
		document.getElementById("surname").classList.remove("error");
	}
}
var lastName = document.getElementById("lastname");
lastName.addEventListener("keyup", validateLastName);
lastName.addEventListener("focusout", validateLastName);
function validateLastName() {
	var lastName = document.getElementById("lastname").value;
	if (lastName.length == 0) {
		isLastName = false;
		nameError.style.display = "block";
		document.getElementById("lastname").classList.add("error");
	} else {
		isLastName = true;
		nameError.style.display = "none";
		document.getElementById("lastname").classList.remove("error");
		return true;
	}
}
var furiSurname = document.getElementById("furiSurname");
furiSurname.addEventListener("keyup", validateSurName);
furiSurname.addEventListener("focusout", validateSurName);
function validateSurName() {
	var furiSurname = document.getElementById("furiSurname").value;
	if (furiSurname.length == 0) {
		isfuriSurName = false;
		furiSurNameError.style.display = "block";
		document.getElementById("furiSurname").classList.add("error");
	} else {
		isfuriSurName = true;
		furiSurNameError.style.display = "none";
		document.getElementById("furiSurname").classList.remove("error");
	}
}

var furiname = document.getElementById("furiName");
furiname.addEventListener("keyup", validateFuriName);
furiname.addEventListener("focusout", validateFuriName);
function validateFuriName() {
	var furiname = document.getElementById("furiName").value;
	if (furiname.length == 0) {
		isfuriName = false;
		furiNameError.style.display = "block";
		document.getElementById("furiName").classList.add("error");
	} else {
		isfuriName = true;
		furiNameError.style.display = "none";
		document.getElementById("furiName").classList.remove("error");
	}
}
var email = document.getElementById("mailAddress");
email.addEventListener("keyup", validateEmail);
email.addEventListener("focusout", validateEmail);

function validateEmail() {
	var emailValue = email.value;
	const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[^\s@]+$/;

	var spanElements = emailError.getElementsByTagName("span");
	if (emailValue.length == 0) {
		isEmail = false
		email.classList.add("error");
		spanElements[0].innerHTML = "必須につき入力をお願いします";
		emailError.style.display = "block";
	} else if (!emailRegex.test(emailValue)) {
		isEmail = false
		email.classList.add("error");
		emailError.style.display = "block";
		const regex = /^[^@\s]+@[^@]*[a-zA-Z0-9]+$/;
		if (regex.test(emailValue)) {
			isEmail = false
			spanElements[0].innerHTML = " 特殊な形式のメールアドレスです。<br> 入力内容に不備がないか確認いただくか、他のメールアドレスを入力ください。<br>【特殊な形式のメールアドレスの例】<br>・アドレスの先頭または、@マークの直前にピリオドがある<br>・@マークより前でピリオドが連続している<br>・@マークより後ろに存在しないドメインを指定している";
		} else {
			isEmail = false
			spanElements[0].innerHTML =
				"正しいメールアドレスの形式で入力をお願いします";
		}
	} else {
		isEmail = true
		emailError.style.display = "none";
		email.classList.remove("error");
	}
}
var phoneNumber = document.getElementById("phoneNumber");
var phoneNoFirst = document.getElementById("phoneNoFirst");
var phoneNoLast = document.getElementById("phoneNoLast");
phoneNumber.addEventListener("keyup", validatephoneNumber);
phoneNoFirst.addEventListener("keyup", validatephoneNumber);
phoneNoLast.addEventListener("keyup", validatephoneNumber);

function validatephoneNumber() {
	var phNo = phoneNumber.value; // This is "area code"
	var phNoFirst = phoneNoFirst.value; // This is "second part"
	var phNoLast = phoneNoLast.value; // This is "third part"
	var spanElements = phnoError.getElementsByTagName("span");
	const phRegx = /^\d{1,4}$/;
	if (!phRegx.test(phNo) || !phRegx.test(phNoFirst) || !phRegx.test(phNoLast)) {
		phnoError.style.display = "block";
		if (phNo.length == 0 && phNoFirst.length == 0 && phNoLast.length == 0) {
			phnoError.style.display = "none";
		} else {
			spanElements[0].innerHTML = "半角数字で入力をお願いします";
		}
	}
	phoneNumber.classList.toggle("error", !phRegx.test(phNo));
	phoneNoFirst.classList.toggle("error", !phRegx.test(phNoFirst));
	phoneNoLast.classList.toggle("error", !phRegx.test(phNoLast));

	if (phNo.length == 0) {
		phoneNumber.classList.remove("error");
	}
	if (phNoFirst.length == 0) {
		phoneNoFirst.classList.remove("error");
	}
	if (phNoLast.length == 0) {
		phoneNoLast.classList.remove("error");
	}

	if (phRegx.test(phNo) && phRegx.test(phNoFirst) && phRegx.test(phNoLast)) {
		phnoError.style.display = "none";
	}
}
var description = document.getElementById("description")
description.addEventListener("keyup", valiateDescription);
description.addEventListener("focusout", valiateDescription);
function valiateDescription() {
	var description = document.getElementById("description").value;
	if (description.length == 0) {
		isDescription = false;
		document.getElementById("description").classList.add("error");
		descriptionError.style.display = "block";
	}
	else {
		isDescription = true;
		document.getElementById("description").classList.remove("error");
		descriptionError.style.display = "none";
	}
}
const agreementCheck = document.getElementById("agreement");
agreementCheck.addEventListener("change", handleAgreementCheckboxChange);
function handleAgreementCheckboxChange() {
	if (agreementCheck.checked) {
		ishandleAgreement = true;
		agreementCheckboxErorr.style.display = "none";
		agreementCheck.parentElement.classList.remove("error");
	} else {
		ishandleAgreement = false;
		agreementCheckboxErorr.style.display = "block";
		agreementCheck.parentElement.classList.add("error");
	}
}
var contactType = document.getElementById("contactType");

contactType.addEventListener("change", customSelectChange);
function customSelectChange() {
	var selectedOption = contactType.options[contactType.selectedIndex];
	if (selectedOption.value === "") {
		isselectedOption = false;
		customselectError.style.display = "block";
		document.getElementById("contactType").classList.add("error");
	}
	else {
		isselectedOption = true;
		customselectError.style.display = "none";
		document.getElementById("contactType").classList.remove("error");
	}
}
var contactForm = document.getElementById("contact-form");

// Add a submit event listener to the form
contactForm.addEventListener("submit", function (e) {
	e.preventDefault();
	validateFirstName();
	validateLastName();
	validateSurName();
	validateFuriName();
	validateEmail();
	valiateDescription();
	handleAgreementCheckboxChange();
	customSelectChange();
	var messages = document.querySelectorAll("p.err-msg");
	var elementToScrollTo = document.getElementById("contact-form");
	messages.forEach(function (message) {
		if (window.getComputedStyle(message).display === "block") {
			elementToScrollTo.scrollIntoView({ behavior: "smooth" });
		}
	});

	if (isFirstName && isLastName && isfuriName && isfuriSurName && isEmail && isDescription && isselectedOption && ishandleAgreement) {
		this.submit();
		window.location("confirm");
	}
});