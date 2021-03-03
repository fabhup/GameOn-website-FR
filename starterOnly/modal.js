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
const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const locationInputs = document.querySelectorAll("input[type=radio][name=location]");
const termsOfServiceInput = document.getElementById("checkbox1");

// Regex Formats 
const emailRegexFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const integerPositiveRegexFormat = /^\+?([0-9]\d*)$/;
const birthdateRegexFormat = /^(19|20)\d{2}[-](0?[1-9]|1[012])[-](0[1-9]|[12]\d|3[01])$/;

// Messages Elements
const errorMessageFirstnameLength = "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const errorMessageLastnameLength  = "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const errorMessageEmailFormat = "Veuillez saisir un email valide.";
const errorMessageBirthdateFormat = "Veuillez indiquer votre date de naissance au format jj/mm/aaaa";
const errorMessageQuantityFormat = "Veuillez indiquer un nombre de tournois joués (nombre entier positif)";
const errorMessageLocationUnchecked  = "Veuillez sélectionner une ville.";
const errorMessageTermsOfServiceUnchecked = "Vous devez vérifier que vous acceptez les termes et conditions."

// Classes Validation Objects
let arrayInputValidationInstances = [];

class InputValidation {
  constructor(inputElement, validationTest, errorMessage) {
      this.inputElement = inputElement;
      this.validationTest = validationTest;
      this.errorMessage = errorMessage;
      arrayInputValidationInstances.push(this);
  }  
}

// Functions for modal form actions
function launchModal() {
  modalBg.style.display = "block";
}
function closeModal() {
  modalBg.style.display = "none";
}

// Functions for data validation

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
 * Check if a Radio Button Location is checked
 * 
 * @return {boolean}
 */
function isRadioChecked(arrayElementsRadio) {
  return arrayElementsRadio.length > 0;
}

/**
* Add an Error Message after an input Element
* 
* @param {element} inputElement 
* @param {string} errorMessage 
*/
function addErrorMessageInput(inputElement, errorMessage) {
  if (inputElement.parentElement.lastChild.className != "errorMessageInput") {
    var span = document.createElement("span");
    span.textContent = errorMessage;
    span.className = "errorMessageInput";
    inputElement.parentElement.appendChild(span);
  }
};

/**
* Remove an Error Message after an input Element
* 
* @param {element} inputElement 
*/
function removeErrorMessageInput(inputElement) {
  if (inputElement.parentElement.lastChild.className == "errorMessageInput") {
    inputElement.parentElement.lastChild.remove();
  }
};

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((elt) => elt.addEventListener("click", closeModal));

/** Launch form validation */
formRegister.addEventListener("submit", function(e) {
  
  e.preventDefault();

  const locationInputsChecked = document.querySelectorAll("input[type=radio][name=location]:checked");
  arrayInputValidationInstances = [];

  let FirstnameValidation = new InputValidation (
    firstnameInput,
    isValidLength(firstnameInput.value, 2, 99),
    errorMessageFirstnameLength
    );
  
  let LastnameValidation = new InputValidation (
    lastnameInput,
    isValidLength(lastnameInput.value, 2, 99),
    errorMessageLastnameLength
    );
  
  let EmailValidation = new InputValidation (
    emailInput,
    isValidRegex(emailInput.value, emailRegexFormat),
    errorMessageEmailFormat
    );
  
  let BirthdateValidation = new InputValidation (
    birthdateInput,
    isValidRegex(birthdateInput.value, birthdateRegexFormat),
    errorMessageBirthdateFormat
    );
  
  let QuantityValidation = new InputValidation (
    quantityInput,
    isValidRegex(quantityInput.value, integerPositiveRegexFormat),
    errorMessageQuantityFormat
    );
  
  let LocationValidation = new InputValidation (
    locationInputs[0],
    isRadioChecked(locationInputsChecked),
    errorMessageLocationUnchecked
    );
    
  let TermsOfServiceValidation = new InputValidation (
    termsOfServiceInput,
    termsOfServiceInput.checked,
    errorMessageTermsOfServiceUnchecked
    );

  for(let InputValidationInstance of arrayInputValidationInstances) { 
    if (InputValidationInstance.validationTest) {
      console.log("validation success for " + InputValidationInstance.inputElement);
      InputValidationInstance.inputElement.style.color = "green";
      removeErrorMessageInput(InputValidationInstance.inputElement);
    }
    else {
      console.log(InputValidationInstance.errorMessage);
      InputValidationInstance.inputElement.style.color = "red";
      addErrorMessageInput(InputValidationInstance.inputElement,InputValidationInstance.errorMessage);
    }
  };
});


// /**
//  * Check if the Firstname input is valid
//  * 
//  * @return {boolean}
//  */
// function isFirstnameValid() {
//   if(isValidLength(firstnameInput.value, 2, 99)) {
//     firstnameInput.style.color = "green";
//     return true;
//   }
//   else {
//     firstnameInput.style.color = "red";
//     addErrorMessageInput(firstnameInput,errorMessageFirstnameLength);
//     return false;
//   }
// }

// /**
//  * Check if the LastName input is valid
//  * 
//  * @return {boolean}
//  */
// function isLastnameValid() {
//   if(isValidLength(lastnameInput.value, 2, 99)) {
//     lastnameInput.style.color = "green";
//     return true;
//   }
//   else {
//     lastnameInput.style.color = "red";
//     addErrorMessageInput(lastnameInput,errorMessageLastnameLength);
//     return false;
//   }
// }

// /**
//  * Check if the Email input is valid
//  * 
//  * @return {boolean}
//  */
// function isEmailValid() {
//   if(isValidRegex(emailInput.value, emailRegexFormat)) {
//     emailInput.style.color = "green";
//     return true;
//   }
//   else {
//     emailInput.style.color = "red";
//     addErrorMessageInput(emailInput,errorMessageEmailFormat);
//     return false;
//   } 
// }

// /**
//  * Check if the Birthdate input is valid
//  * 
//  * @return {boolean}
//  */
// function isBirthdateValid() {
//   return isValidRegex(birthdateInput.value, birthdateRegexFormat); 
// }

// /**
//  * Check if the Quantity input is valid
//  * 
//  * @return {boolean}
//  */
// function isQuantityValid() {
//   return isValidRegex(quantityInput.value, integerPositiveRegexFormat); 
// }

// /**
//  * Check if a the TermsOfService Checkbox is checked
//  * 
//  * @return {boolean}
//  */
// function isTermsOfServiceChecked() {
//   return termsOfServiceInput.checked;
// }

  // let isValidForm = isFirstnameValid() && isLastnameValid() && isEmailValid() && isBirthdateValid() && isQuantityValid()  && isRadioLocationChecked() && isTermsOfServiceChecked();
//   if (isValidForm) {
//     console.log('success');
//   } else {
//     console.log('error');
//   };
// });


// /** Validation of the form */
// formRegister.addEventListener("submit", function(e) {
//   e.preventDefault();
//   document.querySelectorAll('.errorMessageInput').forEach(e => e.remove()); /** delete previous error messages */
//   let isValidForm = isFirstnameValid() && isLastnameValid() && isEmailValid() && isBirthdateValid() && isQuantityValid()  && isRadioLocationChecked() && isTermsOfServiceChecked();
//   if (isValidForm) {
//     console.log('success');
//   } else {
//     console.log('error');
//   };
// });

// const newElt = document.createElement("div");
// let elt = document.getElementById("main");

// elt.appendChild(newElt);

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
