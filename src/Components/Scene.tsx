import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import SoundReactor from "../Classes/SoundReactor";
//Import 3D Components
import SoundBar from "./SoundBar";
import Lighting from "./Lighting";
import ComponentPhysic from "./ComponentPhysic";
import Pacman from "./Pacman";
import * as THREE from "three";

//Import Postprocessing
import Effects from "./Effects";

const peakThreshold = 180;

const Scene = () => {
  const tempArray = [...Array(256)];
  const colorStartRef = useRef<THREE.MeshBasicMaterial>(null);
  const colorEndRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    if (SoundReactor.playFlag && SoundReactor.fdata) {
      for (let i = 0; i < SoundReactor.fdata.length; i++) {
        const value = SoundReactor.fdata[i];
        if (value > peakThreshold && i > SoundReactor.fdata.length / 4) {
          if (colorStartRef.current != null && colorEndRef.current != null) {
            colorStartRef.current.color = new THREE.Color(
              `rgb(${Math.round(Math.random() * 255)},${Math.round(
                Math.random() * 255
              )},${Math.round(Math.random() * 255)})`
            );

            colorEndRef.current.color = new THREE.Color(
              `rgb(${Math.round(Math.random() * 255)},${Math.round(
                Math.random() * 255
              )},${Math.round(Math.random() * 255)})`
            );
          }
        }
      }
    }
  });

  return (
    <>
      {tempArray.map((element, index) => {
        return (
          <SoundBar
            key={`soundBar${index}`}
            indexPosition={index}
            colorEndRef={colorEndRef}
            colorStartRef={colorStartRef}
          />
        );
      })}
      <meshBasicMaterial ref={colorStartRef} color={"#2C73D2"} />
      <meshBasicMaterial ref={colorEndRef} color={"#00C8A2"} />
      <Lighting />
      <Effects />
      <ComponentPhysic />
      <Pacman />
    </>
  );
};

export default Scene;
