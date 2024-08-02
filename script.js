document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartFooter = document.getElementById("cart-footer");

  const products = [
    {
      id: 1,
      image: {
        thumbnail: "./assets/images/image-waffle-thumbnail.jpg",
        mobile: "./assets/images/image-waffle-mobile.jpg",
        tablet: "./assets/images/image-waffle-tablet.jpg",
        desktop: "./assets/images/image-waffle-desktop.jpg",
      },
      name: "Waffle with Berries",
      category: "Waffle",
      price: 6.5,
    },
    {
      id: 2,
      image: {
        thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg",
        mobile: "./assets/images/image-creme-brulee-mobile.jpg",
        tablet: "./assets/images/image-creme-brulee-tablet.jpg",
        desktop: "./assets/images/image-creme-brulee-desktop.jpg",
      },
      name: "Vanilla Bean Crème Brûlée",
      category: "Crème Brûlée",
      price: 7.0,
    },
    {
      id: 3,
      image: {
        thumbnail: "./assets/images/image-macaron-thumbnail.jpg",
        mobile: "./assets/images/image-macaron-mobile.jpg",
        tablet: "./assets/images/image-macaron-tablet.jpg",
        desktop: "./assets/images/image-macaron-desktop.jpg",
      },
      name: "Macaron Mix of Five",
      category: "Macaron",
      price: 8.0,
    },
    {
      id: 4,
      image: {
        thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg",
        mobile: "./assets/images/image-tiramisu-mobile.jpg",
        tablet: "./assets/images/image-tiramisu-tablet.jpg",
        desktop: "./assets/images/image-tiramisu-desktop.jpg",
      },
      name: "Classic Tiramisu",
      category: "Tiramisu",
      price: 5.5,
    },
    {
      id: 5,
      image: {
        thumbnail: "./assets/images/image-baklava-thumbnail.jpg",
        mobile: "./assets/images/image-baklava-mobile.jpg",
        tablet: "./assets/images/image-baklava-tablet.jpg",
        desktop: "./assets/images/image-baklava-desktop.jpg",
      },
      name: "Pistachio Baklava",
      category: "Baklava",
      price: 4.0,
    },
    {
      id: 6,
      image: {
        thumbnail: "./assets/images/image-meringue-thumbnail.jpg",
        mobile: "./assets/images/image-meringue-mobile.jpg",
        tablet: "./assets/images/image-meringue-tablet.jpg",
        desktop: "./assets/images/image-meringue-desktop.jpg",
      },
      name: "Lemon Meringue Pie",
      category: "Pie",
      price: 5.0,
    },
    {
      id: 7,
      image: {
        thumbnail: "./assets/images/image-cake-thumbnail.jpg",
        mobile: "./assets/images/image-cake-mobile.jpg",
        tablet: "./assets/images/image-cake-tablet.jpg",
        desktop: "./assets/images/image-cake-desktop.jpg",
      },
      name: "Red Velvet Cake",
      category: "Cake",
      price: 4.5,
    },
    {
      id: 8,
      image: {
        thumbnail: "./assets/images/image-brownie-thumbnail.jpg",
        mobile: "./assets/images/image-brownie-mobile.jpg",
        tablet: "./assets/images/image-brownie-tablet.jpg",
        desktop: "./assets/images/image-brownie-desktop.jpg",
      },
      name: "Salted Caramel Brownie",
      category: "Brownie",
      price: 4.5,
    },
    {
      id: 9,
      image: {
        thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg",
        mobile: "./assets/images/image-panna-cotta-mobile.jpg",
        tablet: "./assets/images/image-panna-cotta-tablet.jpg",
        desktop: "./assets/images/image-panna-cotta-desktop.jpg",
      },
      name: "Vanilla Panna Cotta",
      category: "Panna Cotta",
      price: 6.5,
    },
  ];

  function resetCartButton(button, product) {
    button.classList.remove("active");
    const productElement = document.querySelector(
      `.product[data-product-id="${product.id}"]`
    );
    const productImage = productElement.querySelector("img");
    productImage.classList.remove("active");
    button.innerHTML = `
      <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon">
      Add to Cart
    `;
    button.addEventListener(
      "click",
      () => {
        let quantity = 1; // Set quantity to 1 always
        button.classList.add("active");
        productImage.classList.add("active");
        updateCartButton(button, quantity, product);
      },
      { once: true }
    ); // Only once to avoid adding multiple listeners
  }

  function updateCartButton(button, quantity, product) {
    const productElement = document.querySelector(
      `.product[data-product-id="${product.id}"]`
    );
    const productImage = productElement.querySelector("img");

    button.innerHTML = `
      <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrease" class="decrease">
      ${quantity}
      <img src="./assets/images/icon-increment-quantity.svg" alt="Increase" class="increase">
    `;

    if (quantity > 0) {
      productImage.classList.add("active");
    }

    button.querySelector(".decrease").addEventListener("click", (event) => {
      event.stopPropagation();
      quantity--;
      if (quantity <= 0) {
        quantity = 0;
        productImage.classList.remove("active");
        button.classList.remove("active");
        resetCartButton(button, product);
        removeFromCart(product);
      } else {
        updateCartButton(button, quantity, product);
      }
      updateCartContainer();
    });

    button.querySelector(".increase").addEventListener("click", (event) => {
      event.stopPropagation();
      quantity++;
      updateCartButton(button, quantity, product);
      updateCartContainer();
    });

    addToCart(product, quantity);
    updateCartContainer();
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.dataset.productId = product.id;

    productElement.innerHTML = `
      <picture>
        <source media="(min-width: 1024px)" srcset="${product.image.desktop}">
        <source media="(min-width: 768px)" srcset="${product.image.tablet}">
        <img src="${product.image.mobile}" alt="${product.name}">
      </picture>
      <div class="product-info">
        <p class="category">${product.category}</p>
        <h2>${product.name}</h2>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart">
          <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon">
          Add to Cart
        </button>
      </div>
    `;

    productList.appendChild(productElement);

    const addToCartButton = productElement.querySelector(".add-to-cart");
    let quantity = 0;

    // Event listener for "Add to Cart" button
    addToCartButton.addEventListener("click", () => {
      quantity = 1; // Set quantity to 1 always
      addToCartButton.classList.add("active");
      const productImage = productElement.querySelector("img");
      productImage.classList.add("active");
      updateCartButton(addToCartButton, quantity, product);
      updateCartContainer();
    });
  });

  function initializeCart() {
    const cartElement = `
      <div class="cart-container">
        <h2>Your Cart (0)</h2>
        <div class="cart-image">
          <img src="./assets/images/illustration-empty-cart.svg" alt="Cart Image">
        </div>
        <p>Your added items will appear here</p>
        <div class="cart-items"></div>
      </div>
    `;

    cartFooter.innerHTML = cartElement;
  }

  const cartItemsContainer = document.querySelector(
    ".cart-container .cart-items"
  );
  let cart = {};

  function addToCart(product, quantity) {
    if (cart[product.id]) {
      cart[product.id].quantity = quantity;
    } else {
      cart[product.id] = {
        ...product,
        quantity: quantity,
      };
    }
    updateCartContainer();
  }

  function removeFromCart(product) {
    delete cart[product.id];
    updateCartContainer();
    const productElement = document.querySelector(
      `.product[data-product-id="${product.id}"]`
    );
    const addToCartButton = productElement.querySelector(".add-to-cart");
    resetCartButton(addToCartButton, product);
  }

  function updateCartContainer() {
    // Clear the cart items container
    const cartItemsContainer = document.querySelector(
      ".cart-container .cart-items"
    );
    cartItemsContainer.innerHTML = "";
    let totalItems = 0;
    let orderTotal = 0; // Variable to track total order amount

    // Iterate over the cart items and create them in the cart
    for (let key in cart) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <p class="product-name">${cart[key].name}</p>
        <div class="item-details">
          <span class="quantity">x ${cart[key].quantity}</span>
          <span class="individual-price">$${cart[key].price.toFixed(2)}</span>
         
          <span class="total-price">$${(
            cart[key].price * cart[key].quantity
          ).toFixed(2)}</span>
          
        </div>
        <img src="./assets/images/icon-remove-item.svg" alt="Remove Item" class="remove-item">
      `;
      cartItemsContainer.appendChild(cartItem);

      // Add event listener to the remove button
      cartItem.querySelector(".remove-item").addEventListener("click", () => {
        removeFromCart(cart[key]);
      });

      totalItems += cart[key].quantity;
      orderTotal += cart[key].price * cart[key].quantity; // Calculate total order amount
    }

    // Update the cart header with the number of items
    const cartHeader = document.querySelector(".cart-container h2");
    cartHeader.innerHTML = `Your Cart (${totalItems})`;

    // Order Total element at the bottom of the cart
    if (totalItems > 0) {
      const orderTotalElement = document.createElement("div");
      orderTotalElement.classList.add("order-total");
      orderTotalElement.innerHTML = `
        <p>Order Total</p>
        <p class="order-total-amount">$${orderTotal.toFixed(2)}</p>
      `;
      cartItemsContainer.appendChild(orderTotalElement);

      // Carbon-Neutral Delivery element below Order Total
      const carbonNeutralElement = document.createElement("div");
      carbonNeutralElement.classList.add("carbon-neutral");
      carbonNeutralElement.innerHTML = `
        <img src="./assets/images/icon-carbon-neutral.svg" alt="Carbon Neutral Icon" class="carbon-neutral-icon">
        <p>This is a <strong>carbon-neutral</strong> delivery</p>
      `;
      cartItemsContainer.appendChild(carbonNeutralElement);

      // Confirm Order button
      const confirmOrderButton = document.createElement("button");
      confirmOrderButton.classList.add("confirm-order-button");
      confirmOrderButton.innerText = "Confirm Order";
      cartItemsContainer.appendChild(confirmOrderButton);

      // Add event listener to the confirm order button
      confirmOrderButton.addEventListener("click", displayOrderConfirmation);

      // Activate the cart and hide the placeholder elements
      const cartContainer = document.querySelector(".cart-container");
      if (cartContainer) {
        cartContainer.classList.add("active");
        const cartImage = cartContainer.querySelector(".cart-image");
        const cartPlaceholderText = cartContainer.querySelector("p");
        if (cartImage) cartImage.style.display = "none";
        if (cartPlaceholderText) cartPlaceholderText.style.display = "none";
      }
    } else {
      // Deactivate the cart and restore the placeholder elements
      const cartContainer = document.querySelector(".cart-container");
      if (cartContainer) {
        cartContainer.classList.remove("active");
        const cartImage = cartContainer.querySelector(".cart-image");
        const cartPlaceholderText = cartContainer.querySelector("p");
        if (cartImage) cartImage.style.display = "block";
        if (cartPlaceholderText) cartPlaceholderText.style.display = "block";
      }
    }
  }

  function displayOrderConfirmation() {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");

    let orderConfirmationHTML = `
  <div class="overlay-content">
  <img src="./assets/images/icon-order-confirmed.svg" id="overlay-icon" alt="Icon Confirmed" class="carbon-neutral-icon">
  <h2 class="overlay-title">
    <span class="overlay-stacked">Order</span> 
    <span class="overlay-stacked">Confirmed</span>
  </h2>
  <p class="overlay-message">We hope you enjoy your food!</p>
  <div class="cart-item-container">
    `;

    // Iterate over cart items to display them in the order confirmation
    let orderTotal = 0;
    for (let key in cart) {
      const product = cart[key];
      orderTotal += product.price * product.quantity;
      orderConfirmationHTML += `
<div class="cart-item">
  <div class="item-details-confirmed">
    <img
      src="${product.image.thumbnail}"
      alt="${
        product.name
      }"
      class="product-image"
    />
    <div>
      <p class="product-name">${product.name}</p>
<div class = "quantity-x-individual-price">
      <span class="quantity">x ${product.quantity}</span>
      <span class="individual-price">$${product.price.toFixed(2)}</span>
        <span class="total-price-confirmed"
        >$${(product.price * product.quantity).toFixed( 2 )}</span
      >
      </div>
      
    </div>
  </div>
</div>
      `;
    }

    // Add the order total at the end
    orderConfirmationHTML += `
    <div class="order-total">
      <p>Order Total</p>
      <p class="order-total-amount">$${orderTotal.toFixed(2)}</p>
    </div>
  
    </div>
         <button class="start-new-order-button">Start New Order</button>
 
  `;

    overlay.innerHTML = orderConfirmationHTML;
    document.body.appendChild(overlay);

    overlay
      .querySelector(".start-new-order-button")
      .addEventListener("click", () => {
        resetCart();
        document.body.removeChild(overlay);
      });
  }
  function resetCart() {
    cart = {}; // Clear the cart

    // Reset the cart view to initial state
    initializeCart();

    // Reset all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      const productId = button.closest(".product").dataset.productId;
      const product = products.find((p) => p.id == productId);
      resetCartButton(button, product);
    });

    // Reinitialize the cart to allow adding new products
    updateCartContainer(); // Ensure the cart is ready for new items
  }

  // Initial call to setup the cart
  initializeCart();
});
