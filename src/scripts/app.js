// This file contains JavaScript code for interactivity on the landing page.

document.addEventListener('DOMContentLoaded', () => {
    const productImages = document.querySelectorAll('.product-image');
    
    productImages.forEach(image => {
        image.addEventListener('click', () => {
            alert('Product clicked: ' + image.alt);
        });
    });

    const scrollToTopButton = document.getElementById('scrollToTop');
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});