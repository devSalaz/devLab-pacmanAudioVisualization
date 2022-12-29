import { Environment } from "@react-three/drei";

const Lighting = () => {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight color={"#5319d1"} intensity={2.5} />
    </>
  );
};

export default Lighting;
