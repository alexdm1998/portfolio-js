/**
 *
 * @param {Element} element The element from which the DOM dimensions will be retrieved
 *
 */

export function getElementDimensions(element) {
  if (!(element instanceof Element)) {
    console.log(element + " isn't an instance of element");
    return undefined;
  }
  if (!element) {
    console.log(element + " isn't a valid value for the operation");
    return undefined;
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


/**
 * 
 * @param {Element} element The element from which the scroll dimensions will be retrieved
 */
export function getElementScroll(element){
  if (!(element instanceof Element)) {
    console.log(element + " isn't an instance of element");
    return undefined;
  }
  if (!element) {
    console.log(element + " isn't a valid value for the operation");
    return undefined;
  }


  const {height: height} = element.getBoundingClientRect();

  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const scrollMax = scrollHeight - height;
  return {scrollTop, scrollHeight, scrollMax}
}
