import { useThree, useFrame } from '@react-three/fiber';


const Camera = () => {
    const { camera } = useThree();

    useFrame(() => {
      /*   if (playerRef.current) {
            const { x, y, z } = playerRef.current.position;
            camera.position.set(x, y + 2, z - 5);
            camera.lookAt(x, y, z);
        } */
    });

    return null;
};

export default Camera;