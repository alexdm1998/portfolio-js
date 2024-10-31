import {useRef} from 'react'

export const useElementDimensions = (initialisedValue) => {
    const elementRef = useRef(initialisedValue);

    function getDimensions(index){
        if(!elementRef.current){
            console.log("Erererere")
            return defaulDimensions();
        }
        let element;
        if(Array.isArray(elementRef.current)){
            if(index == undefined || index < 0 || elementRef.current.length === 0 || !elementRef.current[index]){
                console.log("Error entry")
                return defaulDimensions();
            }
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


    function defaulDimensions(){
        return {
            top: null,
            left: null,
            bottom: null,
            right: null,
            height: null,
            width: null,
            centerX: null,
            centerY: null,
            scrollTop: null,
            scrollHeight: null,
            scrollMax: null,
        };
    }

  return {elementRef, getDimensions}
}

