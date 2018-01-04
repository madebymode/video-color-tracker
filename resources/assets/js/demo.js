import VideoColorTracker from './VideoColorTracker';
import Draggable from 'js-draggable';

const video1 = document.getElementById('video-1');
const video2 = document.getElementById('video-2');
const elements = document.querySelectorAll('.track-me');
const tracker = new VideoColorTracker(video1, elements);

tracker.start();



// ------------------------------
// Demo: Draggable
// ------------------------------

const dragMe = Array.from(document.querySelectorAll('.drag-me')).map(el => {
  return (new Draggable(el))
    .on('move', () => tracker.remap());
});



// ------------------------------
// Demo: Swap Videos
// ------------------------------

const swapVideoButton = document.getElementById('swap-video');

const hide = (video) => {
  video.pause();
  video.classList.remove('active');
};
const show = (video) => {
  video.classList.add('active');
  video.play();
};

swapVideoButton.addEventListener('click', (event) => {
  event.preventDefault();

  if (video1.classList.contains('active')) {
    hide(video1);
    show(video2);
    setTimeout(() => tracker.setVideo(video2), 350);
  } else {
    hide(video2);
    show(video1);
    setTimeout(() => tracker.setVideo(video1), 350);
  }
});
