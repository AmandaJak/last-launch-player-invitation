document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const skipBtn = document.getElementById('skip-intro');
  const introOverlay = document.getElementById('intro-overlay');

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const envelope = document.querySelector('.envelope');

  // Function to reveal the main content
  function revealMain() {
    body.classList.remove('intro-active');
    body.classList.add('intro-complete');
    
    // Ensure the page starts at the top
    window.scrollTo(0, 0);
    
    // Cleanup intro overlay after transition
    setTimeout(() => {
      if (introOverlay) {
        introOverlay.style.display = 'none';
      }
    }, 1000); // Wait for the fade-out to finish
  }

  // If reduced motion is on, skip intro immediately
  if (prefersReducedMotion) {
    revealMain();
  } else {
    // Start intro sequence
    body.classList.add('intro-active');

    // Manually trigger reveal on click
    if (envelope) {
      envelope.style.cursor = 'pointer';
      envelope.addEventListener('click', () => {
        revealMain();
      });
    }
  }

  // Skip button handler
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      revealMain();
    });
  }

  // IntersectionObserver for scroll-reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and dossier cards
  const revealElements = document.querySelectorAll('.section, .invite-card.dossier');
  revealElements.forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
  });
});
