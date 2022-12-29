import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import SoundReactor from "../Classes/SoundReactor";
import VertexShader from "../Assets/Shaders/PlaneVertex";
import FragmentShader from "../Assets/Shaders/PlaneFragment";

type GLTFResult = GLTF & {
  nodes: {
    Plane: THREE.Mesh;
  };
};

interface SoundBarProps {
  colorStartRef: React.RefObject<THREE.MeshBasicMaterial>;
  indexPosition: number;
  colorEndRef: React.RefObject<THREE.MeshBasicMaterial>;
}

const SoundBar = ({
  indexPosition,
  colorEndRef,
  colorStartRef,
}: SoundBarProps) => {
  const soundBarRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport, camera } = useThree();

  const planePositionZ = -100;

  const soundBarsQuantity = 256;
  const { nodes } = useGLTF("./models/plane.glb") as unknown as GLTFResult;

  useFrame(() => {
    if (
      soundBarRef.current == null ||
      materialRef.current == null ||
      colorStartRef.current == null ||
      colorEndRef.current == null
    ) {
      return;
    }

    if (SoundReactor.playFlag && SoundReactor.fdata) {
      const { width, height } = viewport.getCurrentViewport(camera, [
        0,
        0,
        soundBarRef.current.position.z,
      ]);

      const soundBarWidth = width / soundBarsQuantity;
      const soundInfo = SoundReactor.fdata[indexPosition] / 255;

      const soundBarHeight = (height / 2) * soundInfo;
      const posY = -height / 2;
      const posX =
        -width / 2 + soundBarWidth / 2 + soundBarWidth * indexPosition;

      soundBarRef.current.scale.set(soundBarWidth, soundBarHeight, 1);
      soundBarRef.current.position.set(posX, posY, planePositionZ);

      const randomColorStart = new THREE.Color(colorStartRef.current.color);
      const randomColorEnd = new THREE.Color(colorEndRef.current.color);

      materialRef.current.uniforms.uColorStart.value = randomColorStart;
      materialRef.current.uniforms.uColorEnd.value = randomColorEnd;
    }
  });

  return (
    <>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          position-x={-10000}
          position-z={planePositionZ}
          ref={soundBarRef}
        >
          <shaderMaterial
            ref={materialRef}
            vertexShader={VertexShader}
            fragmentShader={FragmentShader}
            uniforms={{
              uValue: { value: (indexPosition + 1) / soundBarsQuantity },
              uColorStart: { value: new THREE.Color("#2C73D2") },
              uColorEnd: { value: new THREE.Color("#00C8A2") },
            }}
            transparent
          />
        </mesh>
      </group>
    </>
  );
};

export default SoundBar;
