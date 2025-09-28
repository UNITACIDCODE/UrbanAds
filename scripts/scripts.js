gsap.registerPlugin(ScrollTrigger);

const heroLogoUrban = document.querySelectorAll(".hero__logo");
const heroCompanyLogos = document.querySelectorAll(".hero__company-list, .hero__company-item svg");
const heroDatePlace = document.querySelectorAll(".hero__data-item");
const heroDescription = document.querySelectorAll(".hero__text");

const heroTl = gsap.timeline();

heroTl.from(heroLogoUrban, { opacity: 0, y: -10, scale: 0.8, duration: 0.8, ease: "back.out(1.2)" }, "-=1.8");
heroTl.from(heroCompanyLogos, { opacity: 0, y: 10, scale: 0.85, duration: 0.7, ease: "back.out(1.2)", stagger: 0.05 }, "-=1.6");
heroTl.from(heroDatePlace, { opacity: 0, y: 15, scale: 0.85, duration: 0.7, ease: "power1.out", stagger: 0.05 }, "-=1.4");
heroTl.from(heroDescription, { opacity: 0, y: 20, scale: 0.8, duration: 0.8, ease: "back.out(1.2)" }, "-=1.2");

const runline = document.querySelector(".marquee__wrapper");
if (runline) {
  runline.innerHTML += runline.innerHTML;
  let pos = -runline.scrollWidth / 2;
  const speed = 0.8;
  const animateMarquee = () => {
    pos += speed;
    if (pos >= 0) pos = -runline.scrollWidth / 2;
    runline.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(animateMarquee);
  };
  animateMarquee();
}

document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.querySelector('.accordion');
  const items = accordion.querySelectorAll('.accordion__item');

  items.forEach(item => {
    const button = item.querySelector('.accordion__button');
    const content = item.querySelector('.accordion__content');

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach(i => {
        i.classList.remove('is-open');
        const c = i.querySelector('.accordion__content');
        c.style.height = 0;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        content.style.height = '0px';
        requestAnimationFrame(() => {
          content.style.height = content.scrollHeight + 20 + 'px';
        });
      }
    });
  });
});
