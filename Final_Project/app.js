// function scrollHorizontally(e) {
//     e = window.event || e;
//     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//     var scrollSpeed = 15;
//     document.documentElement.scrollLeft -= (delta * scrollSpeed);
//     document.body.scrollLeft -= (delta * scrollSpeed);
//     e.preventDefault();
//   }
  
//   if (window.addEventListener) {
//     // IE9, Chrome, Safari, Opera
//     window.addEventListener("mousewheel", scrollHorizontally, false);
//     // Firefox
//     window.addEventListener("DOMMouseScroll", scrollHorizontally, false);
//   } else {
//     // IE 6/7/8
//     window.attachEvent("onmousewheel", scrollHorizontally);
//   }


// import 'animate.css';


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



jQuery('.all-acts').jstars({
	image_path: 'jQuery-Plugin-For-Magic-Cursor-Animations-jStars/images/jstar-modern.png', // folder with magic image
	style: 'rand',       // optional, color, default: white
	frequency: 19         // optional, from 1 to 19
});