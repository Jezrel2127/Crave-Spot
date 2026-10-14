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
const DELIVERY_KEY = "craveSpotDeliveryDetails";

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

function readDeliveryDetails() {
  return readStorage(DELIVERY_KEY, { phone: "", address: "" });
}

function saveDeliveryDetails(details) {
  localStorage.setItem(DELIVERY_KEY, JSON.stringify(details));
}

function renderCartDelivery() {
  const session = readStorage(SESSION_KEY, null);
  const details = readDeliveryDetails();
  const recipient = document.getElementById("cart-delivery-recipient");
  recipient.textContent = session?.email
    ? (session.name || session.email)
    : "Sign in to add delivery details.";
  document.getElementById("cart-delivery-address").textContent = details.address || "No delivery address saved yet.";
  document.getElementById("cart-delivery-phone").textContent = details.phone ? `☎ ${details.phone}` : "";
  const editButton = document.getElementById("edit-delivery-details");
  editButton.textContent = details.address && details.phone ? "Edit delivery details" : "Add delivery details";
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
  navigateToPage("cart");
});

// Continue shopping
document.getElementById("continue-shopping").addEventListener("click", () => {
  navigateToPage("menu");
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

  openCheckout();
});

function renderCheckoutOrder() {
  const itemsHost = document.getElementById("checkout-order-items");
  const details = cart.map(entry => {
    const item = menuItems.find(product => product.id === Number(entry.id));
    return item ? { ...item, quantity: Number(entry.quantity) } : null;
  }).filter(Boolean);
  itemsHost.replaceChildren();
  details.forEach(item => {
    const line = document.createElement("div");
    line.className = "checkout-order-line";
    const label = document.createElement("span");
    label.textContent = `${item.name} × ${item.quantity}`;
    const price = document.createElement("strong");
    price.textContent = peso(item.price * item.quantity);
    line.append(label, price);
    itemsHost.append(line);
  });
  const total = details.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("checkout-total").textContent = peso(total);
  return total;
}

function openCheckout() {
  const session = readStorage(SESSION_KEY, null);
  if (!session?.email) {
    cartMessage.textContent = "Please sign in before checking out.";
    showAuth("login");
    return;
  }
  const details = readDeliveryDetails();
  document.getElementById("checkout-name").value = session.name || "";
  document.getElementById("checkout-phone").value = details.phone || "";
  document.getElementById("checkout-address").value = details.address || "";
  document.getElementById("checkout-message").textContent = "";
  renderCheckoutOrder();
  navigateToPage("checkout");
}

document.getElementById("back-to-cart").addEventListener("click", () => navigateToPage("cart"));
document.getElementById("edit-delivery-details").addEventListener("click", () => {
  if (!readStorage(SESSION_KEY, null)?.email) {
    showAuth("login");
    return;
  }
  openCheckout();
});

document.getElementById("checkout-form").addEventListener("submit", event => {
  event.preventDefault();
  const message = document.getElementById("checkout-message");
  const session = readStorage(SESSION_KEY, null);
  if (!session?.email) {
    message.textContent = "Please sign in again before placing your order.";
    return;
  }
  if (!cart.length) {
    message.textContent = "Your cart is empty.";
    return;
  }
  const name = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const address = document.getElementById("checkout-address").value.trim();
  if (!name || !phone || !address) {
    message.textContent = "Please complete the delivery name, contact number, and address.";
    return;
  }
  const orderTotal = renderCheckoutOrder();
  const orderNumber = "CS-" + Date.now().toString().slice(-6);
  saveDeliveryDetails({ phone, address });
  alert(`Demo order placed successfully!\n\nOrder number: ${orderNumber}\nCustomer: ${name}\nDeliver to: ${address}\nContact: ${phone}\nTotal: ${peso(orderTotal)}\n\nThis is a prototype. No payment was collected.`);
  cart = [];
  saveCart();
  renderCart();
  renderCartDelivery();
  cartMessage.textContent = "Your demo order has been placed.";
  navigateToPage("cart");
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
const signinPage = document.getElementById("signin-page");

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

function navigateToPage(page, updateHash = true) {
  const profilePage = document.getElementById("profile-page");
  signinPage.hidden = true;
  document.querySelector(".site-header").hidden = false;
  profilePage.hidden = true;
  document.querySelectorAll("[data-view]").forEach(view => {
    view.hidden = view.dataset.view !== page;
  });
  document.querySelector(".site-footer").hidden = false;
  document.querySelectorAll(".main-nav [data-page]").forEach(link => {
    const active = link.dataset.page === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (updateHash) {
    const hash = page === "cart" ? "cart" : page;
    history.replaceState(null, "", `#${hash}`);
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".main-nav [data-page]").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    navigateToPage(link.dataset.page);
  });
});

document.querySelectorAll("[data-go-page]").forEach(button => {
  button.addEventListener("click", () => navigateToPage(button.dataset.goPage));
});

document.querySelectorAll('a[href="#menu"]').forEach(link => {
  if (!link.closest(".main-nav")) {
    link.addEventListener("click", event => {
      event.preventDefault();
      navigateToPage("menu");
    });
  }
});

window.addEventListener("hashchange", () => {
  const requestedPage = window.location.hash.slice(1);
  if (requestedPage === "signin") {
    showSigninPage();
    return;
  }
  if (requestedPage === "profile") {
    showProfile();
    return;
  }
  navigateToPage(["home", "menu", "about", "cart", "checkout"].includes(requestedPage) ? requestedPage : "home", false);
});

document.querySelectorAll("[data-toggle-password]").forEach(button => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.togglePassword);
    const showPassword = input.type === "password";
    input.type = showPassword ? "text" : "password";
    button.setAttribute("aria-pressed", String(showPassword));
    button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
    button.classList.toggle("is-visible", showPassword);
  });
});

function showSigninPage() {
  document.querySelector(".site-header").hidden = true;
  document.querySelectorAll("[data-view]").forEach(view => { view.hidden = true; });
  document.getElementById("profile-page").hidden = true;
  document.querySelector(".site-footer").hidden = true;
  signinPage.hidden = false;
  document.getElementById("signin-email").value = "";
  document.getElementById("signin-password").value = "";
  document.getElementById("signin-message").textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showProfile() {
  const session = readStorage(SESSION_KEY, null);
  if (!session || !session.email) {
    showAuth("login");
    return;
  }

  document.getElementById("profile-name").value = session.name || "";
  document.getElementById("profile-email").value = session.email;
  const delivery = readDeliveryDetails();
  document.getElementById("profile-phone").value = delivery.phone || "";
  document.getElementById("profile-address").value = delivery.address || "";
  document.getElementById("profile-message").textContent = "";
  signinPage.hidden = true;
  document.querySelector(".site-header").hidden = false;
  document.querySelectorAll("[data-view]").forEach(view => { view.hidden = true; });
  document.getElementById("profile-page").hidden = false;
  document.querySelector(".site-footer").hidden = true;
  history.replaceState(null, "", "#profile");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
  navigateToPage("home");
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
    const account = document.createElement("div");
    account.className = "account-menu";

    const accountToggle = document.createElement("button");
    accountToggle.type = "button";
    accountToggle.className = "account-toggle";
    accountToggle.setAttribute("aria-expanded", "false");
    accountToggle.setAttribute("aria-haspopup", "true");

    const initials = document.createElement("span");
    initials.className = "account-avatar";
    initials.setAttribute("aria-hidden", "true");
    initials.textContent = (session.name || session.email)
      .split(/\s+/)
      .map(part => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    const toggleCopy = document.createElement("span");
    toggleCopy.className = "account-toggle-copy";
    const toggleName = document.createElement("strong");
    toggleName.textContent = session.name || session.email;
    const toggleRole = document.createElement("small");
    toggleRole.textContent = "Crave Spot Member";
    toggleCopy.append(toggleName, toggleRole);

    const chevron = document.createElement("span");
    chevron.className = "account-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "⌄";
    accountToggle.append(initials, toggleCopy, chevron);

    const dropdown = document.createElement("div");
    dropdown.className = "account-dropdown";
    dropdown.hidden = true;
    dropdown.setAttribute("role", "menu");

    const identity = document.createElement("div");
    identity.className = "account-identity";
    const identityName = document.createElement("strong");
    identityName.textContent = session.name || session.email;
    const identityEmail = document.createElement("span");
    identityEmail.textContent = session.email;
    identity.append(identityName, identityEmail);

    const profileButton = document.createElement("button");
    profileButton.type = "button";
    profileButton.className = "account-menu-item";
    profileButton.setAttribute("role", "menuitem");
    profileButton.innerHTML = '<span aria-hidden="true">♙</span> Profile';
    profileButton.addEventListener("click", () => {
      dropdown.hidden = true;
      accountToggle.setAttribute("aria-expanded", "false");
      showProfile();
    });

    const logoutButton = document.createElement("button");
    logoutButton.type = "button";
    logoutButton.className = "account-menu-item account-signout";
    logoutButton.setAttribute("role", "menuitem");
    logoutButton.innerHTML = '<span aria-hidden="true">↪</span> Sign Out';
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      renderAuthActions();
      history.replaceState(null, "", "#signin");
      showSigninPage();
    });

    dropdown.append(identity, profileButton, logoutButton);
    accountToggle.addEventListener("click", () => {
      const isExpanded = accountToggle.getAttribute("aria-expanded") === "true";
      accountToggle.setAttribute("aria-expanded", String(!isExpanded));
      dropdown.hidden = isExpanded;
    });
    document.addEventListener("click", event => {
      if (!account.contains(event.target)) {
        dropdown.hidden = true;
        accountToggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        dropdown.hidden = true;
        accountToggle.setAttribute("aria-expanded", "false");
      }
    });

    account.append(accountToggle, dropdown);
    authActions.append(account);
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

document.getElementById("back-to-home").addEventListener("click", showHome);
document.getElementById("signin-create-account").addEventListener("click", () => showAuth("signup"));

document.getElementById("signin-form").addEventListener("submit", async event => {
  event.preventDefault();
  const message = document.getElementById("signin-message");
  message.textContent = "";
  const email = document.getElementById("signin-email").value.trim().toLowerCase();
  const password = document.getElementById("signin-password").value;

  try {
    const passwordHash = await hashPassword(password);
    const user = getUsers().find(account => account.email === email && account.passwordHash === passwordHash);
    if (!user) {
      message.textContent = "We couldn’t sign you in with those details. Check your email and password and try again.";
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
    renderAuthActions();
    document.getElementById("signin-form").reset();
    navigateToPage("home");
  } catch (error) {
    message.textContent = error.message || "Unable to sign in. Please try again.";
  }
});

document.getElementById("profile-form").addEventListener("submit", event => {
  event.preventDefault();
  const message = document.getElementById("profile-message");
  const session = readStorage(SESSION_KEY, null);
  if (!session || !session.email) {
    message.textContent = "Please log in again to update your profile.";
    return;
  }

  const name = document.getElementById("profile-name").value.trim();
  const email = document.getElementById("profile-email").value.trim().toLowerCase();
  const phone = document.getElementById("profile-phone").value.trim();
  const address = document.getElementById("profile-address").value.trim();
  if (!name || !email || !phone || !address) {
    message.textContent = "Complete your name, email, contact number, and delivery address.";
    return;
  }

  const users = getUsers();
  const currentUser = users.find(user => user.email === session.email);
  if (!currentUser) {
    message.textContent = "We couldn’t find your account. Please log in again.";
    return;
  }

  const emailInUse = users.some(user => user.email === email && user.email !== session.email);
  if (emailInUse) {
    message.textContent = "That email address is already used by another account.";
    return;
  }

  currentUser.name = name;
  currentUser.email = email;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(SESSION_KEY, JSON.stringify({ name, email }));
  saveDeliveryDetails({ phone, address });
  message.textContent = "Your profile has been updated.";
  renderAuthActions();
  renderCartDelivery();
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
renderCartDelivery();

const initialPage = window.location.hash.slice(1);
document.getElementById("signin-year").textContent = new Date().getFullYear();
if (initialPage === "profile" && readStorage(SESSION_KEY, null)?.email) {
  showProfile();
} else {
  showSigninPage();
}
