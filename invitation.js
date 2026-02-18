document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const skipBtn = document.getElementById('skip-intro');
  const introOverlay = document.getElementById('intro-overlay');
  const envelope = document.querySelector('.envelope');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let introFinished = false;

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    body.classList.remove('intro-active');
    body.classList.add('intro-complete');

    // Ensure page starts at the top
    window.scrollTo(0, 0);

    // Remove overlay after fade-out completes (match to CSS transition duration)
    window.setTimeout(() => {
      if (introOverlay) introOverlay.style.display = 'none';
    }, 700);
  }

  function startIntroAnimation() {
    if (!introOverlay || !envelope) {
      // If markup is missing, fail open
      finishIntro();
      return;
    }

    body.classList.add('intro-active');

    // Trigger envelope opening animation via CSS class
    envelope.classList.add('is-opening');

    // After envelope animation completes, reveal main page
    window.setTimeout(() => {
      finishIntro();
    }, 1900); // keep total intro under ~1s (tweak to match CSS)
  }

  // Reduced motion: no intro, just show page
  if (prefersReducedMotion) {
    finishIntro();
  } else {
    // Click to open (invitation feel)
    if (envelope) {
      envelope.style.cursor = 'pointer';
      envelope.addEventListener('click', () => startIntroAnimation(), { once: true });
    }

    // Allow skip
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        finishIntro();
      });
    }
  }

  // Scroll reveal (skip if reduced motion)
  const revealElements = document.querySelectorAll('.section, .invite-card.dossier');

  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('reveal-visible'));
    return;
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    }
  }, observerOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
  });
});
