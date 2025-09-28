gsap.registerPlugin(ScrollTrigger);

const heroBgElements = document.querySelectorAll(".hero-decor svg *");
const heroLogoUrban = document.querySelectorAll(".hero__logo");
const heroCompanyLogos = document.querySelectorAll(".hero__company-list, .hero__company-item svg");
const heroDatePlace = document.querySelectorAll(".hero__data-item");
const heroDescription = document.querySelectorAll(".hero__text");

const heroTl = gsap.timeline();


heroTl.from(heroBgElements, {
  opacity: 0,
  y: () => gsap.utils.random(15, 30),
  scale: () => gsap.utils.random(0.98, 1.02),
  duration: 0.8,
  ease: "power1.out",
  stagger: 0.02
});

heroTl.add(() => {
  heroBgElements.forEach(el => {
    gsap.to(el, {
      scale: 1.02,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });
}, "<"); 


heroTl.from(heroLogoUrban, { opacity: 0, y: -10, scale: 0.8, duration: 0.8, ease: "back.out(1.2)" }, "-=1.8");
heroTl.from(heroCompanyLogos, { opacity: 0, y: 10, scale: 0.85, duration: 0.7, ease: "back.out(1.2)", stagger: 0.05 }, "-=1.6");
heroTl.from(heroDatePlace, { opacity: 0, y: 15, scale: 0.85, duration: 0.7, ease: "power1.out", stagger: 0.05 }, "-=1.4");
heroTl.from(heroDescription, { opacity: 0, y: 20, scale: 0.8, duration: 0.8, ease: "back.out(1.2)" }, "-=1.2");




document.querySelectorAll(".decor svg path, .decor svg rect, .decor svg g, .decor svg foreignObject")
.forEach(part => {
  gsap.fromTo(part,
    { opacity: 0, scale: 0.95 },
    { 
      opacity: 1, 
      scale: 1, 
      duration: 0.8, 
      ease: "power2.out",
      scrollTrigger: { trigger: part, start: "top 90%", toggleActions: "play none none reverse" },
      onComplete: () => {
        gsap.to(part, { scale: 1.04, duration: 3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }
    }
  );
});


document.querySelectorAll(".decor").forEach((box, i) => {
  gsap.to(box, {
    y: i % 2 === 0 ? 60 : -60,
    ease: "sine.inOut",
    scrollTrigger: { trigger: box, start: "top bottom", end: "bottom top", scrub: true }
  });
});


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


const programItems = document.querySelectorAll('.program__item');
programItems.forEach(item => {
  const textEl = item.querySelector('.program__text');
  textEl.dataset.text = textEl.textContent.trim();
  textEl.textContent = '';
});

function typeText(item, text, speed = 70, keepCursor = false, done) {
  const textEl = item.querySelector('.program__text');
  textEl.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  textEl.appendChild(cursor);
  let i = 0;

  (function typeChar() {
    if (i < text.length) {
      cursor.before(text[i]);
      i++;
      let delay = speed + (Math.random() - 0.5) * 30;
      if (/[,.!?]/.test(text[i - 1])) delay += 80 + Math.random() * 50;
      if (/\s/.test(text[i - 1])) delay += 10 + Math.random() * 20;
      setTimeout(typeChar, Math.max(20, delay));
    } else {
      if (!keepCursor) cursor.remove();
      else cursor.classList.add('blink');
      done?.();
    }
  })();
}

function animateSequentially(elements, index = 0) {
  if (index >= elements.length) return;
  const el = elements[index];
  el.classList.add('visible');
  const text = el.querySelector('.program__text').dataset.text;
  typeText(el, text, 40, index === elements.length - 1, () => animateSequentially(elements, index + 1));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSequentially([...programItems]);
      observer.disconnect();
    }
  });
}, { threshold: 0.3 });

observer.observe(document.querySelector('.program__list'));


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
