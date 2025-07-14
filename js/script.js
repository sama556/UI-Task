document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const cartIcon = document.getElementById('cartIcon');
    const cartDropdown = document.getElementById('cartDropdown');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    
    // Check if elements exist
    if (!cartIcon || !cartDropdown || !cartOverlay || !closeCart) {
        console.error("One or more cart elements are missing!");
        return;
    }

    // Toggle cart visibility
    function toggleCart() {
        cartDropdown.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.style.overflow = cartDropdown.classList.contains('active') ? 'hidden' : '';
    }

    // Close cart
    function closeCartFunction() {
        cartDropdown.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event listeners
    cartIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleCart();
    });

    closeCart.addEventListener('click', closeCartFunction);

    cartOverlay.addEventListener('click', closeCartFunction);

    // Close cart when clicking outside (desktop only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768 && 
            !cartDropdown.contains(e.target) && 
            !cartIcon.contains(e.target)) {
            closeCartFunction();
        }
    });

    // Initialize cart (optional - if you want to keep it closed by default)
    closeCartFunction();
});