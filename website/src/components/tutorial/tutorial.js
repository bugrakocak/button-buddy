/* eslint-disable no-param-reassign */
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const tutorial = document.getElementById('tutorial');
const videos = document.getElementsByClassName('js-tutorial-video');

const tl = gsap.timeline();

const timingFunction = 'power3.out';

const sectionMaterialMap = {
  s1: {
    videoIndex: 0,
    figureClassName: 'tutorial--figures-1',
  },
  s2: {
    videoIndex: 1,
    figureClassName: 'tutorial--figures-2',
  },
  s3: {
    videoIndex: 2,
    figureClassName: 'tutorial--figures-3',
  },
};

const changeVideo = (label) => {
  Array.from(videos).forEach((video, index) => {
    if (index === sectionMaterialMap[label].videoIndex) {
      video.hidden = false;
      return;
    }
    video.hidden = true;
  });
};

const changeFigures = (label) => {
  const modifierClassIndex = Array.from(tutorial.classList).findIndex((item) =>
    item.includes('--figures'),
  );

  const modifierClass = tutorial.classList.item(modifierClassIndex);
  tutorial.classList.replace(modifierClass, sectionMaterialMap[label].figureClassName);
};

const updateMaterials = () => {
  const label = tl.currentLabel();

  if (label === 's1') {
    changeVideo(label);
    changeFigures(label);
  }

  if (label === 's2') {
    changeVideo(label);
    changeFigures(label);
  }

  if (label === 's3') {
    changeVideo(label);
    changeFigures(label);
  }
};

tl.addLabel('s1')
  .from('.js-tutorial-s1', {
    opacity: 0,
    y: 50,
    duration: 0.2,
    ease: timingFunction,
  })
  .to('.js-tutorial-s1', { opacity: 0, y: -100, duration: 0.2, ease: timingFunction }, '+=0.2')
  .call(updateMaterials)
  .addLabel('s2')
  .from('.js-tutorial-s2', {
    opacity: 0,
    y: 50,
    duration: 0.2,
    ease: timingFunction,
  })
  .to(
    '.js-tutorial-s2',
    {
      opacity: 0,
      y: -100,
      duration: 0.2,
      ease: timingFunction,
    },
    '+=0.2',
  )
  .call(updateMaterials)
  .addLabel('s3')
  .from('.js-tutorial-s3', {
    opacity: 0,
    y: 50,
    duration: 0.2,
    ease: timingFunction,
  })
  .to('.js-tutorial-s3', { opacity: 0, y: -100, duration: 0.2, ease: timingFunction }, '+=0.2')
  .call(updateMaterials);

ScrollTrigger.create({
  animation: tl,
  trigger: '.tutorial',
  start: '-30% top',
  end: '+=2500',
  scrub: 0.5,
});

ScrollTrigger.create({
  trigger: '.tutorial',
  pin: true,
  start: 'top top',
  end: '+=2000',
  scrub: 0.5,
});
/* eslint-enable no-param-reassign */
