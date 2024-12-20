const images = ["/image1.png", "/image2.png", "/image3.png", "/image4.png"];
const bandColors = ["Purple", "Cyan", "Blue", "Black"];
const sizePrices = { S: 69, M: 79, L: 89, XL: 99 };

let activeBandColor = 0;
let selectedSize = "S";
let quantity = 1;
let totalQuantity = 0;
let totalPrice = 0;

const productImage = document.getElementById("product-image");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const quantityDisplay = document.getElementById("quantity");
const totalQuantityDisplay = document.getElementById("total-quantity");
const sizeOptionsContainer = document.getElementById("size-options");
const cartItemsContainer = document.getElementById("cart-items");
const totalItemsCountDisplay = document.getElementById("total-items-count");
const totalPriceDisplay = document.getElementById("total-price");
const cartModal = document.getElementById("cart-modal");

function updatePrice() {
  const price = sizePrices[selectedSize] * quantity;
  productPrice.textContent = `$${price.toFixed(2)}`;
}

function populateSizeOptions() {
  sizeOptionsContainer.innerHTML = "";
  for (let size in sizePrices) {
    const sizeButton = document.createElement("button");
    sizeButton.textContent = size;
    sizeButton.className =
      "px-4 py-2 bg-white border rounded hover:bg-gray-100";
    sizeButton.onclick = () => {
      selectedSize = size;
      updatePrice();
    };
    sizeOptionsContainer.appendChild(sizeButton);
  }
}

document.getElementById("increment").addEventListener("click", () => {
  quantity++;
  quantityDisplay.textContent = quantity;
  updatePrice();
});

document.getElementById("decrement").addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityDisplay.textContent = quantity;
    updatePrice();
  }
});

document.getElementById("add-to-cart").addEventListener("click", () => {
  const price = sizePrices[selectedSize] * quantity;
  totalQuantity += quantity;
  totalPrice += price;

  const cartItem = document.createElement("div");
  cartItem.className =
    "flex justify-between items-center text-sm text-[#364a63] py-2";
  cartItem.innerHTML = `
    <div class="w-[278px] text-left">${productName.textContent}</div>
    <div class="w-[100px] text-center">${bandColors[activeBandColor]}</div>
    <div class="w-[80px] text-center">${selectedSize}</div>
    <div class="w-[80px] text-center">${quantity}</div>
    <div class="w-[100px] text-right">$${price.toFixed(2)}</div>
  `;
  cartItemsContainer.appendChild(cartItem);

  totalQuantityDisplay.textContent = totalQuantity;
  totalItemsCountDisplay.textContent = totalQuantity;
  totalPriceDisplay.textContent = totalPrice.toFixed(2);
});

document.getElementById("checkout").addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

populateSizeOptions();
updatePrice();
