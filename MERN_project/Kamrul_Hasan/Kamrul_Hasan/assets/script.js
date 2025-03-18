document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
      let currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
          // স্ক্রল করলে কিছুই পরিবর্তন হবে না
          header.style.transform = "translateY(0)";
          navbar.style.position = "relative";
      } else {
          // উল্টো স্ক্রল করলে header এবং navbar আগের অবস্থায় ফিরে যাবে
          header.style.transform = "translateY(0)";
          navbar.style.position = "relative";
      }

      lastScrollY = currentScrollY;
  });
});


$(document).ready(function () {
  $("#news-slider").owlCarousel({
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    navigation: true,
    navigationText: ["<<", ">>"],
    pagination: false,
    autoPlay: true,
  });
});


var prevScrollpos = window.pageYOffset; 
 
window.onscroll = function() { 
  var currentScrollPos = window.pageYOffset; 
  if (prevScrollpos > currentScrollPos) { 
    document.getElementById("header").classList.remove("hidden"); 
  } else { 
    document.getElementById("header").classList.add("hidden"); 
  } 
  prevScrollpos = currentScrollPos; 
} 


// Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY = window.pageYOffset;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.add("active");
    } else {
      document.querySelector(".navigation a[href*=" + sectionId + "]").classList.remove("active");
    }
  });
}




const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fit the viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Custom color palette based on the image
const colors = [
  "rgb(234, 241, 246)", // Light blue-gray (main background color)
  "rgb(240, 245, 250)", // Slightly brighter
  "rgb(228, 238, 244)", // Slightly darker
];

// Function to generate static noise using the custom palette
function generateCustomNoise() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const pixels = imageData.data;

  for (let i = 0; i < pixels.length; i += 4) {
    // Randomly pick a color from the palette
    const color = colors[Math.floor(Math.random() * colors.length)];
    const [r, g, b] = color.match(/\d+/g).map(Number);

    pixels[i] = r;       // Red
    pixels[i + 1] = g;   // Green
    pixels[i + 2] = b;   // Blue
    pixels[i + 3] = 255; // Alpha (fully opaque)
  }

  ctx.putImageData(imageData, 0, 0);
}

// Generate the noise once (static)
generateCustomNoise();



$(document).ready(function () {
  $("#news-slider").owlCarousel({
    items: 3,
    itemsDesktop: [1199, 3],
    itemsDesktopSmall: [980, 2],
    itemsMobile: [600, 1],
    navigation: true,
    navigationText: ["", ""],
    pagination: true,
    autoPlay: true
  });
});
