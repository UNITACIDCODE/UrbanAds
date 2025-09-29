gsap.registerPlugin(ScrollTrigger)

const initHeroAnimation = () => {
  const elements = {
    logo: document.querySelectorAll(".hero__logo"),
    key: document.querySelectorAll(".key"),
    companies: document.querySelectorAll(".hero__company-list, .hero__company-item svg"),
    date: document.querySelectorAll(".hero__data-item"),
    description: document.querySelectorAll(".hero__text")
  }

  if (!elements.logo.length) return

  const tl = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }
  })

  tl.from(elements.logo, { y: -30, scale: 0.85 })
    .from(elements.key, { y: -30, scale: 0.85 }, "-=0.6")
    .from(elements.companies, {
      y: 20,
      scale: 0.9,
      stagger: 0.08
    }, "-=0.5")
    .from(elements.date, {
      y: 20,
      scale: 0.9,
      stagger: 0.08,
      ease: "power2.out"
    }, "-=0.5")
    .from(elements.description, { y: 25, scale: 0.9 }, "-=0.4")
}

const initSvgStrokeAnimation = () => {
  const svg = document.querySelector(".hero-decor svg")
  if (!svg) return

  const paths = svg.querySelectorAll("path, rect, foreignObject > path")

  paths.forEach((el, i) => {
    const length = el.getTotalLength?.() || (el.getBBox().width + el.getBBox().height) * 2

    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    gsap.to(el, {
      strokeDashoffset: 0,
      duration: 4,
      delay: i * 0.15,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1,
    })

    gsap.to(el, {
      opacity: 0.6,
      duration: 4,
      delay: i * 0.15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  })
}

const initDecorScrollAnimation = () => {
  const decorElements = document.querySelectorAll(".decor svg > *, .hero-decor svg > *")

  decorElements.forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 15%",
          toggleActions: "play none none reverse"
        }
      }
    )
  })
}

const initMarquee = () => {
  const marquee = document.querySelector(".marquee__wrapper")
  if (!marquee) return

  marquee.innerHTML += marquee.innerHTML

  let pos = -marquee.scrollWidth / 2
  const speed = 1
  const totalWidth = marquee.scrollWidth / 2

  const animate = () => {
    pos += speed
    if (pos >= 0) pos = -totalWidth
    marquee.style.transform = `translate3d(${pos}px, 0, 0)`
    requestAnimationFrame(animate)
  }

  animate()
}

const initAccordion = () => {
  const accordion = document.querySelector('.accordion')
  if (!accordion) return

  const items = accordion.querySelectorAll('.accordion__item')

  items.forEach(item => {
    const button = item.querySelector('.accordion__button')
    const content = item.querySelector('.accordion__content')

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open')

      items.forEach(i => {
        if (i !== item || isOpen) {
          i.classList.remove('is-open')
          const c = i.querySelector('.accordion__content')
          gsap.to(c, { height: 0, duration: 0.3, ease: "power2.inOut" })
        }
      })

      if (!isOpen) {
        item.classList.add('is-open')
        gsap.fromTo(content,
          { height: 0 },
          {
            height: content.scrollHeight + 20,
            duration: 0.4,
            ease: "power2.out"
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

initHeroAnimation()
initSvgStrokeAnimation()
initDecorScrollAnimation()
initMarquee()
initAccordion()
initModal()