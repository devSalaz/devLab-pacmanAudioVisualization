import { useSphere, useBox, usePlane } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap, { Power3 } from "gsap";

const positionZ = -20;

const Ball = () => {
  const { camera, viewport } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [
    0,
    0,
    positionZ,
  ]);
  const { nodes, materials } = useGLTF("./models/kirbyBall.glb");

  const [ref, ballRef] = useSphere(() => ({
    args: [0.5, 32, 32],
    mass: 1,
    position: [0, 0, positionZ],
    rotation: [Math.PI / 8, -Math.PI, 0],
  }));

  const [refWallLeft, wallLeft] = useBox(() => ({
    args: [1, height, 1],
    type: "Kinematic",
    position: [0, 0, positionZ],
  }));

  const [refWallRight, wallRight] = useBox(() => ({
    args: [1, height, 1],
    type: "Kinematic",
    position: [0, 0, positionZ],
  }));

  const [refWallTop, wallTop] = useBox(() => ({
    args: [width, 4, 1],
    type: "Kinematic",
    position: [0, 0, positionZ],
    onCollide: () => {},
  }));

  useFrame(() => {
    wallLeft.position.set(-width / 2 - 0.5, 0, positionZ);
    wallRight.position.set(width / 2 + 0.5, 0, positionZ);
    wallTop.position.set(0, height / 2 + 2, positionZ);
  });

  //Invisible Plane
  usePlane(() => ({
    args: [width, 1, 1],
    position: [0, -height, 0],
    rotation: [-Math.PI / 2, 0, 0],
    onCollide: () => {
      ballRef.position.set(0, 0, positionZ);
      ballRef.velocity.set(0, 0, 0);
      ballRef.angularVelocity.set(0, 0, 0);
      ballRef.mass.set(0);
      ref.current.material.opacity = 0.0;

      gsap.to(ref.current.material, {
        opacity: 1,
        duration: 1,
        ease: Power3.easeOut,
        onComplete() {
          ref.current.material.opacity = 1.0;
          ballRef.mass.set(1);
        },
      });
    },
  }));

  return (
    <>
      {/* Walls */}
      <mesh ref={refWallLeft}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>

      <mesh ref={refWallRight}>
        <boxGeometry args={[1, height, 1]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>

      <mesh ref={refWallTop}>
        <boxGeometry args={[width, 4, 1]} />
        <meshStandardMaterial color="red" transparent opacity={0} />
      </mesh>

      {/* Mesh Ball */}
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        geometry={nodes.KirbyModel.geometry}
        material={materials.Pink_Head}
        material-side={THREE.FrontSide}
        material-transparent={true}
        scale={0.06}
      ></mesh>
    </>
  );
};

export default Ball;
