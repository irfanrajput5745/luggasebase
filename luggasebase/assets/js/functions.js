
////// main slider
$(".banner_slider").slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  autoplay: !0,
  autoplaySpeed: 2000,
  adaptiveHeight: !0,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        dots: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});

// Best Seller Slider

$('.best_seller_slider').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  autoplay: true,
  slidesToScroll: 1,
  autoplaySpeed: 1000,
  adaptiveHeight: !0,
});

// We Carry Logo
$('.we_carry_slider').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 6,
  autoplay: true,
  slidesToScroll: 1,
  autoplaySpeed: 1000,
  adaptiveHeight: !0,
});


// Our Client
$('.our_client_slider').slick({
  dots: false,
  arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  autoplay: true,
  slidesToScroll: 1,
  autoplaySpeed: 1000,
  adaptiveHeight: !0,
});

// Tags Filter

(function () {

  "use strict"


  // Plugin Constructor
  var TagsInput = function (opts) {
    this.options = Object.assign(TagsInput.defaults, opts);
    this.init();
  }

  // Initialize the plugin
  TagsInput.prototype.init = function (opts) {
    this.options = opts ? Object.assign(this.options, opts) : this.options;

    if (this.initialized)
      this.destroy();

    if (!(this.orignal_input = document.getElementById(this.options.selector))) {
      console.error("tags-input couldn't find an element with the specified ID");
      return this;
    }

    this.arr = [];
    this.wrapper = document.createElement('div');
    this.input = document.createElement('input');
    init(this);
    initEvents(this);

    this.initialized = true;
    return this;
  }

  // Add Tags
  TagsInput.prototype.addTag = function (string) {

    if (this.anyErrors(string))
      return;

    this.arr.push(string);
    var tagInput = this;

    var tag = document.createElement('span');
    tag.className = this.options.tagClass;
    tag.innerText = string;

    var closeIcon = document.createElement('a');
    closeIcon.innerHTML = '&times;';

    // delete the tag when icon is clicked
    closeIcon.addEventListener('click', function (e) {
      e.preventDefault();
      var tag = this.parentNode;

      for (var i = 0; i < tagInput.wrapper.childNodes.length; i++) {
        if (tagInput.wrapper.childNodes[i] == tag)
          tagInput.deleteTag(tag, i);
      }
    })


    tag.appendChild(closeIcon);
    this.wrapper.insertBefore(tag, this.input);
    this.orignal_input.value = this.arr.join(',');

    return this;
  }

  // Delete Tags
  TagsInput.prototype.deleteTag = function (tag, i) {
    tag.remove();
    this.arr.splice(i, 1);
    this.orignal_input.value = this.arr.join(',');
    return this;
  }

  // Make sure input string have no error with the plugin
  TagsInput.prototype.anyErrors = function (string) {
    if (this.options.max != null && this.arr.length >= this.options.max) {
      console.log('max tags limit reached');
      return true;
    }

    if (!this.options.duplicate && this.arr.indexOf(string) != -1) {
      console.log('duplicate found " ' + string + ' " ')
      return true;
    }

    return false;
  }

  // Add tags programmatically 
  TagsInput.prototype.addData = function (array) {
    var plugin = this;

    array.forEach(function (string) {
      plugin.addTag(string);
    })
    return this;
  }

  // Get the Input String
  TagsInput.prototype.getInputString = function () {
    return this.arr.join(',');
  }


  // destroy the plugin
  TagsInput.prototype.destroy = function () {
    this.orignal_input.removeAttribute('hidden');

    delete this.orignal_input;
    var self = this;

    Object.keys(this).forEach(function (key) {
      if (self[key] instanceof HTMLElement)
        self[key].remove();

      if (key != 'options')
        delete self[key];
    });

    this.initialized = false;
  }

  // Private function to initialize the tag input plugin
  function init(tags) {
    tags.wrapper.append(tags.input);
    tags.wrapper.classList.add(tags.options.wrapperClass);
    tags.orignal_input.setAttribute('hidden', 'true');
    tags.orignal_input.parentNode.insertBefore(tags.wrapper, tags.orignal_input);
  }

  // initialize the Events
  function initEvents(tags) {
    tags.wrapper.addEventListener('click', function () {
      tags.input.focus();
    });


    tags.input.addEventListener('keydown', function (e) {
      var str = tags.input.value.trim();

      if (!!(~[9, 13, 188].indexOf(e.keyCode))) {
        e.preventDefault();
        tags.input.value = "";
        if (str != "")
          tags.addTag(str);
      }

    });
  }


  // Set All the Default Values
  TagsInput.defaults = {
    selector: '',
    wrapperClass: 'tags-input-wrapper',
    tagClass: 'tag',
    max: null,
    duplicate: false
  }

  window.TagsInput = TagsInput;

})();

var tagInput1 = new TagsInput({
  selector: 'tag-input1',
  duplicate: false,
  max: 10
});
tagInput1.addData(['1 Star', '5 Star', '4 Star'])

// Cookies Start
/* common fuctions */
function el(selector) { return document.querySelector(selector) }
function els(selector) { return document.querySelectorAll(selector) }
function on(selector, event, action) { els(selector).forEach(e => e.addEventListener(event, action)) }
function cookie(name) {
  let c = document.cookie.split('; ').find(cookie => cookie && cookie.startsWith(name + '='))
  return c ? c.split('=')[1] : false;
}


/* popup button hanler */
on('.cookie-popup button', 'click', () => {
  el('.cookie-popup').classList.add('cookie-popup--accepted');
  document.cookie = `cookie-accepted=true`
});

/* popup init hanler */
if (cookie('cookie-accepted') !== "true") {
  el('.cookie-popup').classList.add('cookie-popup--not-accepted');
}



/* page buttons handlers */

function _reset() {
  document.cookie = 'cookie-accepted=false';
  document.location.reload();
}

function _switchMode(cssClass) {
  el('.cookie-popup').classList.toggle(cssClass);
}
// Cookies End