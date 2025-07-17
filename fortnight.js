document.addEventListener("DOMContentLoaded", () => {
    // Typing Effect
    const typingText = document.querySelector(".typing-text");
    const words = ["JAIME CARLOS"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeToggle.innerHTML = document.body.classList.contains("light-mode") 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    });

    // Carousel Implementation
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        let position = 0;
        const track = carousel.querySelector('.carousel-track');
        const items = carousel.querySelectorAll('.carousel-item');
        const prev = carousel.querySelector('.prev');
        const next = carousel.querySelector('.next');
        
        const itemWidth = items[0].offsetWidth + 20;
        const itemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
        const maxPosition = items.length - itemsPerView;

        function updateCarouselPosition() {
            track.style.transform = `translateX(${-position * itemWidth}px)`;
            prev.style.display = position <= 0 ? 'none' : 'block';
            next.style.display = position >= maxPosition ? 'none' : 'block';
        }

        prev.addEventListener('click', () => {
            if (position > 0) {
                position--;
                updateCarouselPosition();
            }
        });

        next.addEventListener('click', () => {
            if (position < maxPosition) {
                position++;
                updateCarouselPosition();
            }
        });

        updateCarouselPosition();

        window.addEventListener('resize', () => {
            const newItemsPerView = Math.floor(carousel.offsetWidth / itemWidth);
            const newMaxPosition = items.length - newItemsPerView;
            position = Math.min(position, newMaxPosition);
            updateCarouselPosition();
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image Modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Add click handlers to all images
    const images = document.querySelectorAll('img:not(.modal-content)');
    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.classList.add('active');
            modalImg.src = img.src;
        });
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });

    // Handle scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Form validation and submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!form.checkValidity()) {
                e.preventDefault();
                Array.from(form.elements).forEach(input => {
                    if (input.checkValidity()) {
                        input.classList.remove('invalid');
                    } else {
                        input.classList.add('invalid');
                    }
                });
            }
        });
    });

    const backToTop = document.getElementById("backToTop");

    // Show button when scrolling down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    // Smooth Scroll to Top
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});