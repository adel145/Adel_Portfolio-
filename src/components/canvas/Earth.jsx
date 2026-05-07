import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const EarthModel = () => {
  const earth = useGLTF(`${import.meta.env.BASE_URL}venice_mask/scene.gltf`);

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" skyColor="#ffffff" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight intensity={2} />
      <primitive object={earth.scene} scale={75} position-y={-3.5} rotation-y={0} />
    </mesh>
  );
};

const EarthCanvas = () => (
  <Canvas
    frameloop="demand"
    gl={{ powerPreference: "high-performance", antialias: true }}
    camera={{
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6],
    }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <EarthModel />
    </Suspense>
  </Canvas>
);

export default EarthCanvas;
