import { usePlane } from "@react-three/cannon"
import { groundTexture } from "../images/textures"
import { useCubesStore } from "../hooks/useCubesStore"

export const Ground = () => {
    const [ref] = usePlane(()=>({
        rotation: [-Math.PI/2, 0, 0],
        position: [0, -0.5, 0]
    }))

    const [addCube] = useCubesStore((state)=> [state.addCube])

    groundTexture.repeat.set(100,100);

    return (
        <mesh ref={ref} onClick={
            (e) => {
                e.stopPropagation();
                const [x, y, z] = Object.values(e.point).map(v=>Math.ceil(v))
                addCube(x, y, z)
            }
        }>
            <planeGeometry attach='geometry' args={[100, 100]} />
            <meshStandardMaterial attach='material' map={groundTexture}/>
        </mesh>
    )
}