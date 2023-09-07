var surNameError = document.getElementById("surname-error");
var nameError = document.getElementById("name-error");
var phnoError = document.getElementById("phno-error");
var emailError = document.getElementById("email-error");
var companyError = document.getElementById("companyName-error");
var checkboxError = document.getElementById("checkbox-error");
var agreementCheckboxErorr = document.getElementById("agreement-check-error");
var postNumberError = document.getElementById("postNumber-error");
var isFirstName = false;
var isLastName = false;
var isEmail = false;
var isCompany = false;
var isPhone = false;
var ishandleService = false;
var ishandleAgreement = false;
/*keyup*/
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

function validateEmail() {
	var email = document.getElementById("mailAddress").value;
	var spanElements = emailError.getElementsByTagName("span");
	if (email.length == 0) {
		isEmail = false;
		document.getElementById("mailAddress").classList.add("error");
		spanElements[0].innerHTML = "必須につき入力をお願いします";
		emailError.style.display = "block";
	} else if (!email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
		isEmail = false;
		document.getElementById("mailAddress").classList.add("error");
		spanElements[0].innerHTML =
			"正しいメールアドレスの形式で入力をお願いします";
		emailError.style.display = "block";
	}
	else {
		isEmail = true;
		emailError.style.display = "none";
		document.getElementById("mailAddress").classList.remove("error");
	}
}

function validateCompanyName() {
	var companyName = document.getElementById("companyName").value;
	if (companyName.length == 0) {
		isCompany = false
		companyError.style.display = "block";
		document.getElementById("companyName").classList.add("error");
	} else {
		isCompany = true
		companyError.style.display = "none";
		document.getElementById("companyName").classList.remove("error");
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
		isPhone = false;
		phnoError.style.display = "block";
		if (phNo.length == 0 && phNoFirst.length == 0 && phNoLast.length == 0) {
			spanElements[0].innerHTML = "必須につき入力をお願いします";
		} else {
			spanElements[0].innerHTML = "半角数字で入力をお願いします";
		}
	}
	phoneNumber.classList.toggle("error", !phRegx.test(phNo));
	phoneNoFirst.classList.toggle("error", !phRegx.test(phNoFirst));
	phoneNoLast.classList.toggle("error", !phRegx.test(phNoLast));

	if (phRegx.test(phNo) && phRegx.test(phNoFirst) && phRegx.test(phNoLast)) {
		isPhone = true
		phnoError.style.display = "none";
	}
}

postNumber = document.getElementById("postNumber");
postNumber.addEventListener("keyup", function (event) {
	validatePostNumber(event.target.name);
});

postLastNumber = document.getElementById("postLastNumber");
postLastNumber.addEventListener("keyup", function (event) {
	validatePostNumber(event.target.name);
});

function validatePostNumber(checkValue) {
	var firstNumber = postNumber.value;
	var lastNumber = postLastNumber.value;
	var spanElements = postNumberError.getElementsByTagName("span");

	const threePostCode = /^\d{3}$/;
	const fourPostCode = /^\d{4}$/;

	if (checkValue == "postNumber") {
		if (threePostCode.test(firstNumber)) {
			if (!fourPostCode.test(lastNumber)) {
				postNumberError.style.display = "block";
				postLastNumber.classList.add("error");
				if (lastNumber.length < 1) {
					spanElements[0].innerHTML = "必須につき入力をお願いします";
				} else {
					spanElements[0].innerHTML =
						"郵便番号2は4文字の半角数字で入力してください";
				}
			}
		} else {
			postNumberError.style.display = "block";
			postNumber.classList.add("error");
			if (!fourPostCode.test(lastNumber)) {
				postLastNumber.classList.add("error");
			}
			if (firstNumber.length < 1) {
				spanElements[0].innerHTML = "必須につき入力をお願いします";
			} else {
				spanElements[0].innerHTML =
					"郵便番号1は3文字の半角数字で入力してください";
			}
		}
	}
	if (checkValue == "postLastNumber") {
		if (fourPostCode.test(lastNumber)) {
			if (!threePostCode.test(firstNumber)) {
				postNumberError.style.display = "block";
				postNumber.classList.add("error");
				if (firstNumber.length < 1) {
					spanElements[0].innerHTML = "必須につき入力をお願いします";
				} else {
					spanElements[0].innerHTML =
						"郵便番号1は3文字の半角数字で入力してください";
				}
			}
		} else {
			postNumberError.style.display = "block";
			postLastNumber.classList.add("error");
			if (!threePostCode.test(firstNumber)) {
				postNumber.classList.add("error");
			}
			if (lastNumber.length < 1) {
				spanElements[0].innerHTML = "必須につき入力をお願いします";
			} else {
				spanElements[0].innerHTML =
					"郵便番号2は4文字の半角数字で入力してください";
			}
		}
	}

	if (
		(lastNumber.length < 1 && firstNumber.length < 1) ||
		(threePostCode.test(firstNumber) && fourPostCode.test(lastNumber))
	) {
		postNumber.classList.remove("error");
		postLastNumber.classList.remove("error");
		postNumberError.style.display = "none";
	}
	if (threePostCode.test(firstNumber)) {
		postNumber.classList.remove("error");
	}
	if (fourPostCode.test(lastNumber)) {
		postLastNumber.classList.remove("error");
	}
}

/* Checkbox for servcie label */
const phoneCheck = document.getElementById("phoneCheck");
const mailCheck = document.getElementById("mailCheck");

phoneCheck.addEventListener("change", handleServiceCheckboxChange);
mailCheck.addEventListener("change", handleServiceCheckboxChange);


function handleServiceCheckboxChange() {
	if (phoneCheck.checked || mailCheck.checked) {
		ishandleService = true;
		checkboxError.style.display = "none";
		phoneCheck.nextElementSibling.classList.remove("error");
		mailCheck.nextElementSibling.classList.remove("error")
	} else {
		ishandleService = false;
		phoneCheck.nextElementSibling.classList.add("error");
		mailCheck.nextElementSibling.classList.add("error")
		checkboxError.style.display = "block";
	}
}

const agreementCheck = document.getElementById("agreement");
agreementCheck.addEventListener("change", handleAgreementCheckboxChange);
function handleAgreementCheckboxChange() {
	//   for agreement checkbox
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
var contactForm = document.getElementById("contact-form");

// Add a submit event listener to the form
contactForm.addEventListener("submit", function (e) {
	e.preventDefault();
	validateFirstName();
	validateLastName();
	validateEmail();
	validateCompanyName();
	validatephoneNumber();
	handleServiceCheckboxChange();
	handleAgreementCheckboxChange();

	if (isFirstName && isLastName && isEmail && isCompany && isPhone && ishandleService && ishandleAgreement) {
		this.submit();
		window.location("/confirm.html");
	}
});