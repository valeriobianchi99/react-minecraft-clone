import { useBox } from "@react-three/cannon"
import * as textures from '../images/textures'
import { useCubesStore } from "../hooks/useCubesStore"
import { useState } from "react"

export const Cube = ({ cubeId, position, texture}) => {

    const [ref]= useBox(()=>({
        type: 'Static',
        position
    }))

    const [isHovered, setIsHovered] = useState(false);

    const [addCube, removeCube] = useCubesStore((state)=> [state.addCube, state.removeCube])

    const activeTexture = textures[texture + 'Texture'];

    const handleClickedFace = ({x, y, z}, clickedFace) => {
        switch(clickedFace) {
            case 0: {
                addCube(x + 1, y, z)
                break;
            }
            case 1: {
                addCube(x - 1, y, z)
                break;
            }
            case 2: {
                addCube(x, y + 1, z)
                break;
            }
            case 3: {
                addCube(x, y - 1, z)
                break;
            }
            case 4: {
                addCube(x, y, z + 1)
                break;
            }
            case 5: {
                addCube(x, y, z - 1)
                break;
            }
            default: break;
        }
    }

    return ( 
        <mesh
        onPointerMove={(e)=>{
            e.stopPropagation();
            setIsHovered(true)
        }}
        onPointerOut={(e)=>{
            e.stopPropagation();
            setIsHovered(false)
        }}
        onClick={(e) => {
            e.stopPropagation();
            const clickedFace = Math.floor(e.faceIndex / 2);
            const position = ref.current.position;
            if(e.altKey) {
                removeCube(cubeId);
            } else {
                handleClickedFace(position, clickedFace);
            }
        }} ref={ref}>
            <boxGeometry attach='geometry'/>
            <meshStandardMaterial 
            color={isHovered ? 'grey': 'white'} 
            transparent={true}
            opacity={texture === 'glass' ? 0.7 : 1}
            map={activeTexture} 
            attach='material'/>
        </mesh>
    )
}