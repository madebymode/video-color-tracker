# Video Color Tracker

Get the average color of areas where DOM elements overlap a `video`.

[View Demo](https://madebymode.github.io/video-color-tracker)

## Install

```
npm i video-color-tracker --save
```

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
import VideoColorTracker from 'video-color-tracker';

const video = document.getElementById('myVideo');
const elements = document.querySelectorAll('.track-me');
const tracker = new VideoColorTracker(video, elements);

tracker.start();
```

And voila! You’re color-tracking.

## API

### Properties

- `.scaleRatio`: Canvas to video scale. Smaller scale = less data to process, better performance. _Default: `0.5`_
- `.delay`: How often new colors should be pulled, in milliseconds. _Default: `500`_

### Methods

- `.start()`: Start tracking color changes.
- `.stop()`: Stop tracking color changes.
- `.remap()`: Update areas where elements overlap video.
- `.setVideo(video)`: Update video to track.
- `.setElements(elements)`: Update elements to track colors for.
