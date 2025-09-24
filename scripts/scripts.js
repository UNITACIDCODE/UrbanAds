  const svgElements = document.querySelectorAll("#hero-background svg *");
  const svgElementsIntro = document.querySelectorAll(
    ".hero__logo, .hero__company-item svg, .hero__data-item, .hero__text"
  );


  gsap.from(svgElements, {
    opacity: 0,
    y: () => gsap.utils.random(10, 20),
    scale: () => gsap.utils.random(0.94, 1),
    duration: 1,
    ease: "power3.out",
    stagger: {
      each: 0.04,
      from: "start"
    }
  })

  gsap.from(svgElementsIntro, {
    opacity: 0,
    y: () => gsap.utils.random(10, 25),
    scale: () => gsap.utils.random(0.9, 1),
    rotation: () => gsap.utils.random(-3, 3),
    duration: 1.2,
    ease: "power3.out",
    stagger: {
      each: 0.1,
      from: "start"
    }
  });