// 1. Grab the elements we need from the page
const form = document.getElementById("bill-form");
const productList = document.getElementById("product-list");
const addProductBtn = document.getElementById("add-product");
const billDisplay = document.getElementById("bill-display");

const vatRate = 13;
let productCount = 1; // the first product already exists in the HTML

// 2. Add a new product block when "Add Product" is clicked
addProductBtn.addEventListener("click", function () {
  productCount++;

  const row = document.createElement("div");
  row.className = "product-item";
  row.innerHTML = `
    <div class="field">
      <label for="productName-${productCount}">Product Name</label>
      <input type="text" id="productName-${productCount}" class="product-name" placeholder="Enter product name" />
    </div>
    <div class="grid-2">
      <div class="field">
        <label for="quantity-${productCount}">Quantity</label>
        <input type="number" id="quantity-${productCount}" class="product-qty" placeholder="e.g. 2" />
      </div>
      <div class="field">
        <label for="price-${productCount}">Price per unit (Rs.)</label>
        <input type="number" id="price-${productCount}" class="product-price" placeholder="e.g. 500" />
      </div>
    </div>
  `;

  productList.appendChild(row);
});

// 3. Generate the bill when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  // Customer details
  const customer = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const invoiceNumber = document.getElementById("invoiceNumber").value;
  const invoiceDate = document.getElementById("invoiceDate").value;

  // All product inputs (one entry per product, in the same order)
  const names = document.querySelectorAll(".product-name");
  const quantities = document.querySelectorAll(".product-qty");
  const prices = document.querySelectorAll(".product-price");

  // Build one table row per product and add up the subtotal
  let rowsHtml = "";
  let subtotal = 0;

  for (let i = 0; i < names.length; i++) {
    const qty = Number(quantities[i].value);
    const price = Number(prices[i].value);
    const amount = qty * price;

    subtotal += amount;

    rowsHtml += `
      <tr>
        <td>${names[i].value}</td>
        <td>${qty}</td>
        <td>Rs. ${price.toFixed(2)}</td>
        <td>Rs. ${amount.toFixed(2)}</td>
      </tr>
    `;
  }

  const vat = (subtotal * vatRate) / 100;
  const total = subtotal + vat;

  // Show the bill on the page
  billDisplay.innerHTML = `
    <h2>VAT Bill</h2>
    <p>Invoice No: ${invoiceNumber}</p>
    <p>Date: ${invoiceDate}</p>
    <p>Customer: ${customer}</p>
    <p>Phone: ${phone}</p>

    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>${rowsHtml}</tbody>
    </table>

    <p>Subtotal: Rs. ${subtotal.toFixed(2)}</p>
    <p>VAT (${vatRate}%): Rs. ${vat.toFixed(2)}</p>
    <p><strong>Total: Rs. ${total.toFixed(2)}</strong></p>
  `;
});
