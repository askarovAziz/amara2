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
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ========================================
  // MASSAGES FILTER TABS
  // ========================================
  const filterButtons = document.querySelectorAll('.massages-filter-btn');
  const massageCards = document.querySelectorAll('#massagesGrid .massage-card');

  if (filterButtons.length > 0 && massageCards.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const activeFilter = button.dataset.filter || 'all';

        filterButtons.forEach((btn) => {
          const isActive = btn === button;
          btn.classList.toggle('active', isActive);
          btn.setAttribute('aria-selected', String(isActive));
        });

        massageCards.forEach((card) => {
          const category = card.dataset.category;
          const shouldShow = activeFilter === 'all' || category === activeFilter;
          card.classList.toggle('is-hidden', !shouldShow);
        });
      });
    });
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
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      // Show success message (in production, send to server)
      const submitBtn = this.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;
      
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
