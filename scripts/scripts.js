gsap.registerPlugin(ScrollTrigger)

class AnimationsManager {
  constructor() {
    this.isInitialized = false
    this.previousWidth = window.innerWidth
    this.init()
  }

  init() {
    if (this.isInitialized) return
    
    document.readyState === 'loading' 
      ? document.addEventListener('DOMContentLoaded', () => this.initAllAnimations())
      : this.initAllAnimations()
    
    this.setupEventListeners()
    this.isInitialized = true
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.handleResize())
  }

  handleResize() {
    ScrollTrigger.refresh()
    
    if (this.previousWidth !== window.innerWidth) {
      setTimeout(() => ScrollTrigger.refresh(), 300)
      this.previousWidth = window.innerWidth
    }
  }

  isMobile() {
    return window.innerWidth <= 768
  }

  safeQuerySelectorAll(selector, context = document) {
    try {
      return context.querySelectorAll(selector)
    } catch {
      return []
    }
  }

  initAllAnimations() {
    this.killAllAnimations()
    
    this.initHeroAnimation()
    this.initMarquee()
    this.initAccordion()
    
    !this.isMobile() && this.initDecorAnimations()
    
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  killAllAnimations() {
    ScrollTrigger.getAll().forEach(t => t.kill())
  }

  initHeroAnimation() {
    const elements = [
      { selector: ".hero__logo", y: -30, scale: 0.85 },
      { selector: ".key", y: -30, scale: 0.85, position: "-=0.6" },
      { selector: ".hero__company-list, .hero__company-item svg", y: 20, scale: 0.9, stagger: 0.08, position: "-=0.6" },
      { selector: ".hero__data-item", y: 20, scale: 0.9, stagger: 0.08, position: "-=0.6" },
      { selector: ".hero__text", y: 25, scale: 0.9, position: "-=0.6" }
    ]

    const tl = gsap.timeline()

    elements.forEach(({ selector, position, ...props }) => {
      const els = this.safeQuerySelectorAll(selector)
      els.length && tl.from(els, {
        duration: 0.8,
        opacity: 0,
        ease: "back.out(1.7)",
        ...props
      }, position)
    })
  }

  getElementPositionRatio(el) {
    if (!el.parentElement) return { x: 0.5, y: 0.5 }

    const rect = el.getBoundingClientRect()
    const pRect = el.parentElement.getBoundingClientRect()

    return {
      x: (rect.left - pRect.left + rect.width / 2) / pRect.width,
      y: (rect.top - pRect.top + rect.height / 2) / pRect.height
    }
  }

  getDisappearAnimation({ x, y }) {
    const r = (min, max) => this.randomBetween(min, max)
    
    if (x < 0.4) return { x: r(-120, -80), y: r(30, 60), scale: 0.97 }
    if (x > 0.6) return { x: r(80, 120), y: r(30, 60), scale: 0.97 }
    if (y < 0.4) return { x: r(-40, 40), y: r(-120, -80), scale: 0.97 }
    if (y > 0.6) return { x: r(-40, 40), y: r(80, 120), scale: 0.97 }
    
    return { x: 0, y: r(30, 60), scale: 0.8 }
  }

  getAppearAnimation({ x, y }) {
    const r = (min, max) => this.randomBetween(min, max)
    
    if (x < 0.4) return { x: r(-120, -80), y: r(30, 60), scale: 0.8, rotate: r(-25, -15) }
    if (x > 0.6) return { x: r(80, 120), y: r(30, 60), scale: 0.8, rotate: r(15, 25) }
    if (y < 0.4) return { x: r(-40, 40), y: r(-120, -80), scale: 0.8, rotate: r(-10, 10) }
    if (y > 0.6) return { x: r(-40, 40), y: r(80, 120), scale: 0.8, rotate: r(-10, 10) }
    
    return { x: 0, y: r(50, 80), scale: 0.7 }
  }

  randomBetween(min, max) {
    return gsap.utils.random(min, max)
  }

  initDecorAnimations() {
    const sections = [
      { selector: ".hero-decor *", type: "disappear", start: "center 6%" },
      { selector: ".for-whom-decor .decor *", type: "disappear", start: "center 42%" },
      { selector: ".program-decor .decor", type: "disappear", start: "center 30%" },
      { selector: ".faq-decor .decor", type: "appear", start: "top top" }
    ]

    sections.forEach(({ selector, type, start }) => {
      const els = this.safeQuerySelectorAll(selector)
      els.length && this.animateDecorElements(els, type, start)
    })
  }

  animateDecorElements(els, type, start) {
    els.forEach((el, i) => {
      const pos = this.getElementPositionRatio(el)
      const cfg = type === "disappear" 
        ? this.getDisappearAnimation(pos)
        : this.getAppearAnimation(pos)

      type === "disappear"
        ? this.createDisappearAnimation(el, cfg, start, i)
        : this.createAppearAnimation(el, cfg, i)
    })
  }

  createDisappearAnimation(el, cfg, start, i) {
    gsap.fromTo(el,
      { x: 0, y: 0, scale: 1, opacity: 1, filter: "blur(0px)" },
      {
        ...cfg,
        opacity: 0,
        filter: "blur(8px)",
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          end: "bottom 20%",
          scrub: 2,
          toggleActions: "play none none reverse"
        },
        delay: i * 0.025
      }
    )
  }

  createAppearAnimation(el, cfg, i) {
    gsap.fromTo(el,
      { ...cfg, opacity: 0, filter: "blur(12px)" },
      {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 30%",
          scrub: 1.5
        },
        delay: i * 0.05
      }
    )
  }

  initMarquee() {
    const wrapper = document.querySelector(".marquee__wrapper")
    if (!wrapper || wrapper.dataset.cloned) return

    wrapper.innerHTML += wrapper.innerHTML
    wrapper.dataset.cloned = "true"

    const totalWidth = wrapper.scrollWidth / 2
    let pos = -totalWidth
    const speed = 0.8

    const animate = () => {
      pos += speed
      if (pos >= 0) pos = -totalWidth
      wrapper.style.transform = `translateX(${pos}px)`
      requestAnimationFrame(animate)
    }

    animate()
  }

  initAccordion() {
    const items = this.safeQuerySelectorAll('.accordion__item')
    
    items.forEach(item => {
      const btn = item.querySelector('.accordion__button')
      const content = item.querySelector('.accordion__content')
      
      if (!btn || !content) return

      gsap.set(content, item.classList.contains('is-open') 
        ? { height: 'auto', overflow: 'visible' }
        : { height: 0, overflow: 'hidden' }
      )

      btn.addEventListener('click', () => this.handleAccordionClick(item, content, items))
    })
  }

  handleAccordionClick(clicked, content, all) {
    const isOpen = clicked.classList.contains('is-open')

    all.forEach(item => {
      if (item === clicked && !isOpen) return
      
      item.classList.remove('is-open')
      const c = item.querySelector('.accordion__content')
      c && gsap.to(c, {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => c.style.overflow = 'hidden'
      })
    })

    if (!isOpen) {
      clicked.classList.add('is-open')
      content.style.overflow = 'visible'
      const h = content.scrollHeight + 20
      content.style.overflow = 'hidden'
      
      gsap.to(content, {
        height: h,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => content.style.overflow = 'visible'
      })
    }
  }
}

const animationsManager = new AnimationsManager()
