document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 440) return

  gsap.registerPlugin(ScrollTrigger)

  // --- Анимация элементов hero ---
  const heroElements = document.querySelectorAll("#hero-background svg *")
  const heroIntro = document.querySelectorAll(
    ".hero__logo, .hero__company-item svg, .hero__data-item, .hero__text"
  )

  const animateElements = (elements, config) => {
    if (!elements.length) return
    gsap.from(elements, config)
  }

  animateElements(heroElements, {
    opacity: 0,
    y: () => gsap.utils.random(10, 20),
    scale: () => gsap.utils.random(0.94, 1),
    duration: 1,
    ease: "power3.out",
    stagger: { each: 0.04, from: "start" },
  })

  animateElements(heroIntro, {
    opacity: 0,
    y: () => gsap.utils.random(10, 25),
    scale: () => gsap.utils.random(0.9, 1),
    duration: 1.2,
    ease: "power3.out",
    stagger: { each: 0.1, from: "start" },
  })

const forWhomElements = document.querySelectorAll("#for-whom-background svg *");


gsap.utils.toArray(forWhomElements).forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: gsap.utils.random(20, 50),
    x: gsap.utils.random(-10, 10),
    scale: gsap.utils.random(0.8, 1),
    duration: 2, 
    delay: i * 0.1, 
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: el,
      start: "top 75%", 
      toggleActions: "play none none none",
    },
  });
});



  const runline = document.querySelector(".marquee__wrapper")
  if (runline) {
    runline.innerHTML += runline.innerHTML
    let pos = -runline.scrollWidth / 2
    const speed = 0.8

    const animateMarquee = () => {
      pos += speed
      if (pos >= 0) pos = -runline.scrollWidth / 2
      runline.style.transform = `translate(${pos}px, 0)`
      requestAnimationFrame(animateMarquee)
    }

    animateMarquee()
  }
})
