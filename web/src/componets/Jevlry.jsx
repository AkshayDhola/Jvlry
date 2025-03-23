import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from 'three';
function Jevlry() {
    const model = useGLTF("./ring.glb");
    return (
        <group position={[0, 0, 0]}> {/* Keep this at (0,0,0) */}
            <primitive object={model.scene} scale={[0.1, 0.1, 0.1]}/>
        </group>
    );
}

export default Jevlry;
