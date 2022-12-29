import {
  Vignette,
  EffectComposer,
  ChromaticAberration,
  Noise,
  Bloom,
} from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

import * as THREE from "three";

const Effects = () => {
  return (
    <>
      <EffectComposer>
        <Noise premultiply blendFunction={BlendFunction.ADD} />
        <Vignette offset={0.2} darkness={0.6} />
        <ChromaticAberration offset={new THREE.Vector2(0.0008, 0.0008)} />
        <Bloom
          mipmapBlur
          intensity={0.95}
          kernelSize={KernelSize.SMALL}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.025}
        />
      </EffectComposer>
    </>
  );
};

export default Effects;
