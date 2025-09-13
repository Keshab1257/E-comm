// KESHAB Enterprises E-commerce Application

// Application data
const appData = {
  categories: [
    {"id": 1, "name": "Electronics", "icon": "💻"},
    {"id": 2, "name": "Clothing", "icon": "👕"},
    {"id": 3, "name": "Books", "icon": "📚"},
    {"id": 4, "name": "Home & Garden", "icon": "🏡"},
    {"id": 5, "name": "Sports", "icon": "⚽"},
    {"id": 6, "name": "Beauty", "icon": "💄"}
  ],
  products: [
    {
      "id": 1,
      "name": "Wireless Bluetooth Headphones",
      "category": "Electronics",
      "price": 79.99,
      "originalPrice": 99.99,
      "rating": 4.5,
      "reviews": 1234,
      "description": "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
      "features": ["Noise Cancellation", "20-hour Battery", "Wireless", "Comfortable Fit"],
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
      ],
      "inStock": true
    },
    {
      "id": 2,
      "name": "Men's Cotton T-Shirt",
      "category": "Clothing",
      "price": 24.99,
      "originalPrice": 34.99,
      "rating": 4.2,
      "reviews": 567,
      "description": "Comfortable 100% cotton t-shirt available in multiple colors and sizes.",
      "features": ["100% Cotton", "Machine Washable", "Multiple Colors", "Comfortable Fit"],
      "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"
      ],
      "inStock": true
    },
    {
      "id": 3,
      "name": "Programming Fundamentals Book",
      "category": "Books",
      "price": 39.99,
      "originalPrice": 49.99,
      "rating": 4.7,
      "reviews": 892,
      "description": "Comprehensive guide to programming fundamentals with practical examples.",
      "features": ["500+ Pages", "Code Examples", "Beginner Friendly", "Latest Edition"],
      "image": "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop"
      ],
      "inStock": true
    },
    {
      "id": 4,
      "name": "Smart LED Table Lamp",
      "category": "Home & Garden",
      "price": 59.99,
      "originalPrice": 79.99,
      "rating": 4.4,
      "reviews": 323,
      "description": "Smart LED lamp with app control and adjustable brightness.",
      "features": ["Smart Control", "Adjustable Brightness", "Energy Efficient", "Modern Design"],
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      ],
      "inStock": true
    },
    {
      "id": 5,
      "name": "Yoga Mat Premium",
      "category": "Sports",
      "price": 34.99,
      "originalPrice": 44.99,
      "rating": 4.6,
      "reviews": 445,
      "description": "Premium non-slip yoga mat perfect for all yoga practices.",
      "features": ["Non-slip Surface", "Eco-friendly", "6mm Thickness", "Carrying Strap"],
      "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      ],
      "inStock": true
    },
    {
      "id": 6,
      "name": "Organic Face Moisturizer",
      "category": "Beauty",
      "price": 28.99,
      "originalPrice": 38.99,
      "rating": 4.3,
      "reviews": 678,
      "description": "Natural organic moisturizer for all skin types.",
      "features": ["Organic", "All Skin Types", "Hypoallergenic", "50ml"],
      "image": "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop",
      "images": [
        "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=300&fit=crop"
      ],
      "inStock": true
    }
  ],
  adminStats: {
    totalOrders: 2543,
    totalRevenue: 125670.50,
    totalProducts: 1247,
    totalUsers: 5643,
    ordersToday: 47,
    revenueToday: 3450.25
  },
  orders: [
    {
      "id": "ORD-001",
      "customerName": "John Doe",
      "status": "Processing",
      "total": 159.98,
      "date": "2025-09-08",
      "items": 3
    },
    {
      "id": "ORD-002", 
      "customerName": "Jane Smith",
      "status": "Shipped",
      "total": 79.99,
      "date": "2025-09-07",
      "items": 1
    }
  ]
};

// Application state
const appState = {
  currentPage: 'homepage',
  currentCategory: null,
  currentProduct: null,
  cart: [],
  searchQuery: '',
  filteredProducts: [...appData.products],
  isAdmin: false,
  isLoggedIn: false,
  currentUser: null
};

// Shopping cart management
class CartManager {
  constructor() {
    this.cart = [];
    this.updateCartCount();
  }

  addItem(productId, quantity = 1) {
    const product = appData.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    // Update global cart state
    appState.cart = this.cart;
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(productId);
      } else {
        appState.cart = this.cart;
        this.updateCartCount();
        renderCartPage();
      }
    }
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    appState.cart = this.cart;
    this.updateCartCount();
    renderCartPage();
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = this.getItemCount();
    }
  }

  clearCart() {
    this.cart = [];
    appState.cart = this.cart;
    this.updateCartCount();
  }

  showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-success);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Page management
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
    appState.currentPage = pageId;
  }

  // Update navigation
  updateNavigation(pageId);
}

function updateNavigation(currentPage) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active state based on current page
  if (currentPage === 'homepage') {
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
  }
}

// Product rendering functions
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  if (hasHalfStar) {
    stars += '☆';
  }
  
  return stars;
}

function renderProductCard(product) {
  return `
    <div class="product-card" onclick="viewProduct(${product.id})">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h4>${product.name}</h4>
        <div class="product-rating">
          <span class="stars">${renderStars(product.rating)}</span>
          <span>(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price}</span>
          ${product.originalPrice !== product.price ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  if (!categoriesGrid) return;

  categoriesGrid.innerHTML = appData.categories.map(category => `
    <div class="category-card" onclick="viewCategory('${category.name}')">
      <div class="icon">${category.icon}</div>
      <h4>${category.name}</h4>
    </div>
  `).join('');
}

function renderFeaturedProducts() {
  const featuredContainer = document.getElementById('featured-products');
  if (!featuredContainer) return;

  const featuredProducts = appData.products.slice(0, 4);
  featuredContainer.innerHTML = featuredProducts.map(renderProductCard).join('');
}

function renderProductListing() {
  const productsGrid = document.getElementById('products-grid');
  const resultsCount = document.getElementById('results-count');
  
  if (!productsGrid) return;

  productsGrid.innerHTML = appState.filteredProducts.map(renderProductCard).join('');
  
  if (resultsCount) {
    resultsCount.textContent = `${appState.filteredProducts.length} results`;
  }
}

function renderCategoryFilters() {
  const categoryFilters = document.getElementById('category-filters');
  if (!categoryFilters) return;

  categoryFilters.innerHTML = appData.categories.map(category => `
    <label>
      <input type="checkbox" value="${category.name}" onchange="applyFilters()"> ${category.name}
    </label>
  `).join('');
}

function renderProductDetails(productId) {
  const product = appData.products.find(p => p.id === productId);
  if (!product) return;

  // Update breadcrumb
  const productCategoryElement = document.getElementById('product-category');
  const productNameElement = document.getElementById('product-name');
  if (productCategoryElement) productCategoryElement.textContent = product.category;
  if (productNameElement) productNameElement.textContent = product.name;

  // Update product images
  const mainImage = document.getElementById('main-product-image');
  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  const thumbnailImages = document.getElementById('thumbnail-images');
  if (thumbnailImages) {
    thumbnailImages.innerHTML = product.images.map((image, index) => `
      <img src="${image}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
           onclick="changeMainImage('${image}', this)">
    `).join('');
  }

  // Update product info
  const elements = {
    'product-title': product.name,
    'product-stars': renderStars(product.rating),
    'product-review-count': `(${product.reviews} reviews)`,
    'product-current-price': `$${product.price}`,
    'product-original-price': product.originalPrice !== product.price ? `$${product.originalPrice}` : '',
    'product-description-text': product.description
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  const featuresList = document.getElementById('product-features-list');
  if (featuresList) {
    featuresList.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');
  }

  appState.currentProduct = product;
}

function changeMainImage(imageSrc, thumbnail) {
  const mainImage = document.getElementById('main-product-image');
  if (mainImage) mainImage.src = imageSrc;
  
  document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
  if (thumbnail) thumbnail.classList.add('active');
}

// Cart page rendering
function renderCartPage() {
  const cartItems = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTotal = document.getElementById('cart-total');
  
  if (!cartItems) return;

  if (appState.cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add some items to get started!</p>
        <button class="btn btn--primary" onclick="showPage('homepage')">Continue Shopping</button>
      </div>
    `;
  } else {
    cartItems.innerHTML = appState.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p class="current-price">$${item.price}</p>
          <div class="cart-item-controls">
            <div class="quantity-controls">
              <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="btn btn--outline btn--sm" onclick="cartManager.removeItem(${item.id})">Remove</button>
          </div>
        </div>
        <div class="cart-item-total">
          <span class="current-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
    `).join('');
  }

  const subtotal = cartManager.getTotal();
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping;

  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;

  // Update checkout total
  const checkoutTotal = document.getElementById('checkout-total');
  if (checkoutTotal) checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function renderCheckoutItems() {
  const checkoutItems = document.getElementById('checkout-items');
  if (!checkoutItems) return;

  checkoutItems.innerHTML = appState.cart.map(item => `
    <div class="checkout-item" style="display: flex; justify-content: space-between; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border);">
      <span>${item.name} x ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');
}

// Search and filter functionality
function searchProducts() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    const query = searchInput.value.toLowerCase();
    appState.searchQuery = query;
    applyFilters();
  }
}

function applyFilters() {
  let filtered = [...appData.products];

  // Apply search filter
  if (appState.searchQuery) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(appState.searchQuery) ||
      product.description.toLowerCase().includes(appState.searchQuery) ||
      product.category.toLowerCase().includes(appState.searchQuery)
    );
  }

  // Apply category filter
  const categoryFilters = document.querySelectorAll('#category-filters input:checked');
  if (categoryFilters.length > 0) {
    const selectedCategories = Array.from(categoryFilters).map(input => input.value);
    filtered = filtered.filter(product => selectedCategories.includes(product.category));
  }

  // Apply price filter
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    const maxPrice = parseInt(priceRange.value);
    filtered = filtered.filter(product => product.price <= maxPrice);
    const priceValue = document.getElementById('price-value');
    if (priceValue) priceValue.textContent = maxPrice;
  }

  // Apply rating filter
  const ratingFilters = document.querySelectorAll('#rating-filters input:checked');
  if (ratingFilters.length > 0) {
    const selectedRatings = Array.from(ratingFilters).map(input => parseInt(input.value));
    const minRating = Math.min(...selectedRatings);
    filtered = filtered.filter(product => product.rating >= minRating);
  }

  // Apply sorting
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    const sortBy = sortSelect.value;
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  appState.filteredProducts = filtered;
  renderProductListing();
}

// Navigation functions
function viewCategory(categoryName) {
  appState.currentCategory = categoryName;
  const currentCategoryElement = document.getElementById('current-category');
  if (currentCategoryElement) {
    currentCategoryElement.textContent = categoryName;
  }
  
  // Filter products by category
  appState.filteredProducts = appData.products.filter(product => product.category === categoryName);
  
  showPage('product-listing');
  renderProductListing();
  renderCategoryFilters();
}

function viewProduct(productId) {
  renderProductDetails(productId);
  showPage('product-details');
}

function goHome() {
  showPage('homepage');
}

// Admin dashboard functions
function renderAdminDashboard() {
  // Update KPI cards
  const elements = {
    'total-orders': appData.adminStats.totalOrders.toLocaleString(),
    'total-revenue': `$${appData.adminStats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
    'total-products': appData.adminStats.totalProducts.toLocaleString(),
    'total-users': appData.adminStats.totalUsers.toLocaleString()
  };

  Object.entries(elements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  });

  // Render admin sections
  renderRecentOrders();
  renderAdminProductsTable();
  renderAdminOrdersTable();
}

function renderRecentOrders() {
  const recentOrdersTable = document.getElementById('recent-orders-table');
  if (!recentOrdersTable) return;

  recentOrdersTable.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Total</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        ${appData.orders.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td><span class="status status--${order.status.toLowerCase() === 'processing' ? 'warning' : 'success'}">${order.status}</span></td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderAdminProductsTable() {
  const productsTable = document.getElementById('admin-products-table');
  if (!productsTable) return;

  productsTable.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${appData.products.map(product => `
          <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td><span class="status status--success">In Stock</span></td>
            <td>
              <button class="btn btn--sm btn--outline">Edit</button>
              <button class="btn btn--sm btn--outline">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function renderAdminOrdersTable() {
  const ordersTable = document.getElementById('admin-orders-table');
  if (!ordersTable) return;

  ordersTable.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Items</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${appData.orders.map(order => `
          <tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.items}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status status--${order.status.toLowerCase() === 'processing' ? 'warning' : 'success'}">${order.status}</span></td>
            <td>${order.date}</td>
            <td>
              <button class="btn btn--sm btn--outline">View</button>
              <button class="btn btn--sm btn--primary">Update</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function showAdminSection(sectionId) {
  // Hide all admin sections
  document.querySelectorAll('.admin-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show selected section
  const targetSection = document.getElementById(`admin-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update navigation
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the application
  renderCategories();
  renderFeaturedProducts();
  renderCategoryFilters();
  renderProductListing();
  renderCartPage();
  renderCheckoutItems();

  // Logo click handler
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', function() {
      showPage('homepage');
    });
  }

  // Header navigation
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      searchProducts();
      showPage('product-listing');
    });
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchProducts();
        showPage('product-listing');
      }
    });
  }

  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      renderCartPage();
      showPage('shopping-cart');
    });
  }

  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      showPage('login');
    });
  }

  const adminBtn = document.getElementById('admin-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', function() {
      showPage('admin-login');
    });
  }

  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href === '#home') {
        showPage('homepage');
      } else {
        const categoryName = this.textContent.trim();
        viewCategory(categoryName);
      }
    });
  });

  // Product details
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      if (appState.currentProduct) {
        const quantitySelect = document.getElementById('quantity-select');
        const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
        cartManager.addItem(appState.currentProduct.id, quantity);
      }
    });
  }

  // Cart page
  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      renderCheckoutItems();
      showPage('checkout');
    });
  }

  const continueShoppingBtn = document.getElementById('continue-shopping-btn');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function() {
      showPage('homepage');
    });
  }

  // Checkout form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Order placed successfully! Thank you for shopping with KESHAB Enterprises.');
      cartManager.clearCart();
      showPage('homepage');
    });
  }

  // Authentication tabs
  const userLoginTab = document.getElementById('user-login-tab');
  if (userLoginTab) {
    userLoginTab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      this.classList.add('active');
      const userLoginForm = document.getElementById('user-login-form');
      if (userLoginForm) userLoginForm.classList.add('active');
    });
  }

  const userRegisterTab = document.getElementById('user-register-tab');
  if (userRegisterTab) {
    userRegisterTab.addEventListener('click', function() {
      document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
      this.classList.add('active');
      const userRegisterForm = document.getElementById('user-register-form');
      if (userRegisterForm) userRegisterForm.classList.add('active');
    });
  }

//  // User authentication
//  const userLoginForm = document.getElementById('user-login-form');
//  if (userLoginForm) {
//    userLoginForm.addEventListener('submit', function(e) {
//      e.preventDefault();
//      appState.isLoggedIn = true;
//    });
//  }

//  const userRegisterForm = document.getElementById('user-register-form');
//  if (userRegisterForm) {
//    userRegisterForm.addEventListener('submit', function(e) {
//      e.preventDefault();
//      if (userLoginTab) userLoginTab.click();
//    });
//  }

  // Admin authentication
  const adminLoginForm = document.getElementById('admin-login-form');
  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      appState.isAdmin = true;
      appState.isLoggedIn = true;
      appState.currentUser = { name: 'Admin', email: 'admin@keshab.com' };
      renderAdminDashboard();
      showPage('admin-dashboard');
    });
  }

  const backToUserLogin = document.getElementById('back-to-user-login');
  if (backToUserLogin) {
    backToUserLogin.addEventListener('click', function() {
      showPage('login');
    });
  }

  // Admin navigation
  document.querySelectorAll('.admin-nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      showAdminSection(section);
    });
  });

  const adminLogout = document.getElementById('admin-logout');
  if (adminLogout) {
    adminLogout.addEventListener('click', function() {
      appState.isAdmin = false;
      appState.isLoggedIn = false;
      appState.currentUser = null;
      showPage('homepage');
    });
  }

  // Filter controls
  const priceRange = document.getElementById('price-range');
  if (priceRange) {
    priceRange.addEventListener('input', function() {
      const priceValue = document.getElementById('price-value');
      if (priceValue) priceValue.textContent = this.value;
      applyFilters();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', applyFilters);
  }

  // Initialize filters
  applyFilters();
});

// Global functions for onclick handlers
window.viewCategory = viewCategory;
window.viewProduct = viewProduct;
window.changeMainImage = changeMainImage;
window.applyFilters = applyFilters;
window.showAdminSection = showAdminSection;
window.showPage = showPage;
window.goHome = goHome;
window.cartManager = cartManager;