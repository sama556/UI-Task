// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Cart functionality
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    
    if (!cartIcon || !cartDropdown || !cartOverlay || !closeCart) {
        console.error("One or more cart elements are missing!");
        return;
    }
    
    function toggleCart() {
        cartDropdown.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartDropdown.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeCartFunction() {
        cartDropdown.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCart();
    });

    closeCart.addEventListener('click', closeCartFunction);
    cartOverlay.addEventListener('click', closeCartFunction);
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768 && 
            !cartDropdown.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            closeCartFunction();
        }
    });
    
    closeCartFunction();
    
    // Initialize Swiper
    const newPicksSwiper = new Swiper('#newPicksSwiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        navigation: {
            nextEl: '#newPicksNext',
            prevEl: '#newPicksPrev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 24,
            }
        }
    });
    
    // Favorite buttons functionality
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
});

// Sidebar functionality
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

// Categories functionality
function scrollCategories(direction) {
    const categoriesList = document.getElementById('categoriesList');
    const scrollAmount = 200;
    
    if (categoriesList) {
        if (direction === 'left') {
            categoriesList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            categoriesList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
}

function selectCategory(element) {
    // Remove active class from all categories
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked category
    element.classList.add('active');
}

// Filter dropdown functionality
function toggleDropdown(btn) {
    const dropdown = btn.nextElementSibling;
    
    // Close all other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== dropdown) {
            menu.classList.remove('show');
        }
    });
    
    // Toggle current dropdown
    dropdown.classList.toggle('show');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.filter-item')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

// Update discount value
function updateDiscountValue(val) {
    const discountValueSpan = document.getElementById("discount-value");
    const rangeInput = document.getElementById("discountRange");
    
    if (discountValueSpan) {
        discountValueSpan.innerText = val + "%";
    }
    
    if (rangeInput) {
        const percentage = ((val - 15) / (90 - 15)) * 100;
        rangeInput.style.background = `linear-gradient(to right, #02c9c0 0%, #02c9c0 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
    }
}

// Reset discount
function resetDiscount() {
    const rangeInput = document.getElementById("discountRange");
    
    if (rangeInput) {
        rangeInput.value = 25;
        updateDiscountValue(25);
    }
}

// Close dropdown
function closeDropdown(button) {
    const dropdown = button.closest('.dropdown-menu');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// Rating functionality
let selectedRating = 3.5;

function updateRatingValue(val) {
    selectedRating = val;
    const ratingValueSpan = document.getElementById("rating-value");
    
    if (ratingValueSpan) {
        ratingValueSpan.innerText = val;
    }
    
    document.querySelectorAll("#ratingDots .rating-dot").forEach(dot => {
        dot.classList.toggle("active", dot.dataset.value == val);
    });
}

// Cart item functionality
function increaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty${itemId}`);
    if (qtyElement) {
        let currentQty = parseInt(qtyElement.textContent);
        qtyElement.textContent = currentQty + 1;
        updateCartTotal();
    }
}

function decreaseQuantity(itemId) {
    const qtyElement = document.getElementById(`qty${itemId}`);
    if (qtyElement) {
        let currentQty = parseInt(qtyElement.textContent);
        if (currentQty > 1) {
            qtyElement.textContent = currentQty - 1;
            updateCartTotal();
        }
    }
}

function removeItem(itemId) {
    const itemElement = document.querySelector(`#qty${itemId}`).closest('.cart-item');
    if (itemElement) {
        itemElement.remove();
        updateCartTotal();
        updateCartItemCount();
    }
}

function updateCartTotal() {
    let subtotal = 0;
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace('KD', '').trim());
        const qtyText = item.querySelector('.quantity-value').textContent;
        const qty = parseInt(qtyText);
        subtotal += price * qty;
    });
    
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (subtotalElement) {
        subtotalElement.textContent = subtotal.toFixed(2) + ' KD';
    }
    
    const deliveryFee = 4.00;
    const feesAndTax = 5.00;
    const total = subtotal + deliveryFee + feesAndTax;
    
    if (totalElement) {
        totalElement.textContent = total.toFixed(2) + ' KD';
    }
    
    if (checkoutBtn) {
        checkoutBtn.textContent = `Checkout ${total.toFixed(2)} KD`;
    }
}

function updateCartItemCount() {
    const cartItems = document.querySelectorAll('.cart-item');
    const cartItemCount = document.querySelector('.cart-item-count');
    
    if (cartItemCount) {
        cartItemCount.textContent = `${cartItems.length} items`;
    }
}

// Countdown timer functionality
function startCountdown(elementId, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let timer = duration;
    const countdown = setInterval(function() {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;
        
        element.textContent = 
            (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
        
        if (--timer < 0) {
            clearInterval(countdown);
            element.textContent = "00:00:00";
        }
    }, 1000);
}

// Initialize countdown timers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timers for flash offers
    startCountdown('countdown1', 7170); // 01:59:30
    startCountdown('countdown2', 4802); // 01:20:02
    startCountdown('countdown3', 21570); // 05:59:30
});