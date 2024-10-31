/**
 *
 * @param {Element} element The element from which the DOM dimensions will be retrieved
 *
 */

export function getElementDimensions(element) {
  if (!(element instanceof Element)) {
    console.log(element + " isn't an instance of element");
    return;
  }
  if (!element) {
    console.log(element + " isn't a valid value for the operation");
    return;
  }

  const {top: top, left: left, height: height, width: width} = element.getBoundingClientRect();

  return {
    top,
    left,
    height,
    width,
    bottom: top + height,
    right: left + width,
    centerX: left + width / 2,
    centerY: top + height / 2,
  };
}
