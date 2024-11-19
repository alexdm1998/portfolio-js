import { useEffect, useRef } from 'react'


/**
 * A custom hook that creates and handles an animation, calling the callback to execute the logic with the progress.
 * @param {Function} animationCB - The Callback function for the animation. It provides one argument, elapsed time, that ranges from 0 to 1.
 * @param {number} duration - Duration in milliseconds. 
 * @param {Function} onFinished - A optional callback that runs once the animation is successfully over.
 * @returns {Function} - The start function with which to initiate the animation.
 */
export const useAnimate = (animationCB, duration, onFinished) => {
  const AnimationRef = useRef(null);


  function start(){
    cancelAnimationFrame(AnimationRef.current);
    AnimationRef.current = requestAnimationFrame(setInitialTime);
  }

  function setInitialTime(timestamp){
    Animation.current = requestAnimationFrame((nextTimestamp) => animate(nextTimestamp, timestamp));
  }

  //The animation loop
  function animate(timestamp, start){
    const elapsed = (timestamp - start) / duration;
    
    //The actual animation logic executes on this Callback
    animationCB(elapsed);
    
    if(elapsed < 1){
      AnimationRef.current = requestAnimationFrame((nextTimestamp) => animate(nextTimestamp, start))
    } else{
      onFinished();
    }
  }




  useEffect(()=>{


    return cancelAnimationFrame(AnimationRef.current);
  },[])


  return start;
}