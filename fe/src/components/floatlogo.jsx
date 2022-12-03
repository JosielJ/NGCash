import { Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Ngclogo from "../components/Ngclogo"
import { Suspense, useState, useEffect } from "react";


export default function FloatLogo(){
    return(
        <Canvas className="home-logo-canvas">
                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false}/>
                    <ambientLight intensity={0.3}/>
                    <directionalLight position={[0.5, 1.7, 2]} intensity={-1}/>
                    <directionalLight position={[1.1, 1, -3]} intensity={-1}/>
                    <Suspense fallback={null}>
                        <Float
                        speed={5}
                        rotationIntensity={3}
                        floatIntensity={2}
                        floatingRange={[0.5, 0,]}
                        position={[0, 0, 0]}
                        >
                            <Ngclogo/>
                        </Float>
                    </Suspense>
                </Canvas>
    )
}