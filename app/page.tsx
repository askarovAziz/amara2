"use client"

import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load external CSS
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '/styles.css'
    document.head.appendChild(link)

    // Load Google Fonts
    const fontLink = document.createElement('link')
    fontLink.rel = 'preconnect'
    fontLink.href = 'https://fonts.googleapis.com'
    document.head.appendChild(fontLink)

    const fontLink2 = document.createElement('link')
    fontLink2.rel = 'preconnect'
    fontLink2.href = 'https://fonts.gstatic.com'
    fontLink2.crossOrigin = 'anonymous'
    document.head.appendChild(fontLink2)

    const fontCSS = document.createElement('link')
    fontCSS.rel = 'stylesheet'
    fontCSS.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&display=swap'
    document.head.appendChild(fontCSS)

    // Load external JS
    const script = document.createElement('script')
    script.src = '/script.js'
    document.body.appendChild(script)

    return () => {
      document.head.removeChild(link)
      document.head.removeChild(fontLink)
      document.head.removeChild(fontLink2)
      document.head.removeChild(fontCSS)
      document.body.removeChild(script)
    }
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Header */}
      <header className="header" id="header">
        <nav className="nav">
          <a href="/" className="logo">
            <span className="logo-text">AMARA</span>
            <span className="logo-subtitle">Oasis of the Eternal Wanderer</span>
            <div className="logo-underline"></div>
          </a>
          
          <div className="nav-links">
            <a href="#sanctuary" className="nav-link">The Sanctuary</a>
            <a href="#rituals" className="nav-link">Rituals</a>
            <a href="#massages" className="nav-link">Massages</a>
            <a href="#healers" className="nav-link">Our Healers</a>
            <a href="#journey" className="nav-link">Begin Your Journey</a>
          </div>

          <button
            className="theme-toggle-btn"
            id="themeToggleBtn"
            type="button"
            aria-label="Switch to light mode"
            aria-pressed="false"
          >
            Dark
          </button>
          
          <a href="#journey" className="cta-button desktop-only">Book Now</a>
          
          <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobileNav">
            <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg className="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </nav>
        
        <div className="mobile-nav" id="mobileNav">
          <a href="#sanctuary" className="mobile-nav-link">The Sanctuary</a>
          <a href="#rituals" className="mobile-nav-link">Rituals</a>
          <a href="#massages" className="mobile-nav-link">Massages</a>
          <a href="#healers" className="mobile-nav-link">Our Healers</a>
          <a href="#journey" className="mobile-nav-link">Begin Your Journey</a>
          <button
            className="theme-toggle-btn mobile-theme-toggle"
            id="mobileThemeToggleBtn"
            type="button"
            aria-label="Switch to light mode"
            aria-pressed="false"
          >
            Dark
          </button>
          <div className="mobile-nav-cta">
            <a href="#journey" className="cta-button-full">Book Your Journey</a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section - Dior Inspired */}
        <section className="hero-dior">
          {/* Background Slider */}
          <div className="hero-slider">
            <div className="hero-slide active" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moroccan-bath-XeSTABgX7qKMFfD8tpaA28jun8mEiK.jpg')"}}>
              <div className="slide-overlay"></div>
            </div>
            <div className="hero-slide" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hot-stone-ozcMxcP4p2LRpwfWkz6xlxcogUApC0.jpg')"}}>
              <div className="slide-overlay"></div>
            </div>
            <div className="hero-slide" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deep-tissue-D1EGarHWurusc7dncBgiNhIpKjE5Lf.jpg')"}}>
              <div className="slide-overlay"></div>
            </div>
            <div className="hero-slide" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/four-hands-Puk08W7r8o1fBXEjfwXtiHEmC1mv6J.jpg')"}}>
              <div className="slide-overlay"></div>
            </div>
            <div className="hero-slide" style={{backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swedish-massage-C2bJ9ZEZfTErQx0yC2a469A6nhSZVx.jpg')"}}>
              <div className="slide-overlay"></div>
            </div>
          </div>

          {/* Animated Particles */}
          <div className="hero-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>

          {/* Main Content */}
          <div className="hero-content-dior">
            <div className="hero-label">
              <span className="label-line"></span>
              <span className="label-text">A Hidden Caravanserai of the Silk Road</span>
              <span className="label-line"></span>
            </div>
            
            <h1 className="hero-title-dior">
              <span className="title-word">AMARA</span>
            </h1>
            
            <p className="hero-tagline">Oasis of the Eternal Wanderer</p>
            
            <div className="hero-description-dior">
              <p>Where time stands still and the spirit discovers<br/>immortal vigor through ancient healing arts</p>
            </div>

            <div className="hero-cta-group">
              <a href="#rituals" className="hero-btn-primary">
                <span>Discover the Journey</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
              <a href="#sanctuary" className="hero-btn-secondary">Enter the Sanctuary</a>
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="hero-indicators">
            <button className="indicator active" data-slide="0" aria-label="Slide 1"></button>
            <button className="indicator" data-slide="1" aria-label="Slide 2"></button>
            <button className="indicator" data-slide="2" aria-label="Slide 3"></button>
            <button className="indicator" data-slide="3" aria-label="Slide 4"></button>
            <button className="indicator" data-slide="4" aria-label="Slide 5"></button>
          </div>

          {/* Navigation Arrows */}
          <button className="hero-nav-arrow hero-nav-prev" aria-label="Previous slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="hero-nav-arrow hero-nav-next" aria-label="Next slide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Scroll Indicator */}
          <div className="scroll-indicator-dior">
            <span>Scroll to Begin</span>
            <div className="scroll-line">
              <div className="scroll-dot"></div>
            </div>
          </div>

          {/* Side Text */}
          <div className="hero-side-text left">Est. 2024</div>
          <div className="hero-side-text right">Dubai, UAE</div>
        </section>

        {/* Legend Section */}
        <section className="legend">
          <div className="legend-bg"></div>
          <div className="legend-glow-left"></div>
          <div className="legend-glow-right"></div>
          <div className="stone-texture"></div>
          <div className="legend-border-outer"></div>
          <div className="legend-border-inner"></div>
          
          <div className="container">
            <div className="legend-icon">
              <svg width="120" height="80" viewBox="0 0 120 80">
                <ellipse cx="60" cy="65" rx="45" ry="12" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M15 65 Q15 30 60 20 Q105 30 105 65" fill="none" stroke="currentColor" strokeWidth="1" />
                <ellipse cx="60" cy="20" rx="25" ry="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                <path d="M50 15 Q45 5 50 -5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                <path d="M60 12 Q55 0 60 -10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                <path d="M70 15 Q75 5 70 -5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              </svg>
              <div className="icon-glow"></div>
            </div>
            
            <span className="section-tag">The Legend of Amara</span>
            
            <h2 className="legend-title">
              <span>Long ago, there existed</span>
              <span className="text-primary italic">a secret caravanserai</span>
              <span>hidden in the endless sands</span>
            </h2>
            
            <div className="legend-text">
              <p className="legend-paragraph">
                Where time itself stood still. Silk Road travelers found it not by map or compass, 
                but by following the sacred scent of rare resins drifting across the desert night.
              </p>
              <p className="legend-paragraph">
                Within those ancient walls of rough stone, beneath ceilings draped in heavy silk, 
                they found refuge from the weariness of years. Antique brass bowls filled with 
                amber and frankincense burned low, casting dancing shadows in the eternal twilight.
              </p>
              <p className="legend-paragraph-highlight">
                And there, in that hidden sanctuary, they discovered what they called 
                <span className="text-primary"> Amara </span>
                — the immortal vigor of spirit that transcends all earthly burdens.
              </p>
            </div>
            
            <div className="legend-divider">
              <div className="divider-line"></div>
              <div className="divider-diamond"></div>
              <div className="divider-line"></div>
            </div>
            
            <div className="legend-cards">
              <div className="legend-card">
                <div className="legend-card-title">Stone</div>
                <p className="legend-card-text">Rough-hewn walls that hold the memories of a thousand journeys</p>
              </div>
              <div className="legend-card">
                <div className="legend-card-title">Silk</div>
                <p className="legend-card-text">Heavy drapes that silence the world beyond our sanctuary</p>
              </div>
              <div className="legend-card">
                <div className="legend-card-title">Brass</div>
                <p className="legend-card-text">Antique bowls where sacred resins burn in eternal vigil</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sanctuary Section */}
        <section id="sanctuary" className="sanctuary">
          <div className="sanctuary-glow"></div>
          <div className="sanctuary-glow-center"></div>
          <div className="stone-texture"></div>
          
          <div className="container">
            <div className="section-header">
              <div className="section-header-line">
                <div className="header-line-left"></div>
                <span className="section-tag">Where Time Stands Still</span>
                <div className="header-line-right"></div>
              </div>
              <h2 className="section-title">The Sanctuary</h2>
              <div className="section-divider">
                <div className="divider-dot"></div>
                <div className="divider-line-long"></div>
                <div className="divider-diamond"></div>
                <div className="divider-line-long"></div>
                <div className="divider-dot"></div>
              </div>
              <p className="section-description">
                Step into a realm where the ancient world embraces you. Our sanctuary recreates 
                the mystical caravanserai where Silk Road travelers discovered restoration beyond measure.
              </p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card" data-index="0">
                <div className="feature-glow"></div>
                <div className="feature-corner tl"></div>
                <div className="feature-corner tr"></div>
                <div className="feature-corner bl"></div>
                <div className="feature-corner br"></div>
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Firelit Ambiance</h3>
                <p className="feature-description">Only lower lighting creates the effect of ancient fires, casting dancing shadows across rough stone walls and heavy silk drapes.</p>
                <span className="feature-detail">Inspired by the campfires that guided weary travelers</span>
              </div>
              
              <div className="feature-card" data-index="1">
                <div className="feature-glow"></div>
                <div className="feature-corner tl"></div>
                <div className="feature-corner tr"></div>
                <div className="feature-corner bl"></div>
                <div className="feature-corner br"></div>
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/>
                    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
                    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
                  </svg>
                </div>
                <h3 className="feature-title">Sacred Aromas</h3>
                <p className="feature-description">The air carries notes of amber, frankincense, and sandalwood — the same scents that guided weary travelers to our sanctuary.</p>
                <span className="feature-detail">Hand-blended from the rarest resins</span>
              </div>
              
              <div className="feature-card" data-index="2">
                <div className="feature-glow"></div>
                <div className="feature-corner tl"></div>
                <div className="feature-corner tr"></div>
                <div className="feature-corner bl"></div>
                <div className="feature-corner br"></div>
                <div className="feature-icon">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                </div>
                <h3 className="feature-title">Timeless Materials</h3>
                <p className="feature-description">Rough stone, heavy silk, and antique brass bowls create an atmosphere where centuries dissolve into a single eternal moment.</p>
                <span className="feature-detail">Each piece sourced from ancient trade routes</span>
              </div>
            </div>
            
            <div className="quote-block">
              <blockquote>
                &ldquo;In the silence of the oasis, surrounded by ancient stone and silk,
                time releases its grip, and the spirit finds its eternal home.&rdquo;
              </blockquote>
              <div className="quote-attribution">
                <div className="quote-line"></div>
                <span>Ancient Proverb</span>
                <div className="quote-line"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Massages Section */}
        <section id="massages" className="massages-section">
          <div className="massages-bg"></div>
          <div className="massages-glow-top"></div>
          <div className="massages-glow-bottom"></div>
          <div className="stone-texture"></div>

          <div className="container">
            <div className="section-header">
              <div className="section-header-line">
                <div className="header-line-left"></div>
                <span className="section-tag">The Art of Touch</span>
                <div className="header-line-right"></div>
              </div>
              <h2 className="section-title">Our Massages</h2>
              <div className="section-divider">
                <div className="divider-dot"></div>
                <div className="divider-line-long"></div>
                <div className="divider-diamond"></div>
                <div className="divider-line-long"></div>
                <div className="divider-dot"></div>
              </div>
              <p className="section-description">
                Each treatment is a passage through time, drawing on ancient healing wisdom from the Silk Road to restore body, mind and spirit.
              </p>
            </div>

            {/* Massages bento grid */}
            <div className="massages-grid" id="massagesGrid">

              {/* Classic Massage */}
              <div className="massage-card massage-card-large" data-category="massage">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hot-stone-ozcMxcP4p2LRpwfWkz6xlxcogUApC0.jpg" alt="Classic Massage at Amara Spa" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">Signature</div>
                  <h3 className="massage-card-title">Classic Massage</h3>
                  <p className="massage-card-desc">A timeless journey through the body&apos;s landscape. Traditional long strokes melt tension accumulated through countless miles of travel.</p>
                  <div className="massage-pricing">
                    <div className="price-row"><span className="price-duration">1h</span><span className="price-amount">525 AED</span></div>
                    <div className="price-row"><span className="price-duration">1h 30m</span><span className="price-amount">700 AED</span></div>
                    <div className="price-row"><span className="price-duration">2h</span><span className="price-amount">925 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

              {/* Deep Tissue */}
              <div className="massage-card" data-category="massage">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/deep-tissue-D1EGarHWurusc7dncBgiNhIpKjE5Lf.jpg" alt="Deep Tissue Massage" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">Intensive</div>
                  <h3 className="massage-card-title">Deep Tissue</h3>
                  <p className="massage-card-desc">Penetrating pressure reaches the deepest layers of muscle, releasing chronic tension held for years.</p>
                  <div className="massage-pricing">
                    <div className="price-row"><span className="price-duration">1h</span><span className="price-amount">600 AED</span></div>
                    <div className="price-row"><span className="price-duration">1h 30m</span><span className="price-amount">850 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

              {/* Moroccan Bath */}
              <div className="massage-card" data-category="body">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moroccan-bath-XeSTABgX7qKMFfD8tpaA28jun8mEiK.jpg" alt="Moroccan Bath" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">Traditional</div>
                  <h3 className="massage-card-title">Moroccan Bath</h3>
                  <p className="massage-card-desc">An ancient purification ritual with black soap and rhassoul clay, leaving skin silken and spirit renewed.</p>
                  <div className="massage-pricing">
                    <div className="price-row"><span className="price-duration">1h 30m</span><span className="price-amount">750 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

              {/* Couple Massage — wide card */}
              <div className="massage-card massage-card-wide" data-category="massage">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/couple-massage-eQCI4LJu1wMQY76rCsfQ5gD9EAH6ag.jpg" alt="Couple Massage" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">For Two</div>
                  <h3 className="massage-card-title">Couple Massage</h3>
                  <p className="massage-card-desc">Share the sanctuary together. Two healers work in harmony while you and your partner rediscover the art of shared serenity.</p>
                  <div className="massage-pricing massage-pricing-row">
                    <div className="price-row"><span className="price-duration">1h</span><span className="price-amount">1,050 AED</span></div>
                    <div className="price-row"><span className="price-duration">1h 30m</span><span className="price-amount">1,500 AED</span></div>
                    <div className="price-row"><span className="price-duration">2h</span><span className="price-amount">2,100 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

              {/* Four Hands */}
              <div className="massage-card" data-category="massage">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/four-hands-Puk08W7r8o1fBXEjfwXtiHEmC1mv6J.jpg" alt="Four Hands Massage" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">Premium</div>
                  <h3 className="massage-card-title">Four Hands</h3>
                  <p className="massage-card-desc">Two therapists move in choreographed harmony, creating a symphony of touch that transcends ordinary massage.</p>
                  <div className="massage-pricing">
                    <div className="price-row"><span className="price-duration">1h</span><span className="price-amount">1,100 AED</span></div>
                    <div className="price-row"><span className="price-duration">1h 30m</span><span className="price-amount">1,600 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

              {/* Jacuzzi & Scrub */}
              <div className="massage-card" data-category="wellness">
                <div className="massage-card-image">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sauna-steam-rGXLOYcE9onf08rOa2yp5vFC4b2fLZ.jpg" alt="Jacuzzi & Scrub" loading="lazy" />
                  <div className="massage-image-overlay"></div>
                  <div className="massage-image-shine"></div>
                </div>
                <div className="massage-card-content">
                  <div className="massage-card-tag">Wellness</div>
                  <h3 className="massage-card-title">Jacuzzi & Scrub</h3>
                  <p className="massage-card-desc">Immerse in therapeutic waters followed by an invigorating body scrub with Dead Sea salts and aromatic oils.</p>
                  <div className="massage-pricing">
                    <div className="price-row"><span className="price-duration">1h</span><span className="price-amount">450 AED</span></div>
                  </div>
                  <a href="#journey" className="massage-book-btn">
                    <span>Book Now</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </a>
                </div>
                <div className="massage-card-glow"></div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact/Journey Section */}
        <section id="journey" className="journey-section">
          <div className="journey-bg"></div>
          <div className="journey-glow"></div>
          <div className="stone-texture"></div>
          
          <div className="container">
            <div className="section-header">
              <div className="section-header-line">
                <div className="header-line-left"></div>
                <span className="section-tag">Begin Your Transformation</span>
                <div className="header-line-right"></div>
              </div>
              <h2 className="section-title">Your Journey Awaits</h2>
              <div className="section-divider">
                <div className="divider-dot"></div>
                <div className="divider-line-long"></div>
                <div className="divider-diamond"></div>
                <div className="divider-line-long"></div>
                <div className="divider-dot"></div>
              </div>
              <p className="section-description">
                Step through our doors and leave the modern world behind. The ancient sanctuary of Amara awaits.
              </p>
            </div>

            <div className="journey-content">
              <div className="journey-info">
                <div className="info-block">
                  <h3>Location</h3>
                  <p>The Oasis Tower, Level 5<br/>Downtown Dubai, UAE</p>
                </div>
                <div className="info-block">
                  <h3>Hours</h3>
                  <p>Daily: 10:00 AM - 10:00 PM<br/>Last appointment: 8:00 PM</p>
                </div>
                <div className="info-block">
                  <h3>Contact</h3>
                  <p>+971 4 XXX XXXX<br/>sanctuary@amara-spa.com</p>
                </div>
              </div>
              
              <form className="journey-form">
                <div className="form-group">
                  <input type="text" id="name" placeholder="Your Name" required />
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="tel" id="phone" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select id="service">
                    <option value="">Select a Treatment</option>
                    <option value="classic">Classic Massage</option>
                    <option value="deep-tissue">Deep Tissue</option>
                    <option value="moroccan">Moroccan Bath</option>
                    <option value="couple">Couple Massage</option>
                    <option value="four-hands">Four Hands</option>
                    <option value="jacuzzi">Jacuzzi & Scrub</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea id="message" placeholder="Special requests or preferred time..." rows={4}></textarea>
                </div>
                <button type="submit" className="form-submit">
                  <span>Book Your Journey</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">AMARA</span>
              <p className="footer-tagline">Oasis of the Eternal Wanderer</p>
            </div>
            <div className="footer-links">
              <a href="#sanctuary">The Sanctuary</a>
              <a href="#massages">Treatments</a>
              <a href="#journey">Book Now</a>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="18" cy="6" r="1"/>
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Amara Spa. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
