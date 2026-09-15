export function checkoutChecker(event) {
  event.preventDefault();

  const form = document.querySelector("form");
  const formData = new FormData(form);

  const customerName = formData.get("customer-name");

  return `
    <div class="checkout-confirmation-message">
      <p>Thanks, ${customerName}! Your order is on its way!</p>
    </div>
  `;
}
