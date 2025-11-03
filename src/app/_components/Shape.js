import * as THREE from 'three/webgpu'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";

export default function Shape({colour="#ffffff", shape}){
  const colourValue = new THREE.Color(parseInt ( colour.replace("#","0x"), 16 ));
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
  })

  function renderSwitch() {
    switch(shape){
        case 'cube':
            return <boxGeometry args={[3,3,3]}/>
        case 'tetrahedron':
            return <tetrahedronGeometry attach="geometry" args={[3,0]}/>
        case 'torus':
            return <torusGeometry args={[2,0.66,15,15]} />
    }
  }

  return (
    <mesh ref={ref}> 
        {renderSwitch()}
        <meshStandardMaterial color={colourValue}/>
    </mesh>
  )
}