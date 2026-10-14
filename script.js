"use strict";
const menuItems = [
  {
    id: 1,
    name: "Grilled Steak",
    description: "Juicy grilled steak served with a delicious side.",
    category: "Main Cravings",
    type: "Food",
    price: 799,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    name: "Classic Pizza",
    description: "Classic pizza topped with cheese and savory sauce.",
    category: "Pizza",
    type: "Food",
    price: 249,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    name: "Iced Coffee",
    description: "Refreshing iced coffee for your daily caffeine fix.",
    category: "Coffee",
    type: "Drinks",
    price: 129,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    name: "Salmon Platter",
    description: "Flavorful salmon served as a satisfying main course.",
    category: "Seafood",
    type: "Food",
    price: 1033,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    name: "Grilled Smoke Taco",
    description: "Grilled taco with savory fillings and tasty toppings.",
    category: "Tacos",
    type: "Food",
    price: 200,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    name: "Smoke Octopus",
    description: "A seafood favorite with a smoky flavor.",
    category: "Seafood",
    type: "Food",
    price: 349,
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    name: "Classic Burger",
    description: "A classic burger with a juicy patty and fresh toppings.",
    category: "Burgers",
    type: "Food",
    price: 199,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    name: "Creamy Carbonara",
    description: "Creamy pasta with a rich and savory sauce.",
    category: "Pasta",
    type: "Food",
    price: 229,
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 9,
    name: "Chicken Wings",
    description: "Crispy chicken wings with a flavorful coating.",
    category: "Sides",
    type: "Food",
    price: 189,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 10,
    name: "French Fries",
    description: "Golden and crispy fries, perfect for sharing.",
    category: "Sides",
    type: "Food",
    price: 99,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 11,
    name: "Iced Chocolate",
    description: "A chilled chocolate drink with a rich flavor.",
    category: "Cold Drinks",
    type: "Drinks",
    price: 119,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80"
  },
{
  id: 12,
  name: "Lemonade",
  description: "A cool and refreshing citrus drink.",
  category: "Cold Drinks",
  type: "Drinks",
  price: 79,
  image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=700"
},
  {
    id: 13,
    name: "Cappuccino",
    description: "Espresso topped with steamed milk and foam.",
    category: "Coffee",
    type: "Drinks",
    price: 139,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 14,
    name: "Strawberry Smoothie",
    description: "A fruity smoothie with a refreshing taste.",
    category: "Cold Drinks",
    type: "Drinks",
    price: 149,
    image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 15,
    name: "Chicken Rice Bowl",
    description: "A filling rice bowl with tender chicken.",
    category: "Rice Meals",
    type: "Food",
    price: 179,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 16,
    name: "Caesar Salad",
    description: "Fresh greens with a creamy Caesar dressing.",
    category: "Salads",
    type: "Food",
    price: 169,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=700&q=80"
  }
];

const CART_KEY = "craveSpotCart";
const USERS_KEY = "craveSpotDemoUsers";
const SESSION_KEY = "craveSpotDemoSession";

let activeType = "Food";
let activeCategory = "All";
let searchTerm = "";

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

let cart = readStorage(CART_KEY, []);

if (!Array.isArray(cart)) {
  cart = [];
}

function saveCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function peso(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}
const foodGrid = document.getElementById("food-grid");
const categoryList = document.getElementById("category-list");
const categoryTitle = document.getElementById("category-title");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");
const menuSearch = document.getElementById("menu-search");

function getVisibleItems() {
  return menuItems.filter(item => {
    const matchesType = item.type === activeType;
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;

    const searchText = (
      item.name + " " + item.description + " " + item.category
    ).toLowerCase();

    return matchesType &&
      matchesCategory &&
      searchText.includes(searchTerm);
  });
}

function renderCategories() {
  const categories = [
    "All",
    ...new Set(
      menuItems
        .filter(item => item.type === activeType)
        .map(item => item.category)
    )
  ];

  if (!categories.includes(activeCategory)) {
    activeCategory = "All";
  }

  categoryList.innerHTML = categories.map(category => `
    <button
      class="category-button ${category === activeCategory ? "active" : ""}"
      type="button"
      data-category="${escapeHTML(category)}"
      aria-pressed="${category === activeCategory}"
    >
      ${escapeHTML(category)}
    </button>
  `).join("");
}

function renderMenu() {
  const items = getVisibleItems();

  categoryTitle.textContent =
    activeCategory === "All" ? "Main Cravings" : activeCategory;

  resultsCount.textContent =
    `${items.length} ${items.length === 1 ? "item" : "items"} available`;

  emptyState.hidden = items.length !== 0;

  foodGrid.innerHTML = items.map(item => `
    <article class="food-card">
      <div class="food-image-wrap">
        <img
          class="food-image"
          src="${escapeHTML(item.image)}"
          alt="${escapeHTML(item.name)}"
          loading="lazy"
          onerror="this.onerror=null;this.src='https://placehold.co/600x400?text=Crave+Spot';"
        >
        <span class="food-category">
          ${escapeHTML(item.category)}
        </span>
      </div>

      <div class="food-info">
        <h4>${escapeHTML(item.name)}</h4>
        <p class="food-description">
          ${escapeHTML(item.description)}
        </p>

        <div class="food-bottom">
          <span class="food-price">${peso(item.price)}</span>
          <button
            class="add-button"
            type="button"
            data-add="${item.id}"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

// Food and Drinks tabs
document.querySelectorAll(".type-tab").forEach(button => {
  button.addEventListener("click", () => {
    activeType = button.dataset.type;
    activeCategory = "All";

    document.querySelectorAll(".type-tab").forEach(tab => {
      const isActive = tab === button;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    renderCategories();
    renderMenu();
  });
});

// Category filter
categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
});

// Search
menuSearch.addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderMenu();
});

const cartItemsElement = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const cartItemCountElement = document.getElementById("cart-item-count");
const cartSubtotalElement = document.getElementById("cart-subtotal");
const cartTotalElement = document.getElementById("cart-total");
const cartMessage = document.getElementById("cart-message");

function addToCart(id) {
  const item = menuItems.find(product => product.id === Number(id));
  if (!item) return;

  const existing = cart.find(entry => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: item.id, quantity: 1 });
  }

  saveCart();
  renderCart();
  cartMessage.textContent = `${item.name} added to your cart.`;
}

function changeQuantity(id, change) {
  const entry = cart.find(item => item.id === Number(id));
  if (!entry) return;

  entry.quantity += change;

  if (entry.quantity <= 0) {
    cart = cart.filter(item => item.id !== Number(id));
  }

  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== Number(id));
  saveCart();
  renderCart();
  cartMessage.textContent = "Item removed from your cart.";
}

function renderCart() {
  cart = cart.filter(entry =>
    menuItems.some(item => item.id === Number(entry.id)) &&
    Number.isInteger(Number(entry.quantity)) &&
    Number(entry.quantity) > 0
  );

  const cartDetails = cart.map(entry => {
    const product = menuItems.find(
      item => item.id === Number(entry.id)
    );

    return {
      ...product,
      quantity: Number(entry.quantity),
      lineTotal: product.price * Number(entry.quantity)
    };
  });

  const totalQuantity = cartDetails.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const subtotal = cartDetails.reduce(
    (sum, item) => sum + item.lineTotal, 0
  );

  cartCountElement.textContent = totalQuantity;
  cartItemCountElement.textContent = totalQuantity;
  cartSubtotalElement.textContent = peso(subtotal);
  cartTotalElement.textContent = peso(subtotal);

  if (cartDetails.length === 0) {
    cartItemsElement.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <h3>Your cart is waiting</h3>
        <p>Add your favorite food or drinks to get started.</p>
      </div>
    `;

    saveCart();
    return;
  }

  cartItemsElement.innerHTML = cartDetails.map(item => `
    <article class="cart-item">
      <img
        src="${escapeHTML(item.image)}"
        alt="${escapeHTML(item.name)}"
        onerror="this.onerror=null;this.src='https://placehold.co/200x200?text=Food';"
      >

      <div>
        <h4>${escapeHTML(item.name)}</h4>
        <div class="cart-item-price">${peso(item.price)} each</div>

        <div class="quantity-control">
          <button
            type="button"
            data-decrease="${item.id}"
            aria-label="Decrease ${escapeHTML(item.name)} quantity"
          >−</button>

          <span>${item.quantity}</span>

          <button
            type="button"
            data-increase="${item.id}"
            aria-label="Increase ${escapeHTML(item.name)} quantity"
          >+</button>
        </div>

        <button
          class="remove-button"
          type="button"
          data-remove="${item.id}"
        >Remove</button>
      </div>

      <div class="cart-item-total">${peso(item.lineTotal)}</div>
    </article>
  `).join("");

  saveCart();
}

// Add-to-cart button
foodGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

// Quantity and remove buttons
cartItemsElement.addEventListener("click", event => {
  const decrease = event.target.closest("[data-decrease]");
  const increase = event.target.closest("[data-increase]");
  const remove = event.target.closest("[data-remove]");

  if (decrease) {
    changeQuantity(decrease.dataset.decrease, -1);
  } else if (increase) {
    changeQuantity(increase.dataset.increase, 1);
  } else if (remove) {
    removeFromCart(remove.dataset.remove);
  }
});

// Open cart
document.getElementById("open-cart").addEventListener("click", () => {
  document.getElementById("cart-section").scrollIntoView({
    behavior: "smooth"
  });
});

// Continue shopping
document.getElementById("continue-shopping").addEventListener("click", () => {
  document.getElementById("menu").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("checkout-button").addEventListener("click", () => {
  if (cart.length === 0) {
    cartMessage.textContent = "Your cart is empty. Add an item first.";
    return;
  }

  const session = readStorage(SESSION_KEY, null);

  if (!session || !session.email) {
    cartMessage.textContent =
      "Please log in or sign up before placing your demo order.";
    showAuth("login");
    return;
  }

  const orderNumber = "CS-" + Date.now().toString().slice(-6);

  const orderTotal = cart.reduce((sum, entry) => {
    const item = menuItems.find(
      product => product.id === Number(entry.id)
    );
    return sum + (item ? item.price * entry.quantity : 0);
  }, 0);

  alert(
    `Demo order placed successfully!\n\n` +
    `Order number: ${orderNumber}\n` +
    `Customer: ${session.name || session.email}\n` +
    `Total: ${peso(orderTotal)}\n\n` +
    `This is a prototype. No payment was collected.`
  );

  cart = [];
  saveCart();
  renderCart();
  cartMessage.textContent = "Your demo order has been placed.";
});

// Footer year
document.getElementById("current-year").textContent =
  new Date().getFullYear();

const authOverlay = document.getElementById("auth-overlay");
const authTitle = document.getElementById("auth-title");
const authSubtitle = document.getElementById("auth-subtitle");
const authMessage = document.getElementById("auth-message");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const authActions = document.getElementById("auth-actions");

function getUsers() {
  const users = readStorage(USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

function showAuth(mode) {
  const isSignup = mode === "signup";

  loginForm.hidden = isSignup;
  signupForm.hidden = !isSignup;

  authTitle.textContent = isSignup
    ? "Create your account"
    : "Welcome back!";

  authSubtitle.textContent = isSignup
    ? "Sign up to get started with Crave Spot."
    : "Log in to your account to continue.";

  authMessage.textContent = "";
  authOverlay.hidden = false;
}

function closeAuth() {
  authOverlay.hidden = true;
  authMessage.textContent = "";
}

// Demo password hashing only; not production authentication.
async function hashPassword(password) {
  if (!window.crypto || !window.crypto.subtle) {
    throw new Error(
      "Please run this website through VS Code Live Server using HTTPS or localhost."
    );
  }

  const bytes = new TextEncoder().encode(password);
  const hash = await window.crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(hash))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

function renderAuthActions() {
  const session = readStorage(SESSION_KEY, null);
  authActions.replaceChildren();

  if (session && session.email) {
    const name = document.createElement("span");
    name.className = "auth-user-name";
    name.textContent = `Hi, ${session.name || session.email}`;

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.className = "login-button";
    logoutButton.textContent = "Logout";

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      renderAuthActions();
      cartMessage.textContent = "You have logged out.";
    });

    authActions.append(name, logoutButton);
    return;
  }

  const loginButton = document.createElement("button");
  loginButton.type = "button";
  loginButton.className = "login-button";
  loginButton.textContent = "Login";
  loginButton.addEventListener("click", () => showAuth("login"));

  const signupButton = document.createElement("button");
  signupButton.type = "button";
  signupButton.className = "signup-button";
  signupButton.textContent = "Sign Up";
  signupButton.addEventListener("click", () => showAuth("signup"));

  authActions.append(loginButton, signupButton);
}

// Close modal
document.getElementById("close-auth").addEventListener("click", closeAuth);

authOverlay.addEventListener("click", event => {
  if (event.target === authOverlay) closeAuth();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !authOverlay.hidden) closeAuth();
});

// Switch between forms
document.getElementById("switch-to-signup").addEventListener("click", () => {
  showAuth("signup");
});

document.getElementById("switch-to-login").addEventListener("click", () => {
  showAuth("login");
});

// Sign up
signupForm.addEventListener("submit", async event => {
  event.preventDefault();
  authMessage.textContent = "";

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim().toLowerCase();
  const password = document.getElementById("signup-password").value;

  if (!name || !email || password.length < 8) {
    authMessage.textContent =
      "Enter your name, a valid email, and a password with at least 8 characters.";
    return;
  }

  const users = getUsers();

  if (users.some(user => user.email === email)) {
    authMessage.textContent =
      "An account with this email already exists. Please log in.";
    return;
  }

  try {
    const passwordHash = await hashPassword(password);

    users.push({ name, email, passwordHash });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));

    signupForm.reset();
    closeAuth();
    renderAuthActions();
  } catch (error) {
    authMessage.textContent =
      error.message || "Unable to create the account. Please try again.";
  }
});

// Login
loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  authMessage.textContent = "";

  const email = document.getElementById("login-email").value.trim().toLowerCase();
  const password = document.getElementById("login-password").value;

  try {
    const passwordHash = await hashPassword(password);

    const user = getUsers().find(account =>
      account.email === email &&
      account.passwordHash === passwordHash
    );

    if (!user) {
      authMessage.textContent = "Incorrect email or password.";
      return;
    }

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ name: user.name, email: user.email })
    );

    loginForm.reset();
    closeAuth();
    renderAuthActions();
  } catch (error) {
    authMessage.textContent =
      error.message || "Unable to log in. Please try again.";
  }
});

renderCategories();
renderMenu();
renderCart();
renderAuthActions();