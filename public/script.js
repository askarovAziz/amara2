// ========================================
// AMARA SPA - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // HEADER SCROLL EFFECT
  // ========================================
  const header = document.getElementById('header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll);


  // ========================================
  // THEME TOGGLE (DARK/LIGHT)
  // ========================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const floatingThemeToggleBtn = document.getElementById('floatingThemeToggleBtn');

  function applyTheme(theme) {
    const normalizedTheme = theme === 'light' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', normalizedTheme);
    localStorage.setItem('amara-theme', normalizedTheme);

    const nextLabel = normalizedTheme === 'dark' ? 'Light' : 'Dark';
    const switchToLabel = normalizedTheme === 'dark' ? 'light' : 'dark';

    [themeToggleBtn, mobileThemeToggleBtn, floatingThemeToggleBtn].forEach((btn) => {
      if (!btn) return;
      btn.textContent = nextLabel;
      btn.setAttribute('aria-label', `Switch to ${switchToLabel} mode`);
      btn.setAttribute('aria-pressed', String(normalizedTheme === 'light'));
    });
  }

  const savedTheme = localStorage.getItem('amara-theme');
  applyTheme(savedTheme || 'dark');

  [themeToggleBtn, mobileThemeToggleBtn, floatingThemeToggleBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const currentTheme = document.body.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
  });

  // ========================================
  // MOBILE MENU
  // ========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    const setMobileMenuState = (isOpen) => {
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileNav.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('menu-open', isOpen);
    };

    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('active');
      setMobileMenuState(isOpen);
    });

    // Close mobile menu on link click
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        setMobileMenuState(false);
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileNav.classList.contains('active')) {
        setMobileMenuState(false);
      }
    });
  }

  // ========================================
  // MASSAGES FILTER TABS + SEE MORE/LESS
  // ========================================
  const filterButtons = document.querySelectorAll('.massages-filter-btn');
  const massageCards = Array.from(document.querySelectorAll('#massagesGrid .massage-card'));
  const massagesGrid = document.getElementById('massagesGrid');
  const massagesToggleBtn = document.getElementById('massagesToggleBtn');

  if (filterButtons.length > 0 && massageCards.length > 0 && massagesGrid && massagesToggleBtn) {
    let activeFilter = 'all';
    let isExpanded = false;

    const MOBILE_BREAKPOINT = 768;
    const getCollapsedLimit = () => (window.innerWidth <= MOBILE_BREAKPOINT ? 4 : 7);

    const applyMassagesState = ({ animate = true } = {}) => {
      const previousHeight = massagesGrid.scrollHeight;

      if (animate) {
        massagesGrid.style.maxHeight = `${previousHeight}px`;
        void massagesGrid.offsetHeight;
      }

      const visibleCards = massageCards.filter((card) => {
        const category = card.dataset.category;
        return activeFilter === 'all' || category === activeFilter;
      });

      const collapsedLimit = getCollapsedLimit();
      const hasOverflow = visibleCards.length > collapsedLimit;
      const shouldExpand = isExpanded && hasOverflow;
      const cardsToShowCount = shouldExpand ? visibleCards.length : Math.min(visibleCards.length, collapsedLimit);

      massageCards.forEach((card) => card.classList.add('is-hidden'));

      visibleCards.forEach((card, index) => {
        card.classList.toggle('is-hidden', index >= cardsToShowCount);
      });

      massagesToggleBtn.classList.toggle('is-hidden', !hasOverflow);
      massagesToggleBtn.hidden = !hasOverflow;

      if (!hasOverflow) {
        isExpanded = false;
        massagesToggleBtn.textContent = 'See more';
        massagesToggleBtn.setAttribute('aria-expanded', 'false');
        massagesGrid.style.maxHeight = '';
        return;
      }

      massagesToggleBtn.textContent = shouldExpand ? 'See Less' : 'See more';
      massagesToggleBtn.setAttribute('aria-expanded', String(shouldExpand));

      const targetHeight = massagesGrid.scrollHeight;

      massagesGrid.style.maxHeight = `${targetHeight}px`;

      if (shouldExpand) {
        window.setTimeout(() => {
          if (isExpanded && activeFilter) {
            massagesGrid.style.maxHeight = 'none';
          }
        }, 420);
      }
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.filter || 'all';
        isExpanded = false;

        filterButtons.forEach((btn) => {
          const isActive = btn === button;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', String(isActive));
        });

        applyMassagesState({ animate: true });
      });
    });

    massagesToggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      applyMassagesState({ animate: true });
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applyMassagesState({ animate: false });
      }, 120);
    });

    massagesGrid.style.overflow = 'hidden';
    massagesGrid.style.transition = 'max-height 0.42s ease';
    applyMassagesState({ animate: false });
  }

  // ========================================
  // HERO SLIDER - DIOR STYLE
  // ========================================
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.hero-nav-prev');
  const nextBtn = document.querySelector('.hero-nav-next');
  
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 6000; // 6 seconds per slide

  function goToSlide(index) {
    // Remove active class from current slide and indicator
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Update current slide index
    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    // Add active class to new slide and indicator
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function resetSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
  }

  // Initialize slideshow
  if (slides.length > 0) {
    startSlideshow();

    // Navigation arrows
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideshow();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideshow();
      });
    }

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        goToSlide(index);
        resetSlideshow();
      });
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero-dior');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });

      heroSection.addEventListener('mouseleave', () => {
        startSlideshow();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetSlideshow();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetSlideshow();
      }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      heroSlider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      }, { passive: true });
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetSlideshow();
      }
    }
  }


  // ========================================
  // HEALERS CENTER-MODE CAROUSEL
  // ========================================
  const healersCarousel = document.querySelector('[data-healers-carousel]');

  if (healersCarousel) {
    const viewport = healersCarousel.querySelector('.healers-viewport');
    const track = healersCarousel.querySelector('.healers-track');
    const prevHealerBtn = healersCarousel.querySelector('.healers-nav-prev');
    const nextHealerBtn = healersCarousel.querySelector('.healers-nav-next');

    if (viewport && track) {
      const originalSlides = Array.from(track.querySelectorAll('.healer-slide'));
      const totalSlides = originalSlides.length;
      const clonesPerSide = Math.min(3, totalSlides);
      let currentIndex = 0;
      let isAnimating = false;

      const createClone = (slide) => {
        const clone = slide.cloneNode(true);
        clone.classList.add('is-clone');
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      };

      const prepended = originalSlides.slice(-clonesPerSide).map(createClone);
      const appended = originalSlides.slice(0, clonesPerSide).map(createClone);

      prepended.forEach((clone) => track.prepend(clone));
      appended.forEach((clone) => track.append(clone));

      const allSlides = Array.from(track.querySelectorAll('.healer-slide'));
      const baseOffset = clonesPerSide;

      const getLoopDistance = (realIndex, targetIndex) => {
        const direct = targetIndex - realIndex;
        const wrapForward = targetIndex - (realIndex - totalSlides);
        const wrapBackward = targetIndex - (realIndex + totalSlides);
        return [direct, wrapForward, wrapBackward].reduce((best, value) => {
          return Math.abs(value) < Math.abs(best) ? value : best;
        }, direct);
      };

      const computeScale = (distance) => {
        if (distance === 0) return 1;
        if (distance === 1) return 0.9;
        if (distance === 2) return 0.78;
        return 0.66;
      };

      const updateSlideStates = () => {
        allSlides.forEach((slide) => {
          const realIndex = Number(slide.dataset.realIndex || 0);
          const distance = Math.abs(getLoopDistance(realIndex, currentIndex));
          const translateX = getLoopDistance(realIndex, currentIndex) * 10;
          const scale = computeScale(distance);

          slide.style.transform = `translateX(${translateX}px) scale(${scale})`;
          slide.classList.toggle('is-center', distance === 0);
          slide.classList.toggle('is-near', distance === 1);
          slide.classList.toggle('is-outer', distance === 2);
          slide.classList.toggle('is-far', distance >= 3);
        });
      };

      const updateTrackPosition = (shouldAnimate = true) => {
        const activeDomIndex = baseOffset + currentIndex;
        const activeSlide = allSlides[activeDomIndex];
        const viewportWidth = viewport.clientWidth;
        const slideWidth = activeSlide.offsetWidth;
        const offset = activeSlide.offsetLeft - (viewportWidth - slideWidth) / 2;

        track.style.transition = shouldAnimate
          ? 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'none';
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      };

      const normalizeIndex = (shouldAnimate = false) => {
        if (currentIndex >= totalSlides) {
          currentIndex = 0;
          updateTrackPosition(shouldAnimate);
        } else if (currentIndex < 0) {
          currentIndex = totalSlides - 1;
          updateTrackPosition(shouldAnimate);
        }

        updateSlideStates();
      };

      const moveTo = (nextIndex) => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = nextIndex;
        updateSlideStates();
        updateTrackPosition(true);

        window.setTimeout(() => {
          normalizeIndex(false);
          isAnimating = false;
        }, 780);
      };

      const nextHealer = () => moveTo(currentIndex + 1);
      const prevHealer = () => moveTo(currentIndex - 1);

      prevHealerBtn?.addEventListener('click', prevHealer);
      nextHealerBtn?.addEventListener('click', nextHealer);

      let touchStartX = 0;
      viewport.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
      }, { passive: true });

      viewport.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].screenX;
        const delta = touchStartX - touchEndX;
        if (Math.abs(delta) < 50) return;
        if (delta > 0) {
          nextHealer();
        } else {
          prevHealer();
        }
      }, { passive: true });

      window.addEventListener('resize', () => {
        updateTrackPosition(false);
        updateSlideStates();
      });

      updateSlideStates();
      updateTrackPosition(false);
    }
  }

  // ========================================
  // SMOOTH SCROLL
  // ========================================
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  const animatedElements = document.querySelectorAll(
    '.feature-card, .legend-card, .massage-card, .info-block, .quote-block'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });

  // ========================================
  // FORM HANDLING
  // ========================================
  const journeyForm = document.querySelector('.journey-form');
  
  if (journeyForm) {
    journeyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;

      const name = (formData.get('name') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const service = (formData.get('service') || '').toString().trim();
      const message = (formData.get('message') || '').toString().trim();

      const whatsappNumber = '971504715070';
      const whatsappText = [
        'Здравствуйте! Новая заявка с сайта AMARA:',
        `Имя: ${name || '-'}`,
        `Email: ${email || '-'}`,
        `Телефон: ${phone || '-'}`,
        `Услуга: ${service || '-'}`,
        `Комментарий: ${message || '-'}`
      ].join('\n');

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      
      submitBtn.innerHTML = '<span>Thank You!</span>';
      submitBtn.style.background = '#4a9c6d';
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  // ========================================
  // PARALLAX EFFECT FOR HERO
  // ========================================
  const heroContent = document.querySelector('.hero-content-dior');
  
  if (heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    });
  }

  // ========================================
  // CURSOR GLOW EFFECT (DESKTOP ONLY)
  // ========================================
  if (window.matchMedia('(min-width: 1024px)').matches) {
    const glowFollower = document.createElement('div');
    glowFollower.className = 'cursor-glow';
    glowFollower.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(212, 165, 116, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(glowFollower);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glowFollower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      glowFollower.style.opacity = '0';
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glowFollower.style.left = glowX + 'px';
      glowFollower.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  // ========================================
  // PRELOAD IMAGES
  // ========================================
  const imagesToPreload = [
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moroccan-bath-XeSTABgX7qKMFfD8tpaA28jun8mEiK.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hot-stone-ozcMxcP4p2LRpwfWkz6xlxcogUApC0.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deep-tissue-D1EGarHWurusc7dncBgiNhIpKjE5Lf.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/four-hands-Puk08W7r8o1fBXEjfwXtiHEmC1mv6J.jpg',
    'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swedish-massage-C2bJ9ZEZfTErQx0yC2a469A6nhSZVx.jpg'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  console.log('AMARA SPA - All systems initialized');
});
