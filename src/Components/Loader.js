import { Html } from "@react-three/drei";
import { useProgress } from "@react-three/drei";

const Loader = ({ setLoaded }) => {
  const { loaded, total } = useProgress();
  return (
    <Html>
      <>{setLoaded(Math.floor((loaded / total) * 100) == 100)}</>
    </Html>
  );
};

export default Loader;
