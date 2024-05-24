import {useGLTF} from "@react-three/drei"
import {useFrame} from "@react-three/fiber"
import {RigidBody} from "@react-three/rapier"
import {useRef, useState} from "react"

export default function ContainerIzquierdo({position, offset, rotation, onCollision}) {
    const containerIzquierdoRef = useRef(null)
    const containerIzquierdoBodyRef = useRef(null)
    const [shouldReset, setShouldReset] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isCooldown, setIsCooldown] = useState(false);

    const {nodes, materials} = useGLTF("/assets/models/container/Container.glb");

    const amplitude = 22;
    const speed = 20; // velocidad del movimiento
    const initialPositionX = position[0];
    const limitPositionX = 13; // Límite izquierdo
    const resetPositionX = -16; // Posición de reinicio en x

    useFrame(({clock}) => {
        if (containerIzquierdoBodyRef.current && !shouldReset) {
            const elapsedTime = clock.getElapsedTime() + offset;
            const moveX = initialPositionX + (elapsedTime * speed) % amplitude;

            containerIzquierdoBodyRef.current.setTranslation({
                x: moveX,
                y: containerIzquierdoBodyRef.current.translation().y,
                z: containerIzquierdoBodyRef.current.translation().z,
            }, true);

            // Comprobar si alcanzó el límite izquierdo
            if (moveX >= limitPositionX) {
                setShouldReset(true);
            }
        }

        // Reiniciar si se ha alcanzado el límite y no se está reiniciando actualmente
        if (shouldReset && !isResetting) {
            isResetting = true;
            setTimeout(() => {
                containerIzquierdoBodyRef.current.setTranslation({
                    x: resetPositionX,
                    y: containerIzquierdoBodyRef.current.translation().y,
                    z: containerIzquierdoBodyRef.current.translation().z,
                }, true);
                isResetting = false;
                setShouldReset(false);
            }, 0);
        }
    });

    const handleCollisionEnter = (event) => {
        if (!isCooldown && event.rigidBody.userData.name === "wolverine") {
            console.log("Colisión con caja derecha");
            onCollision();
            setIsCooldown(true);
            setTimeout(() => {
                setIsCooldown(false);
            }, 1000); 
        }
    };

    return (
        <RigidBody ref={containerIzquierdoBodyRef} type="fixed" position={position} onCollisionEnter={handleCollisionEnter}>
            <group ref={containerIzquierdoRef} dispose={null} scale={0.01} rotation={rotation}>
                <group name="Scene">
                    <group name="Rigid">
                        <mesh
                            castShadow
                            receiveShadow
                            geometry={nodes.Container.geometry}
                            material={materials['Material.001']}
                            rotation={[-Math.PI / 2, 0, 0]}
                            scale={[165.535, 607.601, 165.535]}
                        />
                    </group>
                </group>
            </group>
        </RigidBody>
    )
}

useGLTF.preload("/assets/models/container/Container.glb");