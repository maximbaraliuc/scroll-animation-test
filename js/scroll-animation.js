"use strict";

import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

// ----------------------------------------------------------------------------
// scroll animation setup
// ----------------------------------------------------------------------------
// animated cards
// ----------------------------------------------------------------------------

const animatedCards = document.querySelectorAll(".animated-card");
let winWidth = window.innerWidth;
let winHeight = window.innerWidth;
let animateCards = function () {
  if (Math.abs(winWidth - window.innerWidth) < 25 && Math.abs(winWidth - window.innerWidth) != 0) {
    return;
  }
  winWidth = window.innerWidth;
  console.log("go with the setup");
  if (window.innerWidth / window.innerHeight > 1) {
    // Set the animation after the parsing to get all the right dimensions.
    for (let i = 0; i < animatedCards.length - 1; i++) {
      let card = animatedCards[i];
      card.animate(
        {
          height: [`95vw`, `60vw`],
        },
        {
          duration: 10000,
          easing: "linear",
          timeline: new ScrollTimeline({
            scrollOffsets: [
              { target: card, edge: "end", threshold: 0 },
              { target: card, edge: "start", threshold: 0 },
            ],
          }),
        }
      );
    }
  } else {
    for (let i = 0; i < animatedCards.length - 1; i++) {
      let card = animatedCards[i];
      card.animate(
        {
          height: [`100vh`, `80vh`],
        },
        {
          duration: 10000,
          easing: "linear",
          timeline: new ScrollTimeline({
            scrollOffsets: [
              { target: card, edge: "end", threshold: 0 },
              { target: card, edge: "start", threshold: 0 },
            ],
          }),
        }
      );
    }
  }
};

window.addEventListener("resize", animateCards);
window.onload = animateCards;

// ----------------------------------------------------------------------------
// scroll tracker
// ----------------------------------------------------------------------------

let scrollTracker = document.querySelector(".scroll-tracker");
let scrollTrackingTimeline = new ScrollTimeline({
  scrollOffsets: [CSS.percent(0), CSS.percent(100)],
});
scrollTracker.animate(
  {
    transform: ["scaleX(0)", "scaleX(1)"],
  },
  { duration: 1, timeline: scrollTrackingTimeline }
);

// ----------------------------------------------------------------------------
// IntersectionObserver
// ----------------------------------------------------------------------------

const messages = document.querySelectorAll(".card-message");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      // if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 1 }
);

messages.forEach((card) => {
  observer.observe(card);
});
