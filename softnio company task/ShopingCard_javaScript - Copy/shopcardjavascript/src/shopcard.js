document.addEventListener("DOMContentLoaded", () => {
  const decrementBtn = document.getElementById("decrementBtn");
  const incrementBtn = document.getElementById("incrementBtn");
  const quantityEl = document.getElementById("quantity");
  const addToCartBtn = document.getElementById("addToCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const cartQuantityEl = document.getElementById("cartQuantity");
  const sizeOptions = document.querySelectorAll(".size-option");
  const bandColors = document.querySelectorAll(".band-color");

  let quantity = 1;
  let cartQuantity = 0;
  let selectedSize = null;
  let selectedColor = null;

  decrementBtn.addEventListener("click", () => {
    if (quantity > 1) quantity--;
    quantityEl.textContent = quantity;
  });

  incrementBtn.addEventListener("click", () => {
    quantity++;
    quantityEl.textContent = quantity;
  });

  sizeOptions.forEach((button) =>
    button.addEventListener("click", (event) => {
      sizeOptions.forEach((btn) => btn.classList.remove("border-blue-600"));
      event.target.classList.add("border-blue-600");
      selectedSize = event.target.dataset.size;
    })
  );

  bandColors.forEach((div) =>
    div.addEventListener("click", (event) => {
      bandColors.forEach((color) => color.classList.remove("ring-2"));
      event.target.classList.add("ring-2", "ring-offset-2");
      selectedColor = event.target.dataset.color;
    })
  );

  addToCartBtn.addEventListener("click", () => {
    if (selectedSize && selectedColor) {
      cartQuantity += quantity;
      cartQuantityEl.textContent = cartQuantity;
      alert(`Added ${quantity} items to cart.`);
    } else {
      alert("Please select a size and color.");
    }
  });

  checkoutBtn.addEventListener("click", () => {
    alert(`You have ${cartQuantity} items in your cart.`);
  });
});
