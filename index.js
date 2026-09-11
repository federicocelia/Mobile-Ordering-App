import { menuArray } from "./data.js";
import { addToOrder, setupRemoveItemListener } from "./order.js";
import "./checkout.js";

const menuSection = document.querySelector(".menu-selection");

const menuCategories = [...new Set(menuArray.map((item) => item.category))];

let menuHtml = "";

menuCategories.forEach((category) => {
  //looping through each category
  menuHtml += `<h2 class="menu-heading">${category.toUpperCase()}</h2>`;

  menuArray
    .filter((item) => item.category === category) //filter for categories
    .forEach((item) => {
      //looping through each item in the respective category
      menuHtml += `
        <div class="menu-item id-${item.id}">
          <div class="item-emoji" aria-hidden="true">${item.emoji}</div>

          <div class="item-details">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="item-price">$${item.price}</p>
          </div>

          <button
            type="button"
            class="add-item"
            data-id="${item.id}"
            aria-label="Add ${item.name} to order">
            <span aria-hidden="true">+</span>
          </button>
        </div>
      `;
    });
});

menuSection.innerHTML = menuHtml;

addToOrder();
setupRemoveItemListener();
