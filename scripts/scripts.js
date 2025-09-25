document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroBgElements = document.querySelectorAll("#hero-background svg *");
  const heroLogoUrban = document.querySelectorAll(".hero__logo");
  const heroCompanyLogos = document.querySelectorAll(".hero__company-list, .hero__company-item svg");
  const heroDatePlace = document.querySelectorAll(".hero__data-item");
  const heroDescription = document.querySelectorAll(".hero__text");

  const tl = gsap.timeline();


  tl.from(heroBgElements, {
    opacity: 0,
    y: () => gsap.utils.random(15, 30),
    scale: () => gsap.utils.random(0.9, 1),
    duration: 0.8,         
    ease: "power1.out",      
    stagger: { each: 0.02, from: "start" }
  });


  tl.from(heroLogoUrban, {
    opacity: 0,
    y: -10,
    scale: 0.8,
    duration: 0.8,
    ease: "back.out(1.2)"   
  }, "-=1.8"); 



  tl.from(heroCompanyLogos, {
    opacity: 0,
    y: 10,
    scale: 0.85,
    duration: 0.7,
    ease: "back.out(1.2)",
    stagger: { each: 0.05, from: "start" }
  }, "-=1.6");


  tl.from(heroDatePlace, {
    opacity: 0,
    y: 15,
    scale: 0.85,
    duration: 0.7,
    ease: "power1.out",
    stagger: { each: 0.05, from: "start" }
  }, "-=1.4");


  tl.from(heroDescription, {
    opacity: 0,
    y: 20,
    scale: 0.8,
    duration: 0.8,
    ease: "back.out(1.2)"
  }, "-=1.2");


  const forWhomElements = document.querySelectorAll("#for-whom-background svg *, #questions-background svg *");

  gsap.utils.toArray(forWhomElements).forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: gsap.utils.random(30, 60),
      x: gsap.utils.random(-15, 15),
      scale: gsap.utils.random(0.7, 1),
      duration: gsap.utils.random(1, 1.3),
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
  });
});


const initMarquee = () => {
  const runline = document.querySelector(".marquee__wrapper")
  if (!runline) return

  runline.innerHTML += runline.innerHTML

  let position = -runline.scrollWidth / 2
  const speed = 0.8

  const animateMarquee = () => {
    position += speed
    if (position >= 0) position = -runline.scrollWidth / 2
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
      const isActive = item.classList.contains('active')
      items.forEach(i => {
        i.classList.remove('active')
        const c = i.querySelector('.content')
        if (c) c.style.maxHeight = null
      })
      if (!isActive) {
        item.classList.add('active')
        content.style.maxHeight = `${content.scrollHeight + 12}px`
      }
    })
  })
}

initAccordion()
