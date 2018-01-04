/**
 * Dummy elements to make sure mapped areas are correct.
 * @param  {Object}  area
 * @param  {Number}  index
 * @return {Element}
 */
export default function testElement(area, index) {
  let el = document.createElement('div');

  let color;

  if (index % 4 === 0) {
    color = 'red';
  } else if (index % 4 === 1) {
    color = 'green';
  } else if (index % 4 === 2) {
    color = 'blue';
  } else {
    color = 'yellow';
  }

  el.classList.add('VideoColorTracker-TestElement');

  el.style.cssText = 'position: absolute; ' +
    'top: ' + area.top + 'px; ' +
    'left: ' + area.left + 'px; ' +
    'width: ' + area.width + 'px; ' +
    'height: ' + area.height + 'px; ' +
    'background: ' + color + '; ' +
    'opacity: 0.4;';

  return document.body.appendChild(el);
}
