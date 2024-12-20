const images = ["image1.png", "image2.png", "image3.png", "image4.png"];
const bandColors = ["Purple", "Cyan", "Blue", "Black"];
const sizePrices = { S: 69, M: 79, L: 89, XL: 99 };

let activeBandColor = 0;
let selectedSize = "S";
let quantity = 1;

const productImage = document.getElementById("productImage");
const productPrice = document.getElementById("productPrice");
const quantityElement = document.getElementById("quantity");
const cartQuantity = document.getElementById("cartQuantity");

document.querySelectorAll(".band-color").forEach((el, index) => {
  el.addEventListener("click", () => {
    activeBandColor = index;
    productImage.src = images[activeBandColor];
  });
});

document.querySelectorAll("#sizeOptions button").forEach((button) => {
  button.addEventListener("click", (e) => {
    document
      .querySelectorAll("#sizeOptions button")
      .forEach((btn) =>
        btn.classList.remove("border-blue-600", "text-blue-600")
      );
    e.target.classList.add("border-blue-600", "text-blue-600");
    selectedSize = e.target.getAttribute("data-size");
    productPrice.textContent = `$${sizePrices[selectedSize]}.00`;
  });
});

document.getElementById("incrementBtn").addEventListener("click", () => {
  if (quantity < 10) quantity++;
  quantityElement.textContent = quantity;
});

document.getElementById("decrementBtn").addEventListener("click", () => {
  if (quantity > 1) quantity--;
  quantityElement.textContent = quantity;
});

document.getElementById("addToCartBtn").addEventListener("click", () => {
  const totalCartQuantity = parseInt(cartQuantity.textContent) + quantity;
  cartQuantity.textContent = totalCartQuantity;
});
