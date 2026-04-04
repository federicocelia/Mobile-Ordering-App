import { menuArray } from "./data.js";

const menuContainer = document.querySelector(".menu-selection");
const orderContainer = document.querySelector(".order-summary");
const paymentContainer = document.querySelector(".payment-modal");
const order = [];

const menuHtml = () => {
  return menuArray
    .map((item) => {
      return `
        <div class="item-container" data-item-id="${item.id}">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-ingredients">${item.ingredients.join(", ")}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="add-to-order-btn">+</button>
        </div>
        `;
    })
    .join("");
};

const orderHtml = () => {
  let orderHtml = "<h3>Your Order</h3>";
  order.forEach((item) => {
    orderHtml += `
        <p data-item-id="${item.id}"> ${item.name} Quantity: ${item.quantity} <span class="remove-item">Remove</span> Price: $${item.price}</p>
        
            `;
  });
  orderHtml += `<p>Total Price: $${order.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</p>
  <button class="complete-order-btn">Complete Order</button>`;
  return orderHtml;
};

const renderMenu = () => {
  menuContainer.innerHTML = menuHtml();
};

const renderOrder = () => {
  orderContainer.innerHTML = orderHtml();
};

menuContainer.addEventListener("click", (event) => {
  console.log(event.target);
  if (!event.target.classList.contains("add-to-order-btn")) return;

  const itemId = parseInt(
    event.target.closest(".item-container").dataset.itemId,
  );
  console.log(itemId);

  const itemToAdd = menuArray.find((item) => {
    return item.id === itemId;
  });

  const existingItem = order.find((item) => item.id === itemToAdd.id);

  if (!existingItem) {
    order.push({ ...itemToAdd, quantity: 1 });
  } else {
    existingItem.quantity += 1;
  }

  renderOrder();
});

orderContainer.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove-item");
  if (!removeBtn) return;

  const row = removeBtn.closest("p");
  const itemId = Number(row.dataset.itemId);

  // remove from the array
  const index = order.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    order.splice(index, 1);
  }

  // re-render UI
  renderOrder();
});

renderMenu();
