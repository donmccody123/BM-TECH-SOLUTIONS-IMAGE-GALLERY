        let slideIndex = 1;
        let slideTimer;

        // Initialize slideshow
        function startSlideshow() {
            showSlide(slideIndex);
            autoSlideshow();
        }

        function autoSlideshow() {
            slideTimer = setTimeout(function() {
                slideIndex++;
                showSlide(slideIndex);
                autoSlideshow();
            }, 5000); // Change slide every 5 seconds
        }

        function changeSlide(n) {
            clearTimeout(slideTimer);
            slideIndex += n;
            showSlide(slideIndex);
            autoSlideshow();
        }

        function currentSlide(n) {
            clearTimeout(slideTimer);
            slideIndex = n;
            showSlide(slideIndex);
            autoSlideshow();
        }

        function showSlide(n) {
            const slides = document.getElementsByClassName('slide');
            const dots = document.getElementsByClassName('dot');

            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove('active');
            }
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove('active');
            }

            slides[slideIndex - 1].classList.add('active');
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].classList.add('active');
            }
        }

        // Gallery and Lightbox
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = index;
            const item = galleryItems[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox(event) {
            if (event.target === lightbox || event.target.classList.contains('close-btn')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        function changeImage(direction, event) {
            event.stopPropagation();
            currentIndex += direction;
            
            if (currentIndex < 0) {
                currentIndex = galleryItems.length - 1;
            } else if (currentIndex >= galleryItems.length) {
                currentIndex = 0;
            }
            
            const item = galleryItems[currentIndex];
            const img = item.querySelector('img');
            const caption = item.querySelector('h3').textContent;
            
            lightboxImg.src = img.src;
            lightboxCaption.textContent = caption;
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'Escape') {
                    lightbox.classList.remove('active');
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    changeImage(-1, e);
                } else if (e.key === 'ArrowRight') {
                    changeImage(1, e);
                }
            }
        });

        function updateFooterYear() {
            const yearEl = document.getElementById('footer-year');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }
        }

        // Start slideshow and update footer year when page loads
        window.addEventListener('load', function() {
            startSlideshow();
            updateFooterYear();
        });