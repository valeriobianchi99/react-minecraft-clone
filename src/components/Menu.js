import { useCubesStore } from "../hooks/useCubesStore"

export const Menu = () =>{
    const [saveWorld, resetWorld, cubes] = useCubesStore((state)=> [state.saveWorld, state.resetWorld, state.cubes]);

    return (
        <div className="menu absolute">
            <button onClick={()=>saveWorld(cubes)}>Save</button>
            <button onClick={()=>resetWorld()}>Reset</button>
        </div>
    )
}