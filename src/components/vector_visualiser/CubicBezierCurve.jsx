import React, { useEffect, useState } from 'react'
import { TetherPoint } from './TetherPoint'
import { DraggablePoint } from './DraggablePoint'
import styled from 'styled-components'

const SvgBezier = styled.svg`
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
`

/**
 * 
 * A `CubicBezierCurve` needs two `TetherPoint` and their child `DraggablePoint` to create a cubic bezier curve.
 * 
 */
export const CubicBezierCurve = ({mousePosition, extremityPoints = [{cx:0, cy:0}, {cx:100, cy:100}], controlPoints = [{cx:0, cy:55.228}, {cx:44.772, cy:100}]}) => {
    const [extremityPositions, setExtremetyPositions] = useState(extremityPoints);
    const [controlPositions, setControlPositions] = useState(controlPoints);

    const [bezierPath, setBezierPath] = useState(null);

    function onChangeFirstMember(identifier, position){
       if(identifier == "DraggablePoint"){
        const newVal = [position, extremityPositions[1]]
        setExtremetyPositions(newVal);
       }
       if(identifier == "TetherPoint"){
        const newVal = [position, controlPositions[1]]
        setControlPositions(newVal);
       }
    }

    function onChangeSecondMember(identifier, position){
        if(identifier == "DraggablePoint"){
            const newVal = [extremityPositions[0], position]
            setExtremetyPositions(newVal);
        }
        if(identifier == "TetherPoint"){
            const newVal = [controlPositions[0], position]
            setControlPositions(newVal);
        }
    }


    useEffect(() => {
        const bezierPathString = calculateBezierCurve();
        setBezierPath(bezierPathString)
    },[extremityPositions, controlPositions])


    function calculateBezierCurve(){
        return `M${extremityPositions[0].cx} ${extremityPositions[0].cy} C${controlPositions[0].cx} ${controlPositions[0].cy}, ${controlPositions[1].cx} ${controlPositions[1].cy}, ${extremityPositions[1].cx} ${extremityPositions[1].cy}`
    }



  return (
    <>
        <TetherPoint mousePosition={mousePosition} showLink cx={controlPoints[0].cx} cy={controlPoints[0].cy} onChange={onChangeFirstMember}>
            <DraggablePoint cx={extremityPoints[0].cx} cy={extremityPoints[0].cy}/>
        </TetherPoint>
        <TetherPoint mousePosition={mousePosition} showLink cx={controlPoints[1].cx} cy={controlPoints[1].cy} onChange={onChangeSecondMember}>
            <DraggablePoint cx={extremityPoints[1].cx} cy={extremityPoints[1].cy}/>
        </TetherPoint>
        {bezierPath && <SvgBezier>
                <path d={bezierPath} stroke="blue" fill="transparent"></path>
        </SvgBezier>}
    </>
  )
}