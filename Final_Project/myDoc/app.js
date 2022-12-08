// vanilla js library, progress bar when scroll for landing-page and axo-view
document.addEventListener("DOMContentLoaded", function (event) {
    progressJS.start({
        "color": "#ed1765",
        "height": "12px",
        "zIndex": 9999,
        "ontop": true,
        //left to right
        "ltr": true,
        //js style or css
        "css": false,
    });
});


// jQuery library, rainbow star cursor for acts
jQuery('.all-acts').jstars({
	image_path: '../jQuery-Plugin-For-Magic-Cursor-Animations-jStars/images/', // folder with magic image
	style: 'rand',       // optional, color, default: white
	frequency: 20,         // optional, from 1 to 19
  width: 50, // single star width
	height: 50, // single star height
	delay: 300 // rotate speed
});


// horizontal scroll when scrolling vertically for acts
function scrollHorizontally(e) {
  e = window.event || e;
  var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  var scrollSpeed = 15;
  document.documentElement.scrollLeft -= (delta * scrollSpeed);
  document.body.scrollLeft -= (delta * scrollSpeed);
  e.preventDefault();
}

if (window.addEventListener) {
  // IE9, Chrome, Safari, Opera
  window.addEventListener("mousewheel", scrollHorizontally, false);
  // Firefox
  window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
} else {
  // IE 6/7/8
  window.attachEvent("onmousewheel", scrollHorizontally);
}
