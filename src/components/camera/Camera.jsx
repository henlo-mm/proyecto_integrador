import { useFrame, useThree } from "@react-three/fiber";
import { useAvatar } from "../context/AvatarContext";

function CameraController() {
  const { camera } = useThree();
  const { avatar } = useAvatar();

  useFrame(() => {
    if (avatar.avatarRef?.current) {
      const { x, y, z } = avatar.avatarRef.current.position;
      camera.position.set(x, y + 5, z + 10);
      camera.lookAt(x, y, z);
    }
  });

  return null;
}

export default CameraController;
