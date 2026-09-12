import { menuArray } from "./data.js";
import { updateViewOrderButton } from "./viewOrder.js";

const menuSection = document.querySelector(".menu-selection");
const orderSection = document.querySelector(".order-summary");
const viewOrderBtn = document.querySelector(".view-order-btn");

export const order = {}; //starting with and empty order

// Add items to Order
export function addToOrder() {
  menuSection.addEventListener("click", (event) => {
    //event delegation on Menu Section, listening for clicks on all menu section
    const button = event.target.closest(".add-item");

    if (!button) return;

    const id = Number(button.dataset.id); //finding ID from its dataset
    const item = menuArray.find((item) => item.id === id); //finding menu item

    if (order[id]) {
      //existing item in order object with key = id then increase item quantity
      order[id].quantity += 1;
    } else {
      //adding item to order object if it doesn't exist
      order[id] = {
        idItem: id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
    }

    orderSection.innerHTML = renderOrder();
    updateViewOrderButton(order);
  });
}

// Remove or Decrease items
export function setupRemoveItemListener() {
  orderSection.addEventListener("click", (event) => {
    //event delegation on Order Section, listening for clicks on all order section

    // REMOVE Item COMPLETELY
    if (event.target.closest(".remove-item-btn")) {
      //target is remove-item-btn
      const orderItem = event.target.closest(".order-item"); //find the item
      const id = Number(orderItem.dataset.id); //get the item id

      delete order[id]; //deleting the correspondent order

      orderSection.innerHTML = renderOrder(); //rerender to update the order HTML
      updateViewOrderButton(order);
      return; //exist the click handler
    }

    // DECREASE Item QUANTITY
    if (event.target.closest(".decrease-item-btn")) {
      //target is decrease-item-btn
      const orderItem = event.target.closest(".order-item");
      const id = Number(orderItem.dataset.id);

      if (!order[id]) return;

      if (order[id].quantity > 1) {
        order[id].quantity--;
      } else {
        delete order[id];
      }

      orderSection.innerHTML = renderOrder();
      updateViewOrderButton(order);
    }
  });
}

function renderOrder() {
  // Converts the order object into an array containing all order item objects.
  // This allows us to use array methods such as forEach(), map(), and reduce().
  const orderResumeArray = Object.values(order);

  if (orderResumeArray.length === 0) {
    return ""; //function doesn't render if the order is empty
  }

  let orderHtml = `
    <h2 id="order-heading" class="order-heading">
      Your Order
    </h2>

    <ul class="order-items"> 
  `; // </ul> closing tag render at the end of the function

  //looping through the order and for each item render the list item on the page
  orderResumeArray.forEach((item) => {
    orderHtml += `
      <li
        class="order-item"
        data-id="${item.idItem}"
      >
        <div class="order-item-wrapper">
          <span class="order-item-name">
            ${item.name}
          </span>
          <button class="decrease-item-btn">-</button>
          <button
            type="button"
            class="remove-item-btn"
            aria-label="Remove ${item.name} from order"
          >
            Remove
          </button>
        </div>

        <span class="order-item-price">
          $${item.price}
          ${item.quantity > 1 ? ` x ${item.quantity}` : ""}
        </span>
      </li>
    `;
  });

  const totalPrice = orderResumeArray.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  //adding the last part of the order , closing the ul
  orderHtml += `
    </ul>

    <div class="order-total order-item">
      <p class="order-total-title">Total:</p>
      <p class="order-total-price">$${totalPrice}</p>
    </div>

    <button type="button" class="complete-order-btn">
      Complete Order
    </button>
  `;

  //returning the complete string for the order
  return orderHtml;
}
