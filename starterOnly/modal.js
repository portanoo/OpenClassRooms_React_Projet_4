function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalCloseBtn = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form[name="reserve"]');
const formElements = document.getElementsByName("reserve");
const modalBody = document.querySelector(".modal-body");

// Input Elements
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const quantity = document.querySelector("#quantity");
const birthdate = document.querySelector("#birthdate");
const tournamentLocation = document.getElementsByName("location");
const termsOfUsage = document.querySelector("#termsOfUsage");

// Define pattern value used to check input values
const inputPatterns = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
  firstname: /^[a-zA-Z-ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ -]{2,}$/gi,
  lastname: /^[a-zA-Z-ÀÁÂÃÄÅÇÑñÇçÈÉÊËÌÍÎÏÒÓÔÕÖØÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöøùúûüýÿ -]{2,}$/gi,
  birthdate: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/gi,
  quantity: /[0-9]{1,3}$/,
  tournamentLocation: /^[a-zA-Z -]{3,}$/
};

// Store input controls 
const formValues = {
  firstname: {value: null, isValid: null, errorMessage: "Veuillez entrer 2 caractères ou plus pour prénom."},
  lastname: {value: null, isValid: null, errorMessage: "Veuillez entrer 2 caractères ou plus pour le nom."},
  email: {value: null, isValid: null, errorMessage: "Veuillez saisir une adresse email valide."},
  quantity: {value: null, isValid: null, errorMessage: "Vous devez saisir une chiffre pour le nombre de participation"},
  birthdate: {value: null, isValid: null, errorMessage: "Vous devez entrer votre date de naissance."},
  tournamentLocation: {value: null, isValid: false, errorMessage: "Vous devez choisir un lieu pour le prochain tournoi."},
  termsOfUsage: {value: true, isValid: true, errorMessage: "Vous devez vérifier que vous acceptez les termes et conditions."},
  notification: {value: false, isValid: true}
}

// Input EventListeners
firstname.addEventListener("change", function() { inputTextValidation(this) });
lastname.addEventListener("change", function() { inputTextValidation(this) });
email.addEventListener("change", function() { inputTextValidation(this) });
quantity.addEventListener("change", function() { inputTextValidation(this) });
birthdate.addEventListener("change", function() { inputTextValidation(this) });
termsOfUsage.addEventListener("change", function() { inputCheckBoxValidation(this) });
tournamentLocation.forEach((input) => input.addEventListener('change', () => {
  verifTournamentLocation(); 
}))


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalCloseBtn.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Keep data to make some controls before submit
formElements[0].addEventListener('submit', (e) => {
  e.preventDefault();
});

// Display errorMessage
function addErrorMessage(inputElement) {
  if (inputElement === "tournamentLocation") {
    form["location"][0].parentElement.setAttribute('data-error', formValues[inputElement].errorMessage);
    form["location"][0].parentElement.setAttribute('data-error-visible', true);
  } else {
    form[inputElement].parentElement.setAttribute('data-error', formValues[inputElement].errorMessage);
    form[inputElement].parentElement.setAttribute('data-error-visible', true);
  }
}

// Remove errorMessage
function removeErrorMessage(inputElement) {
  if (inputElement === "tournamentLocation") {
    form["location"][0].parentElement.removeAttribute('data-error');
    form["location"][0].parentElement.removeAttribute('data-error-visible');
  } else {
    form[inputElement].parentElement.removeAttribute('data-error');
    form[inputElement].parentElement.removeAttribute('data-error-visible');
  }
}

// Validate form
function validateForm(form) {
  if (
        formValues.firstname.isValid
        && formValues.lastname.isValid
        && formValues.email.isValid
        && formValues.birthdate.isValid
        && formValues.termsOfUsage.isValid
        && formValues.notification.isValid
        && formValues.tournamentLocation.isValid
        && formValues.quantity.isValid
      ) {
        form.submit();
      } else {
        Object.keys(formValues).forEach((key) => {
          if (!formValues[key].isValid) {
            addErrorMessage(key);
          }
        })
      }
  }

function verifTournamentLocation() {
  let isTournamentLocationValid = 0
  tournamentLocation.forEach((location) => {
    if (location.checked) {
      isTournamentLocationValid += 1
    }
  })
  if (isTournamentLocationValid) {
    storeInputResult("tournamentLocation", true)
    removeErrorMessage("tournamentLocation")
    return true;
  } else {
    storeInputResult("tournamentLocation", false)
    addErrorMessage("tournamentLocation")
    return false;
  }
}

function inputTextValidation(input) {
  const inputName = input.name;
  const inputValue = input.value;
  console.log(inputName);
  let isValid = inputPatterns[inputName].test(inputValue);
  if (isValid) {
    storeInputResult(inputName, isValid);
    removeErrorMessage(inputName)
    return true;
  } else {
    storeInputResult(inputName, isValid)
    addErrorMessage(inputName);
    return false;
  }
}

function inputCheckBoxValidation(input) {
  const inputName = input.name;
  const inputValue = input.checked;
  if (inputValue) {
    storeInputResult(inputName, inputValue)
    removeErrorMessage(inputName);
    return true;
  } else {
    storeInputResult(inputName, inputValue)
    addErrorMessage(inputName);
    return false;
  }
}

function storeInputResult(inputName, isValid) {
  switch (inputName) {
          case 'notification':
            formValues[inputName].value = form[inputName].checked;
            formValues[inputName].isValid = isValid;
            break;
          case 'termsOfUsage':
            formValues[inputName].value = form[inputName].checked;
            formValues[inputName].isValid =  isValid;
            break;
          case 'tournamentLocation':
            formValues[inputName].value = form["location"].value;
            formValues[inputName].isValid =  isValid;
            break;
          default:
            formValues[inputName].value = form[inputName].value;
            formValues[inputName].isValid =  isValid;
  }
}