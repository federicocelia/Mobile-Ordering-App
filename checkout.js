const checkoutModal = document.querySelector(".payment-modal");
const overlayWrapper = document.querySelector("#overlay-wrapper");

document.addEventListener("click", (event) => {
  if (event.target.matches(".complete-order-btn")) {
    checkoutModal.classList.remove("hidden");
    overlayWrapper.classList.remove("hidden");
  }
});
