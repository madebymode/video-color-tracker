/**
 * Get the area of element B that is covered by element A.
 * Based on https://github.com/niklasramo/mezr/blob/bbed309a3a267390f7d763f92b16cddaf7b8ef7e/mezr.js#L839-L859
 * @param  {Element}  a
 * @param  {Element}  b
 * @return {Object}
 */
export default function getOverlap(a, b) {
  let aRect = a.getBoundingClientRect(),
    bRect = b.getBoundingClientRect(),
    x11 = aRect.left,
    y11 = aRect.top,
    x12 = aRect.right,
    y12 = aRect.bottom,
    x21 = bRect.left,
    y21 = bRect.top,
    x22 = bRect.right,
    y22 = bRect.bottom;

  return {
    left: Math.floor(Math.max(0, x21 - x11)),
    top: Math.floor(Math.max(0, y21 - y11)),
    width: Math.floor(Math.max(0, Math.min(x12, x22) - Math.max(x11, x21))),
    height: Math.floor(Math.max(0, Math.min(y12, y22) - Math.max(y11, y21)))
  };
}
