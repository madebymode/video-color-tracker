// Polyfills
import 'core-js/fn/array/from';
import 'core-js/fn/array/map';

// Helpers
import getOverlap from './lib/getOverlap';
import getAverageColor from './lib/getAverageColor';
import guid from './lib/guid';
import isPlaying from './lib/isPlaying';
import testElement from './lib/testElement';
import throttle from 'lodash.throttle';

const DEBUG = false;

/**
 * TODO:
 * - Configure scaleRatio
 * - Set video with different dimensions
 * - Destroy
 */
module.exports = (function(window, document, undefined) {
  'use strict';

  /**
   * Video Color Tracker.
   * @param {Element}   video
   * @param {NodeList}  elements
   * @constructor
   */
  function VideoColorTracker(video, elements) {
    if (!video || !elements.length) {
      return;
    }

    // Settings
    this.scaleRatio = 0.5; // Throttle the amount of color data processed
    this.delay = 500; // How often new colors should be pulled
    this.opacity = 1; // Opacity of video elements
    this.watchScroll = false; // Watch video
    this.keepWatching = false; // Should video keepWatching?

    // Init
    this.setElements(elements);
    this.setVideo(video);

    // Events
    const remap = () => this.remap();
    window.addEventListener('resize', remap);
    if (this.watchScroll) {
      window.addEventListener('scroll', throttle(remap, 100));
    }
  }

  /**
   * Initialize canvas element.
   * @return {void}
   */
  VideoColorTracker.prototype.getCanvas = function() {
    // Update existing canvas
    if (this.canvas) {
      this.canvas.setAttribute('width', this.canvasWidth);
      this.canvas.setAttribute('height', this.canvasHeight);

      return this.canvas;
    }

    // Create new canvas
    let canvas = document.createElement('canvas');

    if (DEBUG) {
      canvas.style.cssText = 'position: absolute; top: 0; left: 0;';
    } else {
      canvas.style.cssText = 'display: none;';
    }

    canvas.setAttribute('id', `VideoColorTracker-${guid()}`);
    canvas.setAttribute('width', this.canvasWidth);
    canvas.setAttribute('height', this.canvasHeight);

    return document.body.appendChild(canvas);
  };

  /**
   * Set video element.
   * @param {Element}  video
   * @return {VideoColorTracker}
   */
  VideoColorTracker.prototype.setVideo = function(video) {
    this.video = video;
    let videoRect = video.getBoundingClientRect();

    this.canvasWidth = videoRect.width * this.scaleRatio;
    this.canvasHeight = videoRect.height * this.scaleRatio;

    this.canvas = this.getCanvas();
    this.canvasContext = this.canvas.getContext('2d');

    this.remap();

    return this;
  };

  /**
   * Set elements to track colors for.
   * @param {NodeList}  elements
   * @return {VideoColorTracker}
   */
  VideoColorTracker.prototype.setElements = function(elements) {
    this.elements = Array.from(elements);

    return this;
  };

  /**
   * Map areas where elements overlap video.
   * @return {VideoColorTracker}
   */
  VideoColorTracker.prototype.remap = function() {
    let video = this.video;
    let scaleRatio = this.canvasWidth / video.clientWidth;

    if (DEBUG) {
      Array.from(document.querySelectorAll('.VideoColorTracker-TestElement')).forEach(el => el.parentNode.removeChild(el));
    }

    this.areas = this.elements.map((element, index, array) => {
      let area = getOverlap(video, element);

      area.element = element;

      area.top = Math.floor(area.top * scaleRatio);
      area.left = Math.floor(area.left * scaleRatio);
      area.width = Math.floor(area.width * scaleRatio);
      area.height = Math.floor(area.height * scaleRatio);

      if (DEBUG) {
        testElement(area, index);
      }

      return area;
    });

    return this;
  };

  /**
   * Start tracking color changes.
   * @return {void}
   */
  VideoColorTracker.prototype.start = function() {
    this.keepWatching = true;
    this.remap();

    if (isPlaying(this.video)) {
      this.watch();
    } else {
      this.video.addEventListener('play', () => this.watch());
    }

    return this;
  };

  /**
   * Stop tracking color changes.
   * @return {void}
   */
  VideoColorTracker.prototype.stop = function() {
    this.keepWatching = false;

    return this;
  };

  /**
   * Watch video for color changes.
   * @return {VideoColorTracker}
   */
  VideoColorTracker.prototype.watch = function() {
    if (!this.keepWatching) {
      return this;
    }

    let video = this.video,
      canvasWidth = this.canvasWidth,
      canvasHeight = this.canvasHeight,
      canvasContext = this.canvasContext,
      opacity = this.opacity;

    // If the video isn't playing, stop watching
    if (video.paused || video.ended) {
      console.log('i am dead');
      // TODO: How to hook into video quickly enough after transition?
      requestAnimationFrame(() => this.watch());
      // this.video.addEventListener('play', () => this.watch());
      return this;
    }

    // Draw the current frame of the video onto the hidden canvas
    canvasContext.drawImage(video, 0, 0, canvasWidth, canvasHeight);

    // Pull the image data from the canvas
    let imageData = canvasContext.getImageData(0, 0, canvasWidth, canvasHeight).data;

    // Set color for each area based on average color from video
    this.areas.forEach((area, index, array) => {
      let isOutsideOfCanvas = area.left > canvasWidth || area.top > canvasHeight;
      let hasZeroArea = area.width * area.height <= 0;

      if (isOutsideOfCanvas || hasZeroArea) {
        area.element.style.background = area.element.style.background.replace(/[0-9\.]+\)/, '0)');
        return false;
      }

      let imageSlice = canvasContext.getImageData(area.left, area.top, area.width, area.height).data;
      let newRgb = getAverageColor(imageSlice, opacity);

      if (area.element.style.background !== newRgb) {
        area.element.style.background = newRgb;
      }
    });

    // Loop
    setTimeout(() => this.watch(), this.delay);

    return this;
  };

  return VideoColorTracker;

})(window, document);
