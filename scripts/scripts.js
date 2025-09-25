document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 440) return

  gsap.registerPlugin(ScrollTrigger)

  const animateElements = (elements, config) => {
    if (!elements.length) return
    gsap.from(elements, config)
  }


  const heroElements = document.querySelectorAll("#hero-background svg *")
  animateElements(heroElements, {
    opacity: 0,
    y: () => gsap.utils.random(10, 20),
    scale: () => gsap.utils.random(0.94, 1),
    duration: 1,
    ease: "power3.out",
    stagger: { each: 0.04, from: "start" },
  })

  const heroIntro = document.querySelectorAll(
    ".hero__logo, .hero__company-item svg, .hero__data-item, .hero__text"
  )
  animateElements(heroIntro, {
    opacity: 0,
    y: () => gsap.utils.random(10, 25),
    scale: () => gsap.utils.random(0.9, 1),
    duration: 1.2,
    ease: "power3.out",
    stagger: { each: 0.1, from: "start" },
  })

  const forWhomElements = document.querySelectorAll(
    "#for-whom-background svg *, #questions-background svg *"
  )

  gsap.utils.toArray(forWhomElements).forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: gsap.utils.random(20, 50),
      x: gsap.utils.random(-10, 10),
      scale: gsap.utils.random(0.8, 1),
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 75%",
        toggleActions: "play reverse play reverse",
      },
    })
  })
})

const initMarquee = () => {
  const runline = document.querySelector(".marquee__wrapper")
  if (!runline) return

  runline.innerHTML += runline.innerHTML

  let position = -runline.scrollWidth / 2
  const speed = 0.8

  const animateMarquee = () => {
    position += speed

    if (position >= 0) {
      position = -runline.scrollWidth / 2
    }

    runline.style.transform = `translateX(${position}px)`
    requestAnimationFrame(animateMarquee)
  }

  animateMarquee()
}

initMarquee()

const initAccordion = () => {
  const items = document.querySelectorAll('.questions__item')

  if (!items.length) return

  items.forEach(item => {
    const button = item.querySelector('.open')
    const content = item.querySelector('.content')

    if (!button || !content) return

    button.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active')

      items.forEach(accordionItem => {
        accordionItem.classList.remove('active')
        const accordionContent = accordionItem.querySelector('.content')
        if (accordionContent) {
          accordionContent.style.maxHeight = null
        }
      })

      if (!isCurrentlyActive) {
        item.classList.add('active')
        content.style.maxHeight = `${content.scrollHeight + 12}px`
      }
    })
  })
}

initAccordion()