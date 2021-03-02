function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const formRegister = document.querySelector("#form-register");

// Input Elements
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const termsOfServiceCheckbox = document.getElementById("checkbox1");

// Regex Formats 
const emailRegexFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const integerPositiveRegexFormat = /^\+?([0-9]\d*)$/;
const birthdateRegexFormat = /^(19|20)\d{2}[-](0?[1-9]|1[012])[-](0[1-9]|[12]\d|3[01])$/;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((elt) => elt.addEventListener("click", closeModal));

// functions modal form actions
function launchModal() {
  modalBg.style.display = "block";
}
function closeModal() {
  modalBg.style.display = "none";
}

//functions for data validation

/**
 * Check if the length of a string is between minLength and maxLength
 * 
 * @param {string} string 
 * @param {number} minLength 
 * @param {number} maxLength 
 * @return {boolean} 
 */
function isValidLength(string, minLength, maxLength) {
    return string.length >= minLength && string.length <= maxLength
  }

/**
 * Check if a string respects a regex format
 * 
 * @param {string} string 
 * @param {string} regexFormat 
 * @return {boolean} 
 */
function isValidRegex(string, regexFormat) {
  return regexFormat.test(string)
}

/**
 * Check if the FirstName input is valid
 * 
 * @return {boolean}
 */
function isFirstNameValid() {
  if(isValidLength(firstNameInput.value, 2, 99)) {
    firstNameInput.style.color = "green";
    return true
  }
  else {
    firstNameInput.style.color = "red";
    return false
  }
  // return isValidLength(firstNameInput.value, 2, 99); 
}

/**
 * Check if the LastName input is valid
 * 
 * @return {boolean}
 */
function isLastNameValid() {
  return isValidLength(lastNameInput.value, 2, 99); 
}

/**
 * Check if the Email input is valid
 * 
 * @return {boolean}
 */
function isEmailValid() {
  return isValidRegex(emailInput.value, emailRegexFormat); 
}

/**
 * Check if the Birthdate input is valid
 * 
 * @return {boolean}
 */
function isBirthdateValid() {
  return isValidRegex(birthdateInput.value, birthdateRegexFormat); 
}

/**
 * Check if the Quantity input is valid
 * 
 * @return {boolean}
 */
function isQuantityValid() {
  return isValidRegex(quantityInput.value, integerPositiveRegexFormat); 
}

/**
 * Check if a Radio Button Location is checked
 * 
 * @return {boolean}
 */
function isRadioLocationChecked() {
  return document.querySelectorAll("input[type=radio][name=location]:checked").size() > 0;
}

/**
 * Check if a the TermsOfService Checkbox is checked
 * 
 * @return {boolean}
 */
function isTermsOfServiceChecked() {
  return termsOfServiceCheckbox.checked;
}

/** Validation of the form */
formRegister.addEventListener("submit", function(e) {
  e.preventDefault();
  if (isFirstNameValid() && isLastNameValid() && isEmailValid() && isBirthdateValid() && isQuantityValid() && isRadioLocationChecked() && isTermsOfServiceChecked()) {
    formData.style.color = green;
    console.log('success');
  } else {
    formData.style.color = red;
    console.log('error');
  };
});



// firstNameInput.addEventListener("input",function(event) {
//   var valueInput = event.target.value;
//   if (isValidLength(valueInput, 2, 99)) {
//     firstNameInput.style.color = "green";
//     // isValid = true;
//   } else {
//     firstNameInput.style.color = "red";
//     // isValid = false;
//   }
// })
