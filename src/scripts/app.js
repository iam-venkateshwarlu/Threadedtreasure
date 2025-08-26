// This file contains JavaScript code for interactivity on the landing page.

document.addEventListener('DOMContentLoaded', function () {
  /* --- existing category horizontal scroll code (keeps previous functionality) --- */
  const list = document.getElementById('categoryList');
  const btnLeft = document.querySelector('.scroll-btn.left');
  const btnRight = document.querySelector('.scroll-btn.right');

  if (list && btnLeft && btnRight) {
    const scrollAmount = () => Math.round(list.clientWidth * 0.6);
    btnLeft.addEventListener('click', () => list.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
    btnRight.addEventListener('click', () => list.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

    function updateButtons() {
      btnLeft.style.display = list.scrollLeft > 10 ? 'flex' : 'none';
      btnRight.style.display = (list.scrollLeft + list.clientWidth) < (list.scrollWidth - 10) ? 'flex' : 'none';
    }
    list.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  }

  /* --- banner carousel code (center active slide, allow peeking) --- */
  const slidesEl = document.getElementById('bannerSlides');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (!slidesEl || !dotsContainer) return;

  const slides = Array.from(slidesEl.querySelectorAll('.slide'));
  let current = 0;
  let intervalId = null;
  const AUTO_MS = 4500;
  const GAP = parseInt(getComputedStyle(slidesEl).gap || 18, 10);

  // build dots
  slides.forEach((s, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
    btn.dataset.index = String(i);
    if (i === 0) btn.setAttribute('aria-current', 'true');
    btn.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(btn);
  });

  function setPosition(index) {
    // center the chosen slide: compute offset of slide and center in carousel viewport
    const slideEl = slides[index];
    const slideWidth = slideEl.getBoundingClientRect().width;
    const containerWidth = slidesEl.parentElement.getBoundingClientRect().width;
    // compute left offset of the slide relative to slidesEl start
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += slides[i].getBoundingClientRect().width + GAP;
    }
    // center calculation
    const centerOffset = offset - (containerWidth - slideWidth) / 2;
    slidesEl.style.transform = `translateX(-${Math.max(0, centerOffset)}px)`;

    // update dots aria
    Array.from(dotsContainer.children).forEach((d, i2) => {
      if (i2 === index) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
    });
  }

  function goToSlide(index) {
    current = (index + slides.length) % slides.length;
    setPosition(current);
    resetAuto();
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAuto() {
    if (intervalId) return;
    intervalId = setInterval(nextSlide, AUTO_MS);
  }
  function stopAuto() {
    if (!intervalId) return;
    clearInterval(intervalId);
    intervalId = null;
  }
  function resetAuto() { stopAuto(); startAuto(); }

  // pause on hover / focus for accessibility
  const carouselRoot = document.getElementById('banner');
  if (carouselRoot) {
    carouselRoot.addEventListener('mouseenter', stopAuto);
    carouselRoot.addEventListener('mouseleave', startAuto);
    carouselRoot.addEventListener('focusin', stopAuto);
    carouselRoot.addEventListener('focusout', startAuto);
    carouselRoot.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
  }

  // initialize after images/layout have loaded
  window.addEventListener('load', () => { setPosition(0); startAuto(); });
  window.addEventListener('resize', () => setPosition(current));
});