const products = [
  { id: 1, name: "Bluetooth Speaker", price: 75000, image: "assets/Lapton-image2.jfif" },
  { id: 2, name: "Smartwatch Pro", price: 47000, image: "assets/ipad-Tablet..jfif" },
  { id: 3, name: "Wireless Headphones", price: 25000, image: "assets/LCD-image2.jfif" },
  { id: 4, name: "Power Bank 10,000mAh", price: 16000, image: "assets/RAM-image.jfif" }
];

// Show floating alert
function showAlert(message, type = "warning") {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.className = `alert-box ${type}`;
  alertBox.classList.remove("d-none");

  setTimeout(() => {
    alertBox.classList.add("d-none");
  }, 2500);
}

// Render products on home page
function renderProducts() {
  const container = document.getElementById("product-container");
  if (!container) return;

  container.innerHTML = "";
  products.forEach(product => {
    container.innerHTML += `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" />
        <h5>${product.name}</h5>
        <p>Rs ${product.price}</p>
        <button onclick="addToCart(${product.id})" class="btn-accent">Add to Cart</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.email) {
    sessionStorage.setItem("loginMessage", "Please log in to add items to cart.");
    sessionStorage.setItem("alertType", "warning");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  showAlert("Item added to cart!", "success");
}

// Update cart count in navbar
function updateCartCount() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.email) return;

  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartEl = document.getElementById("cart-count");
  if (cartEl) cartEl.innerText = total;
}

// Update navbar (login/register/logout)
function updateNavbarAuthStatus() {
  const navbar = document.getElementById("navbar-user-controls");
  const cartButton = document.getElementById("cart-button-container");
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.email) {
    navbar.innerHTML = `<button class="btn-accent" onclick="logout()">Logout</button>`;
    cartButton.classList.remove("d-none");
  } else {
    navbar.innerHTML = `<a href="login.html" class="btn-accent">Login</a>`;
    cartButton.classList.add("d-none");
  }
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  showAlert("You are now logged out.", "success");
  window.location.href = "index.html";
}

// Check login success message
function checkLoginSuccess() {
  if (localStorage.getItem("loginSuccess") === "true") {
    showAlert("Login successful!", "success");
    localStorage.removeItem("loginSuccess");
  }
}
