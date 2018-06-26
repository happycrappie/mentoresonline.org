var isNameValid = false; // Sets name validation
var validateName = (e) => {
  var _this = document.getElementById('mce-FNAME');

  if (document.getElementById('mce-FNAME').value.length < 2) {
    // console.log('invalid');
    showErrorMessage(_this.nextElementSibling, "Por favor, preencha com o seu nome."); // Shows error message
    return isNameValid = false; // Tells controller that name isn't valid
  } else {
    // console.log('valid');
    removeClass(_this.nextElementSibling, 'active');
    // showValidMessage(_this.nextElementSibling, "Boa, " + _this.value + "! 👍"); // Hides error message
    return isNameValid = true; // Tells controller that name is valid
  }
}
addMultipleEventListeners(document.getElementById('mce-FNAME'), 'change blur', validateName);




var isEmailValid = false; // Sets default e-mail validation
var validateEmail = (e) => {
  var _this = document.getElementById('mce-EMAIL');

  if (!!_this.value) {

    // Test if e-mail is valid in the front-end
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(_this.value)) {
      // console.log('Test not valid');
      showErrorMessage(_this.nextElementSibling, "Por favor, preencha um e-mail válido."); // Shows error message for invalid e-mail
      return isEmailValid = false; // Tells controller e-mail isn't valid.
    } else {
      // console.log('Valid');
      removeClass(_this.nextElementSibling, 'active');
      return isEmailValid = true; // Tells controller e-mail is valid.
    }
  } else {
    // console.log('Invalid');
    showErrorMessage(_this.nextElementSibling, "Você precisa preencher um e-mail."); // Shows error message for input not filled
    return isEmailValid = false; // Tells controller e-mail isn't valid.
  }
}
addMultipleEventListeners(document.getElementById('mce-EMAIL'), 'change blur', validateEmail);

