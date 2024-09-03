// Check if the form was successfully confirmed on the contact page
const formConfirmed = sessionStorage.getItem("mediFormConfirmed");
// Check the form is english or not
const isEngish = document.documentElement.lang === "en";

if (!formConfirmed) {
  // If the form was not completed or confirmed, redirect the user back to the contact page
  if (isEngish) {
    window.location.href = "/sugi-medical/en/contact/";
  } else {
    window.location.href = "/sugi-medical/contact/";
  }
}
