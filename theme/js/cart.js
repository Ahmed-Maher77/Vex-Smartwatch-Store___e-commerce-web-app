/**
 * WEBSITE: https://ahmedmaher-portfolio.vercel.app/
 * TWITTER: https://twitter.com/AhmedMa77068093
 * FACEBOOK: https://web.facebook.com/profile.php?id=100012154268952
 * GITHUB: https://github.com/Ahmed-Maher77
 */

// Cart utility - Simplified and safe version
const CART_KEY = "cartItems";

// Simple cart functions with error handling
function getCartItems() {
  try {
    const items = localStorage.getItem(CART_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Cart read error:", error);
    return [];
  }
}

function setCartItems(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Cart write error:", error);
  }
}

function addToCart(product, count = 1) {
  try {
    let cart = getCartItems();
    const idx = cart.findIndex((item) => item.id === product.id);
    if (idx > -1) {
      cart[idx].count += count;
    } else {
      cart.push({ ...product, count });
    }
    setCartItems(cart);
    // Simple cart icon update without complex DOM manipulation
    updateCartDisplay();
  } catch (error) {
    console.error("Add to cart error:", error);
  }
}

function removeFromCart(productId) {
  try {
    let cart = getCartItems();
    cart = cart.filter((item) => item.id !== productId);
    setCartItems(cart);
    // Simple cart icon update without complex DOM manipulation
    updateCartDisplay();
  } catch (error) {
    console.error("Remove from cart error:", error);
  }
}

// Simplified cart display update - no complex DOM manipulation
function updateCartDisplay() {
  try {
    const cart = getCartItems();
    const total = cart.reduce((sum, item) => sum + (item.count || 0), 0);

    // Update existing cart count if it exists
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = total;
    }

    // Only create cart icon if it doesn't exist and navbar exists
    const existingIcon = document.getElementById("cart-icon");
    if (!existingIcon) {
      const nav = document.querySelector(".navbar-nav");
      if (nav) {
        const li = document.createElement("li");
        li.className = "nav-item";
        li.innerHTML = `
          <a href="cart.html" id="cart-icon" style="position:relative; margin-left:20px; font-size:22px;">
            <span class="tf-ion-android-cart"></span>
            <span id="cart-count" style="position:absolute;top:-8px;right:-12px;background:#f9a743;color:#fff;border-radius:50%;font-size:12px; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;line-height: 20px;">${total}</span>
          </a>
        `;
        nav.appendChild(li);
      }
    }
  } catch (error) {
    console.error("Cart display update error:", error);
  }
}

// Initialize cart display once when DOM is ready
function initCart() {
  try {
    updateCartDisplay();
  } catch (error) {
    console.error("Cart init error:", error);
  }
}

// Safe initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCart);
} else {
  initCart();
}
