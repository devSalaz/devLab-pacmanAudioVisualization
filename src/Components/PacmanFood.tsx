import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import SoundReactor from "../Classes/SoundReactor";
import gsap from "gsap";

interface PacmanFoodProps {
  pacmanGroup: THREE.Group;
  soundIndex: number;
  pacmanMaterial: THREE.MeshStandardMaterial;
}

const pacmanFoodScale = 0.1;

const PacmanFood = ({
  pacmanGroup,
  soundIndex,
  pacmanMaterial,
}: PacmanFoodProps) => {
  const pacmanFoodRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const { camera, viewport } = useThree();

  const getRandomPosition = (): THREE.Vector3 => {
    if (pacmanFoodRef.current == null) {
      return new THREE.Vector3(0, 0, 0);
    }
    const { width, height } = viewport.getCurrentViewport(camera, [
      0,
      0,
      pacmanFoodRef.current.position.z,
    ]);
    const randomX = ((Math.random() - 0.5) * width) / 1.1;
    const randomY = ((Math.random() - 0.5) * height) / 1.1;
    const randomPos = new THREE.Vector3(randomX, randomY, -10);

    return randomPos;
  };

  useFrame(() => {
    if (pacmanFoodRef.current == null || pacmanGroup == undefined) {
      return;
    }

    const distanceBetweenPacman = pacmanGroup.position.distanceTo(
      pacmanFoodRef.current.position
    );

    if (distanceBetweenPacman < 0.4) {
      setRandomPosition();
    }

    if (
      SoundReactor.playFlag &&
      SoundReactor.fdata &&
      materialRef.current != null
    ) {
      materialRef.current.opacity = SoundReactor.fdata[soundIndex] / 255 + 0.3;
    }
  });

  const setRandomPosition = () => {
    if (pacmanFoodRef.current == null) {
      return;
    }

    pacmanFoodRef.current.scale.set(0.0001, 0.0001, 0.0001);

    const randomPosition = getRandomPosition();
    pacmanFoodRef.current.position.set(
      randomPosition.x,
      randomPosition.y,
      randomPosition.z
    );

    animatedPacmanColor();

    animateFood();
  };

  const animatedPacmanColor = () => {
    const randomColor = new THREE.Color(
      `rgb(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
    );
    const t1 = gsap.timeline();
    console.log(pacmanMaterial.color);

    t1.to(pacmanMaterial.color, {
      r: randomColor.r,
      g: randomColor.g,
      b: randomColor.b,
      duration: 0.25,
    });

    t1.to(pacmanMaterial.color, {
      r: 1,
      g: 0.5978,
      b: 0,
      duration: 0.25,
      delay: 0.25,
    });
  };

  const animateFood = () => {
    if (pacmanFoodRef.current == null) {
      return;
    }

    gsap.to(pacmanFoodRef.current.scale, {
      x: pacmanFoodScale,
      y: pacmanFoodScale,
      z: pacmanFoodScale,
      duration: pacmanFoodScale,
      delay: 0.15,
    });
  };

  return (
    <>
      <mesh ref={pacmanFoodRef} position={[0, 0, -10]} scale={pacmanFoodScale}>
        <meshStandardMaterial
          ref={materialRef}
          toneMapped={false}
          color={"#ffffff"}
          roughness={1.0}
          emissive={"#ff2eff"}
          envMapIntensity={20}
          transparent
        />
        <sphereGeometry />
      </mesh>
    </>
  );
};

export default PacmanFood;
