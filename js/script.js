document.addEventListener('DOMContentLoaded', function() {
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
});
 function toggleDropdown(btn) {
  const dropdown = btn.nextElementSibling;
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu !== dropdown) menu.classList.remove('show');
  });
  dropdown.classList.toggle('show');
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.filter-item')) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.remove('show');
    });
  }
});

function updateDiscountValue(val) {
  document.getElementById("discount-value").innerText = val + "%";
  const rangeInput = document.getElementById("discountRange");
  const percentage = ((val - 15) / (90 - 15)) * 100;
  rangeInput.style.background = `linear-gradient(to right, #02c9c0 0%, #02c9c0 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
}

function resetDiscount() {
  const rangeInput = document.getElementById("discountRange");
  rangeInput.value = 25;
  updateDiscountValue(25);
}

function closeDropdown(button) {
  button.closest('.dropdown-menu').classList.remove('show');
}
let selectedRating = 3.5;

function updateRatingValue(val) {
  selectedRating = val;
  document.getElementById("rating-value").innerText = val;
  document.querySelectorAll("#ratingDots .rating-dot").forEach(dot => {
    dot.classList.toggle("active", dot.dataset.value == val);
  });
}
 const newPicksSwiper = new Swiper('#newPicksSwiper2', {
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
