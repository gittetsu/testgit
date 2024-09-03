// Get form data from localStorage
const formDataString = localStorage.getItem("mediFormData");
const formData = formDataString ? JSON.parse(formDataString) : null;

// Check if the form was successfully submitted on the contact page
const formSubmitted = sessionStorage.getItem("mediFormSubmitted");
// Check the form is english or not
const isEngish = document.documentElement.lang === "en";

if (!formSubmitted) {
  // If the form was not submitted, redirect the user back to the contact page
  if (isEngish) {
    window.location.href = "/sugi-medical/en/contact/";
  } else {
    window.location.href = "/sugi-medical/contact/";
  }
}

// Check if formData is not null
if (formData) {
  const name = decodeURIComponent(formData.lname) + " " + decodeURIComponent(formData.fname);
  const furiname = decodeURIComponent(formData.furilast) + " " + decodeURIComponent(formData.furifirst);
  const company = formData.companyName ? decodeURIComponent(formData.companyName) : "";
  const phone = formData.phoneNumber ? decodeURIComponent(formData.phoneNumber) : "";
  const email = decodeURIComponent(formData.mailAddress);
  const desc = decodeURIComponent(formData.contactDesc);
  const reply = decodeURIComponent(formData.replySelect);
  const agreement = decodeURIComponent(formData.agreementChk);

  // Populate the confirmation form
  document.getElementById("name").value = name;
  document.getElementById("furiname").value = furiname;
  document.getElementById("company").value = company;
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;
  document.getElementById("desc").value = desc;
  document.getElementById("reply").value = reply;
  document.getElementById("agreement").value = agreement;

  if (furiname == null || furiname == " ") {
    document.getElementById("furiname").value = "-";
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
}
