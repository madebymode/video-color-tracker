/**
 * Check whether a `video` element is currently playing.
 * @see https://stackoverflow.com/a/31133401/1786459
 * @param  {Element}  video
 * @return {Boolean}
 */
export default function isPlaying(video) {
  return !!(video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2);
}
