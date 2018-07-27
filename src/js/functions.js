/** 
 * Checks if element has a certain class
** @param {DOMElement} element - DOM element to check for a class
** @param {string} className - class to be checked, e.g. 'active'
*/
var hasClass = function (element, className) {
  if (document.documentElement.classList) {
    hasClass = function (element, className) {
      return element.classList.contains(className);
    }
  } else {
    hasClass = function (element, className) {
      if (!element || !element.className) {
        return false;
      }
      var re = new RegExp('(^|\\s)' + className + '(\\s|$)');
      return element.className.match(re);
    }
  }
  return hasClass(element, className);
}

/** 
 * Adds class to an element
** @param {DOMElement} element - DOM element to add a class to
** @param {string} className - only one class name, e.g. 'active'
*/
var addClass = function (element, className) {
  if (document.documentElement.classList) {
    addClass = function (element, className) {
      element.classList.add(className);
    }
  } else {
    addClass = function (element, className) {
      if (!element) {
        return false;
      }
      if (!hasClass(element, className)) {
        element.className += (element.className ? " " : "") + className;
      }
    }
  }
  addClass(element, className);
}

/** 
 * Removes an element's class
** @param {DOMElement} element - DOM element to remove a class from
** @param {string} className - only one class name, e.g. 'active'
*/
var removeClass = (element, className) => {
  if (document.documentElement.classList) {
    // New Browsers
    removeClass = (element, className) => {
      element.classList.remove(className);
    }
  } else {
    // Fallback
    removeClass = (element, className) => {
      if (!element || !element.className) {
        return false;
      }
      var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
      element.className = element.className.replace(regexp, "$2");
    }
  }
  removeClass(element, className);
}

/** 
 * Toggles a class in an element
** @param {DOMElement} element - DOM element to toggle a class from
** @param {string} className - only one class name, e.g. 'active'
*/
var toggleClass = function (element, className) {
  if (document.documentElement.classList) {
    toggleClass = function (element, className) {
      return element.classList.toggle(className);
    }
  } else {
    toggleClass = function (element, className) {
      if (hasClass(element, className)) {
        removeClass(element, className);
        return false;
      } else {
        addClass(element, className);
        return true;
      }
    }
  }
  return toggleClass(element, className);
}

/**
 * Test if has localStorage
 */
var hasStorage = (function () {
  try {
    localStorage.setItem('hello', 'hello');
    localStorage.removeItem('hello');
    return true;
  } catch (exception) {
    return false;
  }
}());

/**
 * Checks if the dom is ready.
 */
(function (exports, d) {
  function domReady(fn, context) {

    function onReady(event) {
      d.removeEventListener("DOMContentLoaded", onReady);
      fn.call(context || exports, event);
    }

    function onReadyIe(event) {
      if (d.readyState === "complete") {
        d.detachEvent("onreadystatechange", onReadyIe);
        fn.call(context || exports, event);
      }
    }

    d.addEventListener && d.addEventListener("DOMContentLoaded", onReady) ||
      d.attachEvent && d.attachEvent("onreadystatechange", onReadyIe);
  }

  exports.domReady = domReady;
})(window, document);

/** 
 * Add one or more listeners to an element
 * @param {DOMElement} element - DOM element to add listeners to
 * @param {string} eventNames - space separated list of event names, e.g. 'click keyup touchmove'
 * @param {Function} fn - function to attach for each event as a listener
*/
var addMultipleEventListeners = (element, eventNames, fn) => {
  eventNames.split(' ').forEach(e => element.addEventListener(e, fn, false));
}

/** 
 * Shows error message
 * @param {DOMElement} element - DOM element to show as error
 * @param {string} message - the error message to be shown
*/
var showErrorMessage = (element, message = false) => {
  // console.log(element);
  if (message) {
    element.innerHTML = message;
    // console.log(element.innetHTML);
  }
  addClass(element, 'active');
  // console.log(element.classList.contains('active'));

  setTimeout(() => {
    removeClass(element, 'active');
  }, 6000);
}

/**
 * Shows valid message
 * @param {DOMElement} element - DOM element to show as error 
 * @param {string} message - the message to be shown when input is valid 
 */
var showValidMessage = (element, message) => {
  element.innerHTML = message;
  addClass(element, 'active');

  setTimeout(() => {
    removeClass(element, 'active');
  }, 4000);
}

/**
 * 
 * @param {DOMElement} element – DOM element to truncate text
 * @param {number} maxLength  – Maximum length of the text
 */
function truncateText(element, maxLength) {
  // var element = document.querySelector(selector),
  var truncated = element.innerHTML;

  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength) + '...';
  }
  return truncated;
}