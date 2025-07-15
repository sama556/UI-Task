 function selectCategory(element) {
            document.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            element.classList.add('active');
            const wrapper = document.getElementById('categoriesWrapper');
            const itemRect = element.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            const scrollLeft = wrapper.scrollLeft + itemRect.left - wrapperRect.left - (wrapperRect.width / 2) + (itemRect.width / 2);
            
            wrapper.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
        function scrollCategories(direction) {
            const wrapper = document.getElementById('categoriesWrapper');
            const scrollAmount = 300;
            const isRTL = document.documentElement.dir === 'rtl';
            
            let scrollDirection = direction;
            if (isRTL) {
                scrollDirection = direction === 'left' ? 'right' : 'left';
            }
            
            if (scrollDirection === 'left') {
                wrapper.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            } else {
                wrapper.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
            setTimeout(updateButtonStates, 300);
        }
        function updateButtonStates() {
            const wrapper = document.getElementById('categoriesWrapper');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const isRTL = document.documentElement.dir === 'rtl';
            
            if (isRTL) {
                const isAtStart = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth);
                const isAtEnd = wrapper.scrollLeft <= 0;
                
                prevBtn.style.display = isAtStart ? 'none' : 'flex';
                nextBtn.style.display = isAtEnd ? 'none' : 'flex';
            } else {
                const isAtStart = wrapper.scrollLeft <= 0;
                const isAtEnd = wrapper.scrollLeft >= (wrapper.scrollWidth - wrapper.clientWidth);
                
                prevBtn.style.display = isAtStart ? 'none' : 'flex';
                nextBtn.style.display = isAtEnd ? 'none' : 'flex';
            }
        }
        document.addEventListener('DOMContentLoaded', function() {
            updateButtonStates();

            document.getElementById('categoriesWrapper').addEventListener('scroll', updateButtonStates);
            const wrapper = document.getElementById('categoriesWrapper');
            
            wrapper.addEventListener('wheel', function(e) {
                e.preventDefault();
                wrapper.scrollLeft += e.deltaY;
                updateButtonStates();
            });
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                scrollCategories('left');
            } else if (e.key === 'ArrowRight') {
                scrollCategories('right');
            }
        });
  //pack
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

        // Favorite button functionality
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

        function toggleSidebar() {
            document.getElementById("sidebar").classList.toggle("active");
            document.getElementById("overlay").classList.toggle("active");
        }