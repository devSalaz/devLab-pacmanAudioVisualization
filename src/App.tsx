import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";

//Import Components
import Scene from "./Components/Scene";
import Navbar from "./Components/Navbar";
import MainBody from "./Components/MainBody";
import Loader from "./Components/Loader";

//Import Toast
import { ToastContainer } from "react-toastify";

//Import Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isVisible, setVisible] = useState<boolean>(true);
  const [isLoaded, setLoaded] = useState<boolean>(false);

  const onHandleVisible = (): void => {
    setVisible(!isVisible);
  };

  return (
    <div className="App">
      <div className={`loader-container ${isLoaded ? "hide" : ""}`}>
        <h2>Loading...</h2>
      </div>
      <Navbar onHandleVisible={onHandleVisible} isVisible={isVisible} />
      <MainBody isVisible={isVisible} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="canvas-container">
        <Canvas camera={{ fov: 30 }}>
          <color attach="background" args={["#5319d1"]} />
          <Loader setLoaded={setLoaded} />
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
