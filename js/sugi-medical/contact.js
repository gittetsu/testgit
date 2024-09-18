var firstNameError = document.getElementById("firstname-error");
var lastnameError = document.getElementById("lastname-error");
var furifirstNameError = document.getElementById("furifirstname-error");
var furilastnameError = document.getElementById("furilastname-error");
var companyNameError = document.getElementById("companyName-error");
var phnoError = document.getElementById("phno-error");
var emailError = document.getElementById("email-error");
var contactError = document.getElementById("contactDescription-error");
var agreementCheckboxErorr = document.getElementById("agreement-check-error");
var replyError = document.getElementById("reply-error");
var isFirstName = false;
var isLastName = false;
var isCompanyName = false;
var isEmail = false;
var isContact = false;
var isPhone = false;
var isReplySelect = false;
var ishandleAgreement = false;
const isEngish = document.documentElement.lang === "en";
const form = document.getElementById("contact-form");

form.addEventListener("submit", submitForm);

/*keyup Hiragana Check*/
var firstName = document.getElementById("firstname");
firstName.addEventListener("keyup", validateFirstName);
firstName.addEventListener("focusout", validateFirstName);
const alphabetPattern = /^[a-zA-Z ]*$/;
function validateFirstName() {
  var firstName = document.getElementById("firstname").value;
  var spanElements = firstNameError.getElementsByTagName("span");
  if (firstName.length == 0 || /^\s+$/.test(firstName)) {
    isFirstName = false;
    firstNameError.style.display = "block";
    if (isEngish) {
      spanElements[0].innerHTML = "Please fill in the required fields.";
    } else {
      spanElements[0].innerHTML = "必須につき入力をお願いします";
    }
    document.getElementById("firstname").classList.add("error");
  } else if (isEngish && !alphabetPattern.test(firstName)) {
    isFirstName = false;
    document.getElementById("firstname").classList.add("error");
    firstNameError.style.display = "block";
    spanElements[0].innerHTML = "Please enter in alphabetically.";
  } else {
    isFirstName = true;
    firstNameError.style.display = "none";
    document.getElementById("firstname").classList.remove("error");
  }
}

var lastName = document.getElementById("lastname");
lastName.addEventListener("keyup", validateLastName);
lastName.addEventListener("focusout", validateLastName);
function validateLastName() {
  var lastName = document.getElementById("lastname").value;
  var spanElements = lastnameError.getElementsByTagName("span");
  if (lastName.length == 0 || /^\s+$/.test(lastName)) {
    isLastName = false;
    lastnameError.style.display = "block";
    if (isEngish) {
      spanElements[0].innerHTML = "Please fill in the required fields.";
    } else {
      spanElements[0].innerHTML = "必須につき入力をお願いします";
    }
    document.getElementById("lastname").classList.add("error");
  } else if (isEngish && !alphabetPattern.test(lastName)) {
    isLastName = false;
    document.getElementById("lastname").classList.add("error");
    lastnameError.style.display = "block";
    spanElements[0].innerHTML = "Please enter in alphabetically.";
  } else {
    isLastName = true;
    lastnameError.style.display = "none";
    document.getElementById("lastname").classList.remove("error");
    return true;
  }
}

/*companyName Check*/
var companyName = document.getElementById("companyName");
companyName.addEventListener("keyup", validateCompanyName);
companyName.addEventListener("focusout", validateCompanyName);
function validateCompanyName() {
  var companyName = document.getElementById("companyName").value;
  var spanElements = companyNameError.getElementsByTagName("span");
  if (companyName.length == 0 || /^\s+$/.test(companyName)) {
    isCompanyName = false;
    companyNameError.style.display = "block";
    if (isEngish) {
      spanElements[0].innerHTML = "Please fill in the required fields.";
    } else {
      spanElements[0].innerHTML = "必須につき入力をお願いします";
    }
    document.getElementById("companyName").classList.add("error");
  } else if (isEngish && !alphabetPattern.test(companyName)) {
    isCompanyName = false;
    document.getElementById("companyName").classList.add("error");
    companyNameError.style.display = "block";
    spanElements[0].innerHTML = "Please enter in alphabetically.";
  } else {
    isCompanyName = true;
    companyNameError.style.display = "none";
    document.getElementById("companyName").classList.remove("error");
  }
}

/* Email Check */
var email = document.getElementById("mailAddress");
email.addEventListener("keyup", validateEmail);
email.addEventListener("focusout", validateEmail);

function validateEmail() {
  var emailValue = email.value;
  const emailRegex = /^[^@\s]+@[^@]+\.[a-zA-Z0-9.-]+$/;

  var spanElements = emailError.getElementsByTagName("span");
  if (emailValue.length == 0) {
    isEmail = false;
    email.classList.add("error");
    if (isEngish) {
      spanElements[0].innerHTML = "Please fill in the required fields.";
    } else {
      spanElements[0].innerHTML = "必須につき入力をお願いします";
    }
    emailError.style.display = "block";
  } else if (!emailRegex.test(emailValue)) {
    isEmail = false;
    email.classList.add("error");
    emailError.style.display = "block";
    const regex = /^[^@\s]+@[^@]*[a-zA-Z0-9]+$/;
    if (regex.test(emailValue)) {
      if (isEngish) {
        spanElements[0].innerHTML =
          'We cannot accept your email address because it is a special type. <br>Please check whether your email address is correct or not. Or please use another email address. <br>[Special type of email addresses]<br>- There is a dot "." for the first letter and/or before "@".<br>- There are some dots (".." or "…") before "@". <br>- The email address contains the domain names which do not exist.';
      } else {
        spanElements[0].innerHTML =
          "特殊な形式のメールアドレスです。<br> 入力内容に不備がないか確認いただくか、他のメールアドレスを入力ください。<br>【特殊な形式のメールアドレスの例】<br>・アドレスの先頭または、@マークの直前にピリオドがある<br>・@マークより前でピリオドが連続している<br>・@マークより後ろに存在しないドメインを指定している";
      }
    } else {
      if (isEngish) {
        spanElements[0].innerHTML = "Please enter in a valid email address.";
      } else {
        spanElements[0].innerHTML = "メールアドレスの形式で入力してください。";
      }
    }
  } else {
    isEmail = true;
    emailError.style.display = "none";
    email.classList.remove("error");
  }
}

/* Phone Number Check */
var phoneNumber = document.getElementById("phoneNumber");
var phoneNoFirst = document.getElementById("phoneNoFirst");
var phoneNoLast = document.getElementById("phoneNoLast");
phoneNumber.addEventListener("keyup", validatephoneNumber);
phoneNoFirst.addEventListener("keyup", validatephoneNumber);
phoneNoLast.addEventListener("keyup", validatephoneNumber);
phoneNumber.addEventListener("focusout", validatephoneNumber);
phoneNoFirst.addEventListener("focusout", validatephoneNumber);
phoneNoLast.addEventListener("focusout", validatephoneNumber);

function validatephoneNumber() {
  var phNo = phoneNumber.value; // This is "area code"
  var phNoFirst = phoneNoFirst.value; // This is "second part"
  var phNoLast = phoneNoLast.value; // This is "third part"
  var spanElements = phnoError.getElementsByTagName("span");

  const phRegx = /^\d{1,4}$/;
  if (!phRegx.test(phNo) || !phRegx.test(phNoFirst) || !phRegx.test(phNoLast)) {
    isPhone = false;
    phnoError.style.display = "block";
    if (isEngish) {
      spanElements[0].innerHTML = "Please enter a valid phone number.";
    } else {
      spanElements[0].innerHTML = "有効な電話番号を入力してください。";
    }
  }
  phoneNumber.classList.toggle("error", !phRegx.test(phNo));
  phoneNoFirst.classList.toggle("error", !phRegx.test(phNoFirst));
  phoneNoLast.classList.toggle("error", !phRegx.test(phNoLast));

  if (phRegx.test(phNo) && phRegx.test(phNoFirst) && phRegx.test(phNoLast)) {
    isPhone = true;
    phnoError.style.display = "none";
  } else if (phNo.length == 0 || phNoFirst.length == 0 || phNoLast.length == 0) {
    isPhone = false;
    phnoError.style.display = "block";
    phoneNumber.classList.add("error");
    phoneNoFirst.classList.add("error");
    phoneNoLast.classList.add("error");
  }
}
/* Contact Description Check */
var contactDescription = document.getElementById("contactDescription");
contactDescription.addEventListener("keyup", validateDescription);
contactDescription.addEventListener("focusout", validateDescription);
function validateDescription() {
  var contactDescriptionValue = document.getElementById("contactDescription").value;
  if (contactDescriptionValue.length == 0 || /^\s+$/.test(contactDescriptionValue) || contactDescriptionValue == "\n") {
    isContact = false;
    contactError.style.display = "block";
    contactDescription.classList.add("error");
  } else {
    isContact = true;
    contactError.style.display = "none";
    contactDescription.classList.remove("error");
  }
}

/* Reply Select Check */

const replySelect = document.querySelectorAll('input[name="reply"]');
replySelect.forEach((reply) => {
  reply.addEventListener("change", validateReplySelect);
});
function validateReplySelect() {
  if (Array.from(replySelect).every((reply) => !reply.checked)) {
    isReplySelect = false;
    replyError.style.display = "block";
    if (isEngish) {
      replyError.innerHTML = "Please select one of the options.";
    } else {
      replyError.innerHTML = "いずれかの項目を選択してください。";
    }
  } else {
    isReplySelect = true;
    replyError.style.display = "none";
  }
}

/* Agreement Check */
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
// If contact form is not submitted
sessionStorage.removeItem("mediFormSubmitted");
// Add a submit event listener to the form
function submitForm(e) {
  e.preventDefault();
  validateFirstName();
  validateLastName();
  validateCompanyName();
  validateEmail();
  validateDescription();
  validatephoneNumber();
  validateReplySelect();
  handleAgreementCheckboxChange();
  var messages = document.querySelectorAll("p.err-msg");
  var elementToScrollTo = document.getElementById("contact-form");
  messages.forEach(function (message) {
    if (window.getComputedStyle(message).display === "block") {
      elementToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  });
  if (isFirstName && isLastName && isCompanyName && isEmail && isContact && isReplySelect && ishandleAgreement) {
    const fname = document.getElementById("firstname").value;
    const lname = document.getElementById("lastname").value;
    const furifirst = document.getElementById("furifirstname").value;
    const furilast = document.getElementById("furilastname").value;
    const companyName = document.getElementById("companyName").value;
    const department = document.getElementById("department").value;
    const post = document.getElementById("post").value;
    const occupation = document.getElementById("occupation").value;
    const phoneNumber = document.getElementById("phoneNumber").value + "-" + document.getElementById("phoneNoFirst").value + "-" + document.getElementById("phoneNoLast").value;
    const mailAddress = document.getElementById("mailAddress").value;
    const contactDesc = document.getElementById("contactDescription").value;
    const replySelects = document.querySelectorAll('input[name="reply"]:checked');
    const replySelect = Array.from(replySelects)
      .map((reply) => reply.value)
      .join(", ");
    const agreementChk = document.getElementById("agreement").nextElementSibling.innerHTML;
    const formData = {
      fname: encodeURIComponent(fname),
      lname: encodeURIComponent(lname),
      furifirst: encodeURIComponent(furifirst),
      furilast: encodeURIComponent(furilast),
      companyName: encodeURIComponent(companyName),
      department: encodeURIComponent(department),
      post: encodeURIComponent(post),
      occupation: encodeURIComponent(occupation),
      phoneNumber: encodeURIComponent(phoneNumber),
      mailAddress: encodeURIComponent(mailAddress),
      contactDesc: encodeURIComponent(contactDesc),
      replySelect: encodeURIComponent(replySelect),
      agreementChk: encodeURIComponent(agreementChk),
    };
    // Store the form data in LocalStorage
    localStorage.setItem("mediFormData", JSON.stringify(formData));

    // Construct the URL without adding parameters directly
    const url = "confirm/";

    // Set a flag in sessionStorage to indicate that the form has been submitted
    sessionStorage.setItem("mediFormSubmitted", "true");

    // Redirect to confirm.html without displaying parameters in the URL bar
    window.location.href = url;
  }
}
