function locoScroll() {
  gsap.registerPlugin(ScrollTrigger);

  

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();


};
locoScroll();

function cursorEfect() {
  let page1Content = document.querySelector('#page1-content');
  let cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      x: dets.x,
      y: dets.y
    })
  });

  page1Content.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 1,
      opacity: 1,
    });
  });

  page1Content.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 0,
      opacity: 0,
    });
  });
};
cursorEfect();

// function page1Animation() {
//   gsap.from("#page1-content h1 span", {
//     y: 100,
//     opacity: 0,
//     rotateX: 60,
//     skewX: 10,
//     scale: 0.9,
//     stagger: 0.25,
//     duration: 1.5,
//     ease: "power4.out",
//   });
// };
// page1Animation();

function page2Animation() {
  // Animate heading + subtitle
  gsap.from("#page2 .elem h1, #page2 .elem .subtitle", {
    y: 50,
    opacity: 0,
    rotateX: 60,
    skewX: 10,
    scale: 0.9,
    stagger: 0.25,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 65%",
      end: "top 10%",
      scrub: 1
    }
  });

  // Animate each feature card
  gsap.from("#page2 .feature-box", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page2 .features",
      scroller: "#main",
      start: "top 90%",   // adjusted
      end: "top 60%",     // adjusted
      scrub: 2
    }
  });

  gsap.from(".about-left img", {
    x: -150,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 70%",
      end: "top 40%",
      scrub: 2
    }
  });

  // Text content from right
  gsap.from(".about-right", {
    x: 150,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 70%",
      end: "top 40%",
      scrub: 2
    }
  });

  // Skills & extra details fade up with stagger
  gsap.from(".about-right p, .skills, .about-extra, .about-buttons", {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.3,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main",
      start: "top 80%",
      end: "top 50%",
      scrub: 2
    }
  });
}
page2Animation();


function page3Animation() {
  // Animate heading h4
  gsap.from("#page3-top h4", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
      trigger: "#page3-top",
      scroller: "#main",
      start: "top 80%",
      end: "top 60%",
      scrub: 1
    }
  });

  // Animate h2 lines (scale + skew + fade + stagger like page2)
  gsap.from("#page3-top h2", {
    y: 100,
    opacity: 0,
    rotateX: 60,
    skewX: 10,
    scale: 0.9,
    stagger: 0.25,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page3-top",
      scroller: "#main",
      start: "top 75%",
      end: "top 20%",
      scrub: 2
    }
  });

  gsap.from("#page3 .service-box", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page3 .services-grid", // ✅ correct trigger
      scroller: "#main",
      start: "top 80%",
      end: "top 50%",
      scrub: 2
    }
  });

  gsap.from("#page3-bottom h1", {
    y: 50,
    opacity: 0,
    rotateX: 60,
    skewX: 10,
    scale: 0.9,
    stagger: 0.25,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page3-bottom",
      scroller: "#main",
      start: "top 85%",
      end: "top 60%",
      scrub: 2
    }
  })

  gsap.from("#page3-bottom h2", {
    y: 100,
    opacity: 0,
    rotateX: 60,
    skewX: 10,
    scale: 0.9,
    stagger: 0.25,
    duration: 1.5,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#page3-bottom",
      scroller: "#main",
      start: "top 75%",
      end: "top 20%",
      scrub: 2
    }
  });

};
page3Animation();

// Page4 Horizontal Scroll Animation
gsap.to("#page4-elements", {
  xPercent: -70 * (document.querySelectorAll(".project-box").length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#page4",
    scroller: "#main", // if using locomotive scroll, keep this
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector("#page4-elements").offsetWidth
  }
});



function swiperAnimation() {
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },

    speed: 800,
    grabCursor: true,

    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1440: { slidesPerView: 4 },
    },
  });
};
swiperAnimation();

let tl = gsap.timeline();

// Loader
tl.from("#loader h1", {
  x: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.2
})
  .to("#loader h1", {
    opacity: 0,
    x: -200,
    duration: 0.8,
    stagger: 0.1
  })
  .to("#loader", {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      document.querySelector("#loader").style.display = "none";
    }
  });

// Page1 intro (runs after loader finishes)
tl.from(".hero-title", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
})
tl.from(".hero-subtitle", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
}, "-=0.6")
tl.to(".hire-me-btn", {
    y: -20,
    scale: 1,
    opacity: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
}, "-=0.4");


function footerAnimation() {
  // Animate footer columns on scroll
  gsap.from("#footer .footer-container > div", {
    y: 100,
    opacity: 0,
    stagger: 0.3,
    duration: 1.2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#footer",
      scroller: "#main",
      start: "top 85%",
      end: "top 50%",
      scrub: 2,
    }
  });

  // Animate footer bottom text
  gsap.from("#footer .footer-bottom p", {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: "#footer",
      scroller: "#main",
      start: "top 90%",
      end: "top 70%",
      scrub: 2,
    }
  });
};
footerAnimation();

function contactFormHandler() {
  const form = document.getElementById("contactForm");
  const successBox = document.getElementById("formSuccess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        form.reset();

        // Show success message with GSAP animation
        successBox.style.display = "block";
        gsap.fromTo(successBox,
          { y: 50, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power4.out" }
        );
      }
    } catch (err) {
      console.error("Error:", err);
    }
  });
}
contactFormHandler();








