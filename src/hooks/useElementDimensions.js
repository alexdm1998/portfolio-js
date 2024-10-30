import {useRef} from 'react'

export const useElementDimensions = (initialisedValue) => {
    const elementRef = useRef(initialisedValue);

    function getDimensions(index){
        if(!elementRef.current) return null;
        let element;
        if(Array.isArray(elementRef.current)){
            if(index == undefined) return null;
            if(index < 0) return null;
            element = elementRef.current[index];
        }else{
            element = elementRef.current;
        }
        const { top:top, left:left, height: height, width:width} = element.getBoundingClientRect();
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const scrollMax = scrollHeight - height;
        return {top, left, bottom: top + height, right: left + width, height, width, centerX: left + width/2, centerY: top + height/2, scrollTop, scrollHeight, scrollMax}
    }

  return {elementRef, getDimensions}
}

