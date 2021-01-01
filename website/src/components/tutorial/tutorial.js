import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const video = document.getElementsByClassName('js-tutorial-video')[0];
const videoSource = video.getElementsByTagName('source')[0];

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.tutorial',
    pin: true,
    start: 'top top',
    end: '+=7000',
    scrub: 1,
  },
});

function changeVideo(videoName) {
  videoSource.src = `img/${videoName}.mp4`;
  video.load();
}

function videoController() {
  const label = tl.currentLabel();

  if (label === 's1') {
    changeVideo('v1');
  }

  if (label === 's2') {
    changeVideo('v2');
  }

  if (label === 's3') {
    changeVideo('v3');
  }
}

tl.addLabel('s1')
  .from('.js-tutorial-s1', {
    opacity: 0,
    y: -50,
    duration: 0.1,
  })
  .to('.js-tutorial-s1', { opacity: 0, y: 100, duration: 0.2 }, '+=0.2')
  .call(videoController)
  .addLabel('s2')
  .from('.js-tutorial-s2', {
    opacity: 0,
    y: -100,
    duration: 0.2,
  })
  .to(
    '.js-tutorial-s2',
    {
      opacity: 0,
      y: 100,
      duration: 0.2,
    },
    '+=0.2',
  )
  .call(videoController)
  .addLabel('s3')
  .from('.js-tutorial-s3', {
    opacity: 0,
    y: -100,
    duration: 0.2,
  })
  .to('.js-tutorial-s3', { opacity: 0, y: 50, duration: 0.2 }, '+=0.2')
  .call(videoController);
