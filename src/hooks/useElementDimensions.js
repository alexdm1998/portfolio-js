import {useRef} from 'react'

export const useElementDimensions = () => {
    const elementRef = useRef(null);

    function getDimensions(){
        if(!elementRef.current) return null;
        const {
            top:top,
            left:left,
            height: height,
            width:width} = elementRef.current.getBoundingClientRect();
        const bottom = top + height;
        const right = left + width;
        const centerX = left + width/2;
        const centerY = top + height/2;

        return {top, left, bottom, right, height, width, centerX, centerY}
    }

  return {elementRef, getDimensions}
}

