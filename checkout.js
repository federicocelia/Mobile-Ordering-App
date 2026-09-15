import { checkoutChecker } from "./checkoutConfirmation.js";

const checkoutModal = document.querySelector(".payment-modal");
const overlayWrapper = document.querySelector("#overlay-wrapper");
const payBtn = document.querySelector(".pay-btn");
const orderSection = document.querySelector(".order-summary");

document.addEventListener("click", (event) => {
  if (event.target.matches(".complete-order-btn")) {
    checkoutModal.classList.remove("hidden");
    overlayWrapper.classList.remove("hidden");
  }
  if (event.target.matches(".pay-btn")) {
    const checkoutMessage = checkoutChecker(event);

    checkoutModal.classList.add("hidden");
    overlayWrapper.classList.add("hidden");

    orderSection.innerHTML = checkoutMessage;
  }
});
