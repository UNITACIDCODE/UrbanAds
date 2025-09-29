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

  // Создаем отдельную временную линию для каждой группы элементов
  const tl = gsap.timeline({
    defaults: {
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    }
  })

  // Устанавливаем начальные стили чтобы избежать мигания
  gsap.set([...elements.logo, ...elements.key, ...elements.companies, ...elements.date, ...elements.description], {
    opacity: 0
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

const initDecorScrollAnimation = () => {
  const heroDecor = document.querySelectorAll(".hero-decor *")
  const otherDecor = document.querySelectorAll(".decor *")
  
  const animate = (elements, start) => {
    gsap.utils.toArray(elements).forEach((el, i) => {
      // Проверяем, что элемент существует и видим
      if (!el || el.offsetParent === null) return
      
      const parentWidth = el.parentElement.offsetWidth
      const parentHeight = el.parentElement.offsetHeight
      
      if (parentWidth === 0 || parentHeight === 0) return
      
      // Получаем позицию элемента относительно родителя
      const rect = el.getBoundingClientRect()
      const parentRect = el.parentElement.getBoundingClientRect()
      
      // Вычисляем позицию центра элемента относительно родителя
      const elCenterX = rect.left - parentRect.left + rect.width / 2
      const elCenterY = rect.top - parentRect.top + rect.height / 2
      
      // Относительные координаты центра (0-1)
      const ratioX = elCenterX / parentWidth
      const ratioY = elCenterY / parentHeight
      
      let config
      
      // Определяем сторону элемента на основе его позиции
      if (ratioX < 0.4) {
        // Левый край → уходит влево
        config = { 
          x: gsap.utils.random(-80, -120), 
          y: gsap.utils.random(30, 60), 
          scale: 0.97, 
          rotate: gsap.utils.random(-8, -15) 
        }
      } else if (ratioX > 0.6) {
        // Правый край → уходит вправо
        config = { 
          x: gsap.utils.random(80, 120), 
          y: gsap.utils.random(30, 60), 
          scale: 0.97, 
          rotate: gsap.utils.random(8, 15) 
        }
      } else if (ratioY < 0.4) {
        // Верхний край → уходит вверх
        config = { 
          x: gsap.utils.random(-40, 40), 
          y: gsap.utils.random(-80, -120), 
          scale: 0.97, 
          rotate: gsap.utils.random(-5, 5) 
        }
      } else if (ratioY > 0.6) {
        // Нижний край → уходит вниз
        config = { 
          x: gsap.utils.random(-40, 40), 
          y: gsap.utils.random(80, 120), 
          scale: 0.97, 
          rotate: gsap.utils.random(-5, 5) 
        }
      } else {
        // Центр → равномерное исчезновение
        config = { 
          x: 0, 
          y: gsap.utils.random(30, 60), 
          scale: 0.8 
        }
      }
      
      // Устанавливаем начальное состояние
      gsap.set(el, {
        opacity: 1,
        filter: "blur(0px)"
      })
      
      const animation = gsap.to(el, {
        opacity: 0,
        filter: "blur(8px)",
        ease: "power3.out",
        ...config,
        scrollTrigger: {
          trigger: el,
          start: start,
          end: "bottom 20%",
          scrub: 2,
          toggleActions: "play reverse play reverse",
          // Предотвращаем баги с пересчетом
          invalidateOnRefresh: true,
          markers: false // убрать в продакшене
        },
        delay: i * 0.025
      })
      
      // Обработчик ошибок
      animation.eventCallback("onInvalidate", () => {
        animation.scrollTrigger?.refresh()
      })
    })
  }
  
  // Запускаем после полной загрузки страницы
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        animate(heroDecor, "top top")
        animate(otherDecor, "center center")
      }, 100)
    })
  } else {
    setTimeout(() => {
      animate(heroDecor, "top top")
      animate(otherDecor, "center center")
    }, 100)
  }
}

const initMarquee = () => {
  const marquee = document.querySelector(".marquee__wrapper")
  if (!marquee) return

  // Проверяем, не дублировали ли уже содержимое
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

  // Запускаем анимацию только если элемент видим
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

    // Устанавливаем начальную высоту
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
              overwrite: true // предотвращает конфликты анимаций
            })
          }
        }
      })

      if (!isOpen) {
        item.classList.add('is-open')
        gsap.fromTo(content,
          { height: 0 },
          {
            height: "auto",
            duration: 0.4,
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
  }, 500)
})

window.addEventListener('resize', () => {
  ScrollTrigger.refresh()
})