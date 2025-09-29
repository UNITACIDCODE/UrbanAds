gsap.registerPlugin(ScrollTrigger);

const heroLogoUrban = document.querySelectorAll(".hero__logo");
const heroKeyUrban = document.querySelectorAll(".key");
const heroCompanyLogos = document.querySelectorAll(".hero__company-list, .hero__company-item svg");
const heroDatePlace = document.querySelectorAll(".hero__data-item");
const heroDescription = document.querySelectorAll(".hero__text");
const heroDecorElements = document.querySelectorAll(".hero-decor");


const heroTl = gsap.timeline({ defaults: { opacity: 0, duration: 0.8, ease: "back.out(1.2)" } });

heroKeyUrban
heroTl.from(heroLogoUrban, { y: -20, scale: 0.8 });
heroTl.from(heroKeyUrban, { y: -20, scale: 0.8 },"-=0.6");
heroTl.from(heroCompanyLogos, { y: 10, scale: 0.85, stagger: 0.05 }, "-=0.6");
heroTl.from(heroDatePlace, { y: 15, scale: 0.85, stagger: 0.05, ease: "power1.out" }, "-=0.6");
heroTl.from(heroDescription, { y: 20, scale: 0.8 }, "-=0.5");




const svgs = document.querySelectorAll(".decor svg > *");

svgs.forEach((el, i) => {
  gsap.fromTo(
    el,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    }
  );

  gsap.to(el, {
    y: "-=10",
    ease: "none",
    scrollTrigger: {
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
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
    runline.style.transform = `translateX(${pos}px)`
    requestAnimationFrame(animateMarquee)
  }
  animateMarquee()
}

document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.querySelector('.accordion')
  const items = accordion.querySelectorAll('.accordion__item')

  items.forEach(item => {
    const button = item.querySelector('.accordion__button')
    const content = item.querySelector('.accordion__content')

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open')

      items.forEach(i => {
        i.classList.remove('is-open')
        const c = i.querySelector('.accordion__content')
        c.style.height = 0
      })

      if (!isOpen) {
        item.classList.add('is-open')
        content.style.height = '0px'
        requestAnimationFrame(() => {
          content.style.height = content.scrollHeight + 20 + 'px'
        })
      }
    })
  })
})
