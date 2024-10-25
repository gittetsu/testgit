// Get form data from localStorage
const formDataString = localStorage.getItem("mediFormData");
const formData = formDataString ? JSON.parse(formDataString) : null;

// Check if the form was successfully submitted on the contact page
const formSubmitted = sessionStorage.getItem("mediFormSubmitted");
// Check the form is english or not
const isEngish = document.documentElement.lang === "en";

const form = document.getElementById("confirm-form");
const confirmBtn = document.getElementById("confirm-btn");

if (!formSubmitted) {
  // If the form was not submitted, redirect the user back to the contact page
  if (isEngish) {
    window.location.href = "/sugi-medical/en/contact/";
  } else {
    window.location.href = "/sugi-medical/contact/";
  }
}

confirmBtn.addEventListener("click", confirmSubmission);

// Check if formData is not null
if (formData) {
  const name = decodeURIComponent(formData.lname) + " " + decodeURIComponent(formData.fname);
  const furiname = decodeURIComponent(formData.furilast) + " " + decodeURIComponent(formData.furifirst);
  const company = decodeURIComponent(formData.companyName);
  const department = formData.department ? decodeURIComponent(formData.department) : "";
  const post = formData.post ? decodeURIComponent(formData.post) : "";
  const occupation = formData.occupation ? decodeURIComponent(formData.occupation) : "";
  const phone = formData.phoneNumber ? decodeURIComponent(formData.phoneNumber) : "";
  const email = decodeURIComponent(formData.mailAddress);
  const desc = decodeURIComponent(formData.contactDesc).replace(/%0A/g, "\n");
  const reply = decodeURIComponent(formData.replySelect);
  const agreement = decodeURIComponent(formData.agreementChk);

  // Populate the confirmation form
  document.getElementById("name").value = name;
  document.getElementById("furiname").value = furiname;
  document.getElementById("company").value = company;
  document.getElementById("department").value = department;
  document.getElementById("post").value = post;
  document.getElementById("occupation").value = occupation;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;
  document.getElementById("desc").value = desc;
  document.getElementById("reply").value = reply;
  document.getElementById("agreement").value = agreement;

  if (furiname == null || furiname == " ") {
    document.getElementById("furiname").value = "-";
  }
  if (department == null || department == "") {
    document.getElementById("department").value = "-";
  }
  if (post == null || post == "") {
    document.getElementById("post").value = "-";
  }
  if (occupation == null || occupation == "") {
    document.getElementById("occupation").value = "-";
  }
} else {
  // Handle the case when formData is null
  console.error("Form data not available.");
}

// Clear the stored form data in sessionStorage
sessionStorage.removeItem("mediFormData");
sessionStorage.removeItem("mediFormConfirmed");

function confirmSubmission() {
  // Perform your confirmation actions here
  console.log("Confirmation actions performed.");

  // Set the flag to indicate form confirmation
  sessionStorage.setItem("mediFormConfirmed", "true");

  form.submit();
}
