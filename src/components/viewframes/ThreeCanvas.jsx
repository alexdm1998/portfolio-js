import styled from "styled-components"
import React from "react"
import {Canvas} from "@react-three/fiber"

const Frame = styled.div`
    position: relative;
    height: 300dvh;
    z-index: 3;
`

const ThreeCanvas = () => {
    return(
        <Frame>
            <Canvas>
            </Canvas>
        </Frame>

    )
}

export default ThreeCanvas