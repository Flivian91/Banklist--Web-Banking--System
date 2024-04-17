'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('#btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// Open Model Function
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close model Function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(el => {
  el.addEventListener('click', openModal);
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
// Implementing smooth scrolling
btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});
// Implemantion Smooth scrolling
// Using event Delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const link = e.target.closest('.nav__link');
  // Gaurd Class
  if (!link) return;
  const id = link.getAttribute('href');
  document.querySelector(`${id}`).scrollIntoView({ behavior: 'smooth' });
});

// Implementing Tabbed Component Features
tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const click = e.target.closest('.operations__tab');
  if (!click) return;
  // Remove all the active tabs
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // Remove all the active class on content
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  // Add active tab
  click.classList.add('operations__tab--active');
  //Add active content based on clicked component
  document
    .querySelector(`.operations__content--${click.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Function to Mouse over and out
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing "Argument" into haddler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
// Implementing Sticky navigation bar
// const initialTop = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialTop) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Implementing sticky navigation using Intersection API
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
// Creating Intersection Observer APi
const observer = new IntersectionObserver(obsCallback, {
  root: null,
  rootMargin: `-${navHeight}px`,
  threshold: 0,
});
observer.observe(header);

// Implementing Revealing images with intersection API
const allSections = document.querySelectorAll('.section');
// Callback Function
const revealingSection = function (entries, observer) {
  const [entry]= entries;
  if(!entry.isIntersecting)return
  entry.target.classList.remove("section--hidden")
  observer.unobserve(entry.target)
};
// Create the inersection API construtor
const sectionObserver = new IntersectionObserver(revealingSection, {
  root: null,
  threshold: 0.3,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
