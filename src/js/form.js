/*
 * Mailchimp AJAX form submit VanillaJS
 * Vanilla JS
 * Author: Michiel Vandewalle
 * Github author: https://github.com/michiel-vandewalle
 * Github project: https://github.com/michiel-vandewalle/Mailchimp-AJAX-form-submit-vanillaJS
 */

(function () {
  document.getElementsByTagName('form')[0].addEventListener('submit', function (e) {
    e.preventDefault();

    // Check for spam
    if (document.getElementById('this-is-a-name').value !== '') { return false; }

    if (isNameValid || isEmailValid) {
      // Get url for mailchimp
      var url = this.action.replace('/post?', '/post-json?');
  
      // Add form data to object
      var data = '';
      var inputs = this.querySelectorAll('#js-form-inputs input');
      for (var i = 0; i < inputs.length; i++) {
        data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
      }
  
      // Create & add post script to the DOM
      var script = document.createElement('script');
      script.src = url + data;
      document.body.appendChild(script);
  
      // Callback function
      var callback = 'callback';
      window[callback] = function (data) {
  
        // Remove post script from the DOM
        delete window[callback];
        document.body.removeChild(script);

        if (data.result == "error") {
          validateName();
          validateEmail();
          console.log(data.msg);
        } else {
          // Display response message
          document.getElementById('js-subscribe-response').innerHTML = data.msg;
        }
  
      };
    } else {
      return false;
    }
  });
})();
