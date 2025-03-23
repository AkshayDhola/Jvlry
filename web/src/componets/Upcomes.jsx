import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Jevlry from './Jevlry';

function Upcomes() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas camera={{ fov: 40, position: [0, 0, 50] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        
        <OrbitControls enableZoom={true} enablePan={false} />

        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/brown_photostudio_02_4k.exr"
        />  

        <Jevlry />
      </Canvas>
    </div>
  )
}

export default Upcomes;
