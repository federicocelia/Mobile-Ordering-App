import { menuArray } from "./data.js";

//console.log(menuArray);

const menuContainer = document.querySelector(".menu-selection");
const orderContainer = document.querySelector(".order-summary");
const paymentContainer = document.querySelector(".payment-modal");
const order = [];

const render = () => {
  let menuHtml = "";
  menuArray.forEach((item) => {
    menuHtml += `
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
  });
  menuContainer.innerHTML = menuHtml;

  const orderBtn = document.querySelectorAll(".add-to-order-btn");

  orderBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let orderHtml = "<h3>Your Order</h3>";
      const itemId = Number(event.currentTarget.parentElement.dataset.itemId);

      const itemToAdd = menuArray.find((item) => {
        return item.id === itemId;
      });

      const existingItem = order.find((item) => item.id === itemToAdd.id);

      if (!existingItem) {
        order.push({ ...itemToAdd, quantity: 1 });
      } else {
        existingItem.quantity += 1;
      }
      order.forEach((item) => {
        orderHtml += `
        <p data-item-id="${item.id}"> ${item.name} Quantity: ${item.quantity} <span class="remove-item">Remove</span> Price: $${item.price}</p>
        
            `;
      });
      orderContainer.innerHTML = orderHtml;

      const removeItemBtn = document.querySelectorAll(".remove-item");

      removeItemBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          event.currentTarget.parentElement.remove();
        });
      });
    });
  });
};

render();
