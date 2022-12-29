import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

//Import 3D Components
import PacmanFood from "./PacmanFood";

const pacmanPosition = -10;

const lookFrontVector = new THREE.Vector3(0, 0, 5);

const Pacman = () => {
  const groupRef = useRef();
  const meshRef = useRef(null);
  const { nodes, materials, animations } = useGLTF(
    "./models/pacman_animated3.glb"
  );
  const { actions } = useAnimations(animations, groupRef);
  const { viewport, camera } = useThree();

  useEffect(() => {
    const action = actions.Eating;
    action.play();
  }, []);

  useFrame((state) => {
    const { width, height } = viewport.getCurrentViewport(camera, [
      0,
      0,
      groupRef.current.position.z,
    ]);

    const posX = state.mouse.x * (width / 2);
    const posY = state.mouse.y * (height / 2) - groupRef.current.scale.x;

    const lerpedX = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      posX,
      0.05
    );
    const lerpedY = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      posY,
      0.05
    );

    const currentVector = new THREE.Vector3(
      groupRef.current.position.x,
      groupRef.current.position.y,
      pacmanPosition
    );
    const lerpedVector = new THREE.Vector3(lerpedX, lerpedY, pacmanPosition);

    const distanceBetweenVector = currentVector.distanceTo(lerpedVector);

    const ultimateVector = new THREE.Vector3(posX, posY, pacmanPosition);
    const vectorToLookAt =
      distanceBetweenVector < 0.00001 ? lookFrontVector : ultimateVector;
    groupRef.current.position.set(lerpedX, lerpedY, pacmanPosition);

    const interpolatedVector = vectorToLookAt
      .clone()
      .lerp(lookFrontVector, 0.05);

    groupRef.current.lookAt(interpolatedVector);
  });

  return (
    <>
      <group ref={groupRef} scale={0.35} position={[0, 0, pacmanPosition]}>
        <group name="Sketchfab_Scene">
          <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
            <group
              name="b6d5103afa454127a46ff4e177a0541ffbx"
              rotation={[Math.PI / 2, 0, 0]}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group
                    name="Pac_man002"
                    rotation={[Math.PI, 0, Math.PI]}
                    scale={1}
                  />
                  <group
                    name="Arma����o"
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={1}
                  >
                    <group name="Object_6">
                      <primitive object={nodes._rootJoint} />
                      <group
                        name="Object_8"
                        rotation={[Math.PI, 0, Math.PI]}
                        scale={1}
                      />
                      <skinnedMesh
                        ref={meshRef}
                        name="Object_9"
                        geometry={nodes.Object_9.geometry}
                        material={materials.Pacman}
                        skeleton={nodes.Object_9.skeleton}
                      />
                      <skinnedMesh
                        name="Object_10"
                        geometry={nodes.Object_10.geometry}
                        material={materials.Negro}
                        skeleton={nodes.Object_10.skeleton}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
      <PacmanFood
        pacmanGroup={groupRef.current}
        soundIndex={0}
        pacmanMaterial={materials.Pacman}
      />
      <PacmanFood
        pacmanGroup={groupRef.current}
        soundIndex={50}
        pacmanMaterial={materials.Pacman}
      />
      <PacmanFood
        pacmanGroup={groupRef.current}
        soundIndex={100}
        pacmanMaterial={materials.Pacman}
      />
      <PacmanFood
        pacmanGroup={groupRef.current}
        soundIndex={150}
        pacmanMaterial={materials.Pacman}
      />
    </>
  );
};

export default Pacman;
