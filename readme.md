# MODE Color Tracker

Get the average color of areas where DOM elements overlap a `video`.

[View Demo](https://madebymode.github.io/mode-color-tracker)

## Example

First, setup a `video` element and some DOM elements that overlap it (e.g., using `position: absolute;`):

```html
<!-- Video -->
<video id="myVideo" autoplay="true" width="640" height="360" loop="true">
  <source src="myVideo.mp4" type="video/mp4">
</video>

<!-- Elements -->
<div class="track-me"></div>
<div class="track-me"></div>
<div class="track-me"></div>
```

Then, initialize the tracker:

```js
import VideoColorTracker from 'mode-color-tracker';

const video = document.getElementById('myVideo');
const elements = document.querySelectorAll('.track-me');
const tracker = new VideoColorTracker(video1, elements);

tracker.start();
```

And voila! You’re color-tracking.
