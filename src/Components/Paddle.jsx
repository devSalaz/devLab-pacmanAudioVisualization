import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import SoundReactor from "../Classes/SoundReactor";

const args = [2, 0.5, 1];
const paddlePositionZ = -20;

const Paddle = () => {
  const { viewport, camera } = useThree();
  const materialPaddleRef = useRef(null);
  const materialObstacle1Ref = useRef(null);
  const materialObstacle2Ref = useRef(null);

  const [ref, paddleRef] = useBox(() => ({
    args: [2, 0.5, 1],
    onCollide: () => {
      materialPaddleRef.current.color = new THREE.Color(
        `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)})`
      );
    },
  }));

  const [refObstacle1, paddleObstacle1] = useBox(() => ({
    args: [2, 0.5, 1],
    position: [0, 0, paddlePositionZ],
    onCollide: () => {
      materialObstacle1Ref.current.color = new THREE.Color(
        `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)})`
      );
    },
  }));

  const [refObstacle2, paddleObstacle2] = useBox(() => ({
    args: [2, 0.5, 1],
    position: [0, 0, paddlePositionZ],
    onCollide: () => {
      materialObstacle2Ref.current.color = new THREE.Color(
        `rgb(${Math.round(Math.random() * 255)}, ${Math.round(
          Math.random() * 255
        )}, ${Math.round(Math.random() * 255)})`
      );
    },
  }));

  useFrame((state) => {
    const { width, height } = viewport.getCurrentViewport(camera, [
      0,
      0,
      paddlePositionZ,
    ]);

    const posX = state.mouse.x * (width / 2);
    const posY = -height / 2 + height / 10;

    const lerpedX = THREE.MathUtils.lerp(posPaddle.current.x, posX, 0.15);

    const rotZ = (state.mouse.x * Math.PI) / 8;

    paddleRef.position.set(lerpedX, posY, paddlePositionZ);
    paddleRef.rotation.set(0, 0, rotZ);

    paddleObstacle1.position.set(
      (Math.sin(state.clock.elapsedTime / 2) * width) / 2,
      0 + height / 4,
      -20
    );

    paddleObstacle2.position.set(
      (-Math.sin(state.clock.elapsedTime / 2) * width) / 2,
      0 - height / 8,
      -20
    );

    if (SoundReactor.fdata && SoundReactor.playFlag) {
      materialPaddleRef.current.opacity =
        0.5 + (SoundReactor.fdata[0] / 255) * 0.5;

      materialObstacle1Ref.current.opacity =
        0.5 + (SoundReactor.fdata[100] / 255) * 0.5;

      materialObstacle2Ref.current.opacity =
        0.5 + (SoundReactor.fdata[200] / 255) * 0.5;
    }
  });

  const posPaddle = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(
    () =>
      paddleRef.position.subscribe((v) => {
        return (posPaddle.current = new THREE.Vector3(v[0], v[1], v[2]));
      }),
    []
  );

  return (
    <>
      {/* Paddle Obstacles */}
      <mesh ref={refObstacle1}>
        <boxGeometry args={args} />
        <meshPhysicalMaterial
          ref={materialObstacle1Ref}
          roughness={1.0}
          clearcoat={1}
          clearcoatRoughness={0.0}
          transparent
          opacity={1}
          color={"#FF8066"}
        />
      </mesh>

      <mesh ref={refObstacle2}>
        <boxGeometry args={args} />
        <meshPhysicalMaterial
          ref={materialObstacle2Ref}
          roughness={1.0}
          clearcoat={1}
          clearcoatRoughness={0.0}
          transparent
          opacity={1}
          color={"#F9F871"}
        />
      </mesh>

      {/* Paddle Original */}
      <mesh ref={ref} position={[0, 0, paddlePositionZ]}>
        <boxGeometry args={args} />
        <meshPhysicalMaterial
          ref={materialPaddleRef}
          roughness={0.0}
          clearcoat={1}
          clearcoatRoughness={0.0}
          transparent
          opacity={1}
          metalness={0}
          color={"#FF6F91"}
        />
      </mesh>
    </>
  );
};

export default Paddle;
