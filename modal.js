// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const modalForm = document.querySelector("#modal-form");
const modalConfirmMessage = document.querySelectorAll(".modal-confirm-message");
const modalBtnCloseConfirm = document.querySelectorAll(".btn-close-confirm");

// Input Elements
const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const birthdateInput = document.getElementById("birthdate");
const quantityInput = document.getElementById("quantity");
const locationInputs = document.querySelectorAll(
  "input[type=radio][name=location]"
);
const termsOfServiceInput = document.getElementById("checkbox1");

// Regex Formats
const emailRegexFormat = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const integerPositiveRegexFormat = /^\+?([0-9]\d*)$/;
const birthdateRegexFormat = /^(19|20)\d{2}[-](0?[1-9]|1[012])[-](0[1-9]|[12]\d|3[01])$/;

// Messages Elements
const errorMessageFirstnameLength =
  "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
const errorMessageLastnameLength =
  "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
const errorMessageEmailFormat = "Veuillez saisir un email valide.";
const errorMessageBirthdateFormat =
  "Veuillez indiquer votre date de naissance au format jj/mm/aaaa";
const errorMessageAgeMin =
  "Vous devez avoir 18 ans minimum pour vous inscrire.";
const errorMessageQuantityFormat =
  "Veuillez indiquer un nombre de tournois joués (nombre entier positif)";
const errorMessageLocationUnchecked = "Veuillez sélectionner une ville.";
const errorMessageTermsOfServiceUnchecked =
  "Vous devez vérifier que vous acceptez les termes et conditions.";

// Classes Validation Objects
let arrayInputValidationInstances = [];

/**
 * class InputValidation : class to create objects for validate value of an inputElement  
 * */
class InputValidation {
  /**
   * @param {element} inputElement [input element of the DOM]
   * @param {function} validationTest [function applied for the input validation (must return a boolean]
   * @param {string} errorMessage [string message to display if validationTest is false]
   */
  constructor(inputElement, validationTest, errorMessage) {
    this.inputElement = inputElement;
    this.validationTest = validationTest;
    this.errorMessage = errorMessage;
    arrayInputValidationInstances.push(this);
  }
}

// Functions for change class attribut on click 
/**
 * function editNav() : function to add or remove the class "responsive" to the "#myTopnav" element 
 */
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Functions for modal form actions
/**
 * function launchModal() : function to display the modal form 
 */
function launchModal() {
  modalBg.style.display = "block";
  modalForm.style.display = "block";
  modalConfirmMessage.forEach((elt) => (elt.style.display = "none"));
}

/**
 * function closeModal() : function to close the modal form 
 */
function closeModal() {
  modalBg.style.display = "none";
}

/**
 * function displayConfirmMessageModal() : function to display the confirmation message after form validation
 */
function displayConfirmMessageModal() {
  modalForm.style.display = "none";
  modalConfirmMessage.forEach((elt) => (elt.style.display = "flex"));
}

// Functions for data validation
/**
 * function isValidLength() : function to check if the length of a string is between minLength and maxLength
 *
 * @param {string} string
 * @param {number} minLength
 * @param {number} maxLength
 * @return {boolean}
 */
function isValidLength(string, minLength, maxLength) {
  return string.length >= minLength && string.length <= maxLength;
}

/**
 * function isValidRegex() : function to check if a string respects a regex format
 *
 * @param {string} string
 * @param {string} regexFormat
 * @return {boolean}
 */
function isValidRegex(string, regexFormat) {
  return regexFormat.test(string);
}

/**
 * function isRadioChecked() : function to check if one radio button location is checked
 *
 * @return {boolean}
 */
function isRadioChecked(arrayElementsRadio) {
  return arrayElementsRadio.length > 0;
}

/**
 * function addErrorMessageInput() : function to add an Error Message after an input Element
 *
 * @param {element} inputElement
 * @param {string} errorMessage
 */
function addErrorMessageInput(inputElement, errorMessage) {
  inputElement.parentElement.setAttribute("data-error", errorMessage);
  inputElement.parentElement.setAttribute("data-error-visible", true);
}

/**
 * function removeErrorMessageInput() : function to remove an Error Message after an input Element
 *
 * @param {element} inputElement
 */
function removeErrorMessageInput(inputElement) {
  if (inputElement.parentElement.getAttribute("data-error-visible") == "true") {
    inputElement.parentElement.setAttribute("data-error-visible", false);
  }
}

/**
 * function calculateAge() : function to calculate an age from a valid date
 *
 * @param {date} birthdate
 */
function calculateAge(birthdate) {
  var dateOfBirth = new Date(birthdate);
  var diffdateInMilliSeconds = Date.now() - dateOfBirth.getTime();
  var ageDate = new Date(diffdateInMilliSeconds);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Events to open or close the modal form (click events)
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((elt) => elt.addEventListener("click", closeModal));
modalBtnCloseConfirm.forEach((btn) =>
  btn.addEventListener("click", closeModal)
);

// Event to validate the modal form (submit event)
modalForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // declaration and initialization of variables
  const locationInputsChecked = document.querySelectorAll(
    "input[type=radio][name=location]:checked"
  );
  arrayInputValidationInstances = [];
  let isValidForm = true;
  
  // creation of InputValidation objects
  let FirstnameValidation = new InputValidation(
    firstnameInput,
    isValidLength(firstnameInput.value, 2, 99),
    errorMessageFirstnameLength
  );

  let LastnameValidation = new InputValidation(
    lastnameInput,
    isValidLength(lastnameInput.value, 2, 99),
    errorMessageLastnameLength
  );

  let EmailValidation = new InputValidation(
    emailInput,
    isValidRegex(emailInput.value, emailRegexFormat),
    errorMessageEmailFormat
  );

  let BirthdateValidation = new InputValidation(
    birthdateInput,
    isValidRegex(birthdateInput.value, birthdateRegexFormat),
    errorMessageBirthdateFormat
  );

  if (BirthdateValidation.validationTest) {
    let AgeValidation = new InputValidation(
      birthdateInput,
      calculateAge(birthdateInput.value) >= 18,
      errorMessageAgeMin
    );
  }

  let QuantityValidation = new InputValidation(
    quantityInput,
    isValidRegex(quantityInput.value, integerPositiveRegexFormat),
    errorMessageQuantityFormat
  );

  let LocationValidation = new InputValidation(
    locationInputs[0],
    isRadioChecked(locationInputsChecked),
    errorMessageLocationUnchecked
  );

  let TermsOfServiceValidation = new InputValidation(
    termsOfServiceInput,
    termsOfServiceInput.checked,
    errorMessageTermsOfServiceUnchecked
  );
  
  /* loop to test each validationTest
    - if the validationTest is true : the function removeErrorMessageInput() is applied on the inputElement 
    - if the validationTest is false : the function addErrorMessageInput() is applied on the inputElement
    - if at least one validation is false : isValidForm is false
  */   
  for (let InputValidationInstance of arrayInputValidationInstances) {
    if (InputValidationInstance.validationTest) {
      removeErrorMessageInput(InputValidationInstance.inputElement);
    } else {
      addErrorMessageInput(
        InputValidationInstance.inputElement,
        InputValidationInstance.errorMessage
      );
      isValidForm = false;
    }
  }
  // if isValidForm is true : the function displayConfirmMessageModal() is applied  
  if (isValidForm) {
    displayConfirmMessageModal();
  }
});
