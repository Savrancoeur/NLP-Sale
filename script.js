       // Fullscreen image viewer
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const fullImage = document.getElementById('fullImage');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtns = document.querySelectorAll('.prev');
    const nextBtns = document.querySelectorAll('.next');
    const downloadBtn = document.getElementById('downloadBtn');
    const slides = Array.from(document.querySelectorAll('.slide'));
    let currentSlideIndex = 0;

    // Function to update the modal image and download link
    function updateModalImage() {
        const currentSlide = slides[currentSlideIndex];
        fullImage.src = currentSlide.src;

        // Update download button to open the image in a new tab
        downloadBtn.href = currentSlide.src;
        downloadBtn.title = `Download Slide ${currentSlideIndex + 1}`;
    }

    // Navigation functions
    function showNextSlide(e) {
        if (e) e.stopPropagation();
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateModalImage();
    }

    function showPrevSlide(e) {
        if (e) e.stopPropagation();
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateModalImage();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);

    prevBtns.forEach(btn => {
        btn.addEventListener('click', showPrevSlide);
    });

    nextBtns.forEach(btn => {
        btn.addEventListener('click', showNextSlide);
    });

    // Open image in fullscreen on double click
    slides.forEach((slide, index) => {
        slide.addEventListener('dblclick', function() {
            currentSlideIndex = index;
            updateModalImage();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Update download button when navigating slides
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevSlide();
        } else if (e.key === 'ArrowRight') {
            showNextSlide();
        }
    });

    // Close modal when clicking on the overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
