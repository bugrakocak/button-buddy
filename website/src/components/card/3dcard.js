import VanillaTilt from 'vanilla-tilt';

const cards = document.querySelectorAll('.js-3d-card');

VanillaTilt.init(cards, {
  reverse: true,
  max: 10,
});
