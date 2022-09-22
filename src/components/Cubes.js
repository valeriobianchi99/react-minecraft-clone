import { useCubesStore } from "../hooks/useCubesStore"
import { Cube } from "./Cube";

export const Cubes = () => {
    const [cubes] = useCubesStore((state) => [
        state.cubes
    ])
    return cubes.map(({key, pos, texture}) => {
        return (
            <Cube key={key} cubeId={key} position={pos} texture={texture} />
        )
    })
}