const viewOrderBtn = document.querySelector(".view-order-btn");

export function updateViewOrderButton(order) {
  const totalItems = Object.values(order).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  viewOrderBtn.textContent = `💲 Order (${totalItems})`;

  viewOrderBtn.classList.toggle("hidden", totalItems === 0);
}

export function setupViewOrderScroll(orderSection) {
  viewOrderBtn.addEventListener("click", () => {
    orderSection.scrollIntoView({
      behavior: "smooth",
    });
  });
}
