gsap.registerPlugin(ScrollTrigger)

const isSmallScreen = () => window.innerWidth <= 640

const initHeroAnimation = () => {
  if (isSmallScreen()) return

  const groups = [
    { sel: ".hero__logo", cfg: { y: -30, scale: 0.85, opacity: 0, ease: "back.out(1.7)" } },
    { sel: ".key", cfg: { y: -30, scale: 0.85, opacity: 0, ease: "back.out(1.7)" }, at: "-=0.6" },
    { sel: ".hero__company-list, .hero__company-item svg", cfg: { y: 20, scale: 0.9, opacity: 0, stagger: 0.08, ease: "back.out(1.7)" }, at: "-=0.6" },
    { sel: ".hero__data-item", cfg: { y: 20, scale: 0.9, opacity: 0, stagger: 0.08, ease: "power2.out" }, at: "-=0.6" },
    { sel: ".hero__text", cfg: { y: 25, scale: 0.9, opacity: 0, ease: "back.out(1.7)" }, at: "-=0.6" }
  ]

  const tl = gsap.timeline()
  groups.forEach(({ sel, cfg, at }) => {
    const els = document.querySelectorAll(sel)
    if (els.length) tl.from(els, { duration: 0.8, ...cfg }, at)
  })
}


const getRatio = (el) => {
  const r = el.getBoundingClientRect()
  const pr = el.parentElement.getBoundingClientRect()
  return {
    x: (r.left - pr.left + r.width / 2) / pr.width,
    y: (r.top - pr.top + r.height / 2) / pr.height
  }
}

const configDisappear = ({ x, y }) => {
  if (x < 0.4) return { x: gsap.utils.random(-120, -80), y: gsap.utils.random(30, 60), scale: 0.97 }
  if (x > 0.6) return { x: gsap.utils.random(80, 120), y: gsap.utils.random(30, 60), scale: 0.97 }
  if (y < 0.4) return { x: gsap.utils.random(-40, 40), y: gsap.utils.random(-120, -80), scale: 0.97 }
  if (y > 0.6) return { x: gsap.utils.random(-40, 40), y: gsap.utils.random(80, 120), scale: 0.97 }
  return { x: 0, y: gsap.utils.random(30, 60), scale: 0.8 }
}

const configAppear = ({ x, y }) => {
  if (x < 0.4) return { x: gsap.utils.random(-120, -80), y: gsap.utils.random(30, 60), scale: 0.8, rotate: gsap.utils.random(-25, -15) }
  if (x > 0.6) return { x: gsap.utils.random(80, 120), y: gsap.utils.random(30, 60), scale: 0.8, rotate: gsap.utils.random(15, 25) }
  if (y < 0.4) return { x: gsap.utils.random(-40, 40), y: gsap.utils.random(-120, -80), scale: 0.8, rotate: gsap.utils.random(-10, 10) }
  if (y > 0.6) return { x: gsap.utils.random(-40, 40), y: gsap.utils.random(80, 120), scale: 0.8, rotate: gsap.utils.random(-10, 10) }
  return { x: 0, y: gsap.utils.random(50, 80), scale: 0.7 }
}

const animateDecor = (els, type, start) => {
  els.forEach((el, i) => {
    const cfg = type === "disappear" ? configDisappear(getRatio(el)) : configAppear(getRatio(el))
    if (type === "disappear") {
      gsap.to(el, {
        ...cfg, opacity: 0, filter: "blur(8px)", ease: "power3.out",
        scrollTrigger: { trigger: el, start, end: "bottom 20%", scrub: 2 },
        delay: i * 0.025
      })
    } else {
      gsap.fromTo(el, { ...cfg, opacity: 0, filter: "blur(12px)" }, {
        x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, filter: "blur(0px)", ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: 1.5 },
        delay: i * 0.05
      })
    }
  })
}

const initDecorScrollAnimation = () => {
  if (isSmallScreen()) return
  const hero = document.querySelectorAll(".hero-decor *")
  const forWhom = document.querySelectorAll(".for-whom-decor .decor *")
  const program = document.querySelectorAll(".program-decor .decor")
  const faq = document.querySelectorAll(".faq-decor .decor")

  if (hero.length) animateDecor(hero, "disappear", "top top")
  if (forWhom.length) animateDecor(forWhom, "disappear", "center 42%")
  if (program.length) animateDecor(program, "disappear", "center 30%")
  if (faq.length) animateDecor(faq, "appear", "top top")
}

// Marquee
const initMarquee = () => {
  const runline = document.querySelector(".marquee__wrapper")
  if (!runline || runline.dataset.cloned) return
  runline.innerHTML += runline.innerHTML
  runline.dataset.cloned = "true"

  const total = runline.scrollWidth / 2
  let pos = -total
  const speed = 0.8

  const loop = () => {
    pos += speed
    if (pos >= 0) pos = -total
    runline.style.transform = `translateX(${pos}px)`
    requestAnimationFrame(loop)
  }
  loop()
}

// Accordion
const initAccordion = () => {
  const items = document.querySelectorAll('.accordion__item')
  items.forEach(item => {
    const btn = item.querySelector('.accordion__button')
    const content = item.querySelector('.accordion__content')
    if (!btn || !content) return
    gsap.set(content, { height: 0 })

    btn.addEventListener('click', () => {
      const open = item.classList.contains('is-open')
      items.forEach(i => {
        i.classList.remove('is-open')
        gsap.to(i.querySelector('.accordion__content'), { height: 0, duration: 0.4, ease: "power2.inOut" })
      })
      if (!open) {
        item.classList.add('is-open')
        gsap.to(content, { height: content.scrollHeight + 20, duration: 0.4, ease: "power2.out" })
      }
    })
  })
}


const initModal = () => {
  const modal = document.querySelector(".modal")
  if (!modal) return
  const header = document.querySelector("header")

  const scrollbarWidth = () => window.innerWidth - document.documentElement.clientWidth

  const openModal = () => {
    const sw = scrollbarWidth()
    modal.classList.add("is-open")
    document.body.style.overflow = "hidden"
    document.body.style.paddingRight = `${sw}px`
    modal.style.paddingRight = `${sw}px`
    if (header) header.style.paddingRight = `${sw}px`
  }

  const closeModal = () => {
    modal.classList.remove("is-open")
    document.body.style.overflow = ""
    document.body.style.paddingRight = ""
    modal.style.paddingRight = ""
    if (header) header.style.paddingRight = ""
  }

  document.querySelectorAll(".form-open").forEach(btn => btn.addEventListener("click", e => {
    e.preventDefault()
    openModal()
  }))

  modal.addEventListener("click", e => { if (e.target === modal) closeModal() })
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal() })
}


document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation()
  initMarquee()
  initAccordion()
  initModal()
  initDecorScrollAnimation()
  ScrollTrigger.refresh()
})

window.addEventListener('resize', () => ScrollTrigger.refresh())
