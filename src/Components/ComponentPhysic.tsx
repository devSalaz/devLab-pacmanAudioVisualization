//Import 3D Components
import Paddle from "./Paddle";
import Ball from "./Ball";

//Import PHysics
import { Physics } from "@react-three/cannon";

const ComponentPhysic = () => {
  return (
    <>
      <Physics
        gravity={[0, -30, 0]}
        defaultContactMaterial={{ friction: 0.9, restitution: 1.05 }}
      >
        <Paddle />
        <Ball />
      </Physics>
    </>
  );
};

export default ComponentPhysic;
