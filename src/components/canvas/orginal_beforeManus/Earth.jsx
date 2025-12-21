import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"

import CanvasLoader from '../Loader';


const Earth = () => {
  const earth =useGLTF("./venice_mask/scene.gltf")
  return (
    // <primitive
    // object={earth.scene}
    // scale={80}
    // position-y={-2.5}
    // rotation-y={0}/>

    <mesh> 
    {/* מיכל להצגת אובייקטים תלת-ממדיים ותאורות. */}
    
    {/* <hemisphereLight intensity={6} groundColor="black" /> */}
    {/* הוספת תאורת המיספירה עם עוצמה גבוהה וצבע קרקע שחור. */}

    <hemisphereLight intensity={3} groundColor="black" skyColor="#ffffff" />
      
      {/* תאורת כיוונית */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
    
    <pointLight intensity={20} />
    {/* הוספת תאורה נקודתית להארת הסצנה. */}
    
    
  

    <primitive
    object={earth.scene}
    scale={100}
    position-y={-3.5}
    rotation-y={0}/>
    {/* הצגת המודל התלת-ממדי עם קנה מידה, מיקום, וסיבוב המשתנים לפי `isMobile`. */}
  </mesh>
  )
}

const EarthCanvas=()=>{
  return(
    <Canvas 
    
    frameloop="demand"
    gl={{preserveDrawingBuffer:true}}
    camera={{
      fov:45,
      near:0.1,
      far:200,
      position:[-4,3,6]
    }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
        autoRotate
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        />
        <Earth />

      </Suspense>

    </Canvas>
  )
}

export default EarthCanvas