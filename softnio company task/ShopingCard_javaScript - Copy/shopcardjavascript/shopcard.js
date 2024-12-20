document.addEventListener('DOMContentLoaded', () => {
  const colorOptions = document.querySelectorAll('.flex-grow-0.flex-shrink-0.w-4.h-4.relative');
  const images = document.querySelectorAll('.w-[630px].h-[721px].absolute');

  colorOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
      images.forEach((img, imgIndex) => {
        img.style.display = imgIndex === index ? 'block' : 'none';
      });
    });
  });
});