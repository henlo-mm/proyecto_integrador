import {useMemo} from "react"

export default function useMovements() {
    const MOVEMENTS = {
        forward: "forward",
        backward: "backward",
        leftward: "leftward",
        rightward: "rightward",
        jump: "jump",
        exit: "exit",
        run: "run",
        attack: "attack"
    }

    const map = useMemo(() => {
        return [
            {name: MOVEMENTS.forward, keys: ["KeyW", "ArrowUp"], description: "ADELANTE >>> W o ↑", teclas: "W o ↑"},
            {name: MOVEMENTS.backward, keys: ["KeyS", "ArrowDown"], description: "ATRAS >>>>>>> S o ↓", teclas: "S o ↓"},
            {name: MOVEMENTS.leftward, keys: ["KeyA", "ArrowLeft"], description: "IZQUIERDA >>> A o ←", teclas: "A o ←"},
            {name: MOVEMENTS.rightward, keys: ["KeyD", "ArrowRight"], description: "DERECHA >>>> D o →", teclas: "D o →"},
            {name: MOVEMENTS.jump, keys: ["Space"], description: "SALTAR >>>>>> ESPACIO", teclas: "ESPACIO"},
            {name: MOVEMENTS.exit, keys: ["Escape"], description: "SALIR >>>>>>> ESC", teclas: "ESC"},
            {name: MOVEMENTS.run, keys: ["KeyZ"], description: "CORRER >>>>> Z", teclas: "Z"},
            {name: MOVEMENTS.attack, keys: ["KeyV"], description: "ATACAR >>>>> V", teclas: "X"},
        ];
    }, []);

    return map;
}