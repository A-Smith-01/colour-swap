'use client'
import styles from "./page.module.css";
import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three/webgpu'
import { useSearchParams  } from 'next/navigation';
import shapes from "../shapes";
import ColourSelector from "../_components/ColourSelector";
import Shape from "../_components/Shape";
// import { OrbitControls } from '@react-three/drei'

export default function ColourConfig() {
  const searchParams = useSearchParams();
  const data = searchParams.get('id');
  const shape = shapes.find(s => s.id === data);
  const [currentColour, setCurrentColour] = useState(shape.colours[0].colours[0])

  function handleColourClick(colour){
    setCurrentColour(colour)
  }

  return (
    <>
      <ColourDisplay currentColour={currentColour} shape={shape.id}/>
      <div className={styles.selectionContent}>
        <ColourSelector 
          colourGroups={shape.colours} 
          currentColour={currentColour} 
          handleColourClick={handleColourClick}/>
      </div>
    </>
  );
}

function ColourDisplay({currentColour, shape}){
  return (
    <div className={styles.colourDisplay}>
      <h1>{currentColour.name}</h1>
      <div className={styles.canvasContainer}>
        <Canvas>
          <mesh>
            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
            <Shape colour={currentColour.hex} shape={shape}/>
          </mesh>
        </Canvas>  
      </div>
    </div> 
  )
}

function Box({colour}){
  const colourValue = new THREE.Color(parseInt ( colour.replace("#","0x"), 16 ));
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  })

  return (
    <mesh ref={ref}> 
      <boxGeometry args={[3,3,3]}/>
      <meshStandardMaterial color={colourValue}/>
    </mesh>
  )
}