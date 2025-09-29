gsap.registerPlugin(ScrollTrigger)

const initHeroAnimation = () => {
  const logo = document.querySelectorAll(".hero__logo")
  const key = document.querySelectorAll(".key")
  const companies = document.querySelectorAll(".hero__company-list, .hero__company-item svg")
  const date = document.querySelectorAll(".hero__data-item")
  const description = document.querySelectorAll(".hero__text")

  // Если нет элементов, выходим
  if (logo.length === 0 && key.length === 0 && companies.length === 0 && date.length === 0 && description.length === 0) {
    return
  }

  const tl = gsap.timeline()

  if (logo.length > 0) {
    tl.from(logo, {
      y: -30,
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
  }

  if (key.length > 0) {
    tl.from(key, {
      y: -30,
      scale: 0.85,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.6")
  }

  if (companies.length > 0) {
    tl.from(companies, {
      y: 20,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "back.out(1.7)"
    }, "-=0.5")
  }

  if (date.length > 0) {
    tl.from(date, {
      y: 20,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=0.5")
  }

  if (description.length > 0) {
    tl.from(description, {
      y: 25,
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.4")
  }
}

const initDecorScrollAnimation = () => {
  const heroDecor = document.querySelectorAll(".hero-decor *")
  const otherDecor = document.querySelectorAll(".decor *")
  
  // Если нет элементов, выходим
  if (heroDecor.length === 0 && otherDecor.length === 0) return
  
  const animate = (elements, start) => {
    elements.forEach((el, i) => {
      if (!el || !el.parentElement) return
      
      const parentWidth = el.parentElement.offsetWidth
      const parentHeight = el.parentElement.offsetHeight
      
      if (parentWidth === 0 || parentHeight === 0) return
      
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement.getBoundingClientRect()
      
      const elCenterX = rect.left - parentRect.left + rect.width / 2
      const elCenterY = rect.top - parentRect.top + rect.height / 2
      
      const ratioX = elCenterX / parentWidth
      const ratioY = elCenterY / parentHeight
      
      let config
      
      if (ratioX < 0.4) {
        config = { 
          x: gsap.utils.random(-80, -120), 
          y: gsap.utils.random(30, 60), 
          scale: 0.97, 
          rotate: gsap.utils.random(-8, -15) 
        }
      } else if (ratioX > 0.6) {
        config = { 
          x: gsap.utils.random(80, 120), 
          y: gsap.utils.random(30, 60), 
          scale: 0.97, 
          rotate: gsap.utils.random(8, 15) 
        }
      } else if (ratioY < 0.4) {
        config = { 
          x: gsap.utils.random(-40, 40), 
          y: gsap.utils.random(-80, -120), 
          scale: 0.97, 
          rotate: gsap.utils.random(-5, 5) 
        }
      } else if (ratioY > 0.6) {
        config = { 
          x: gsap.utils.random(-40, 40), 
          y: gsap.utils.random(80, 120), 
          scale: 0.97, 
          rotate: gsap.utils.random(-5, 5) 
        }
      } else {
        config = { 
          x: 0, 
          y: gsap.utils.random(30, 60), 
          scale: 0.8 
        }
      }
      
      gsap.to(el, {
        opacity: 0,
        filter: "blur(8px)",
        ease: "power3.out",
        ...config,
        scrollTrigger: {
          trigger: el,
          start: start,
          end: "bottom 20%",
          scrub: 2,
          toggleActions: "play none none none"
        },
        delay: i * 0.025
      })
    })
  }
  
  if (heroDecor.length > 0) animate(Array.from(heroDecor), "top top")
  if (otherDecor.length > 0) animate(Array.from(otherDecor), "center 25%")
}

const initMarquee = () => {
  const marquee = document.querySelector(".marquee__wrapper")
  if (!marquee) return

  if (marquee.children.length <= 1) {
    marquee.innerHTML += marquee.innerHTML
  }

  let pos = -marquee.scrollWidth / 2
  const speed = 1
  const totalWidth = marquee.scrollWidth / 2

  const animate = () => {
    pos += speed
    if (pos >= 0) pos = -totalWidth
    marquee.style.transform = `translate3d(${pos}px, 0, 0)`
    requestAnimationFrame(animate)
  }

  if (marquee.offsetParent !== null) {
    animate()
  }
}

const initAccordion = () => {
  const accordion = document.querySelector('.accordion')
  if (!accordion) return

  const items = accordion.querySelectorAll('.accordion__item')

  items.forEach(item => {
    const button = item.querySelector('.accordion__button')
    const content = item.querySelector('.accordion__content')

    if (!button || !content) return

    gsap.set(content, { height: 0 })

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open')

      items.forEach(i => {
        if (i !== item || isOpen) {
          i.classList.remove('is-open')
          const c = i.querySelector('.accordion__content')
          if (c) {
            gsap.to(c, { 
              height: 0, 
              duration: 0.3, 
              ease: "power2.inOut",
              overwrite: true 
            })
          }
        }
      })

      if (!isOpen) {
        item.classList.add('is-open')
        const contentHeight = content.scrollHeight + 20
        gsap.fromTo(content,
          { height: 0 },
          {
            height: contentHeight,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
          }
        )
      }
    })
  })
}

const initModal = () => {
  const modal = document.querySelector(".modal")
  if (!modal) return

  const header = document.querySelector("header")

  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth
  }

  document.querySelectorAll(".form-open").forEach(btn => {
    btn.addEventListener("click", event => {
      event.preventDefault()

      const scrollbarWidth = getScrollbarWidth()

      modal.classList.add("is-open")
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      modal.style.paddingRight = `${scrollbarWidth}px`

      if (header) {
        header.style.paddingRight = `${scrollbarWidth}px`
      }
    })
  })

  const closeModal = () => {
    modal.classList.remove("is-open")
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    modal.style.paddingRight = ''

    if (header) {
      header.style.paddingRight = ''
    }
  }

  modal.addEventListener("click", event => {
    if (event.target === modal) {
      closeModal()
    }
  })

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal()
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation()
  initMarquee()
  initAccordion()
  initModal()
})

window.addEventListener('load', () => {
  setTimeout(() => {
    initDecorScrollAnimation()
    ScrollTrigger.refresh()
  }, 100)
})

let resizeTimeout
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    ScrollTrigger.refresh()
  }, 250)
})