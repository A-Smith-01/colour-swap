'use client'
import styles from "./page.module.css";
import { useState, useRef } from "react"
import colourGroups from "./colours";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three/webgpu'
// import { OrbitControls } from '@react-three/drei'

export default function Home() {
  const [currentColour, setCurrentColour] = useState(colourGroups[0].colours[0])
  const [colourFilter, setColourFilter] = useState(null)
  const [textFilter, setTextFilter] = useState("")

  let filteredColours = colourGroups.map(group => ({ ...group, colours: [...group.colours] }))
  
  // Apply colour filter (keep only matching groups)
  if (colourFilter) {
    filteredColours = filteredColours.filter(group => group.class === colourFilter)
  }

  // Apply text filter
  if (textFilter) {
    const q = textFilter.toLowerCase()
    filteredColours = filteredColours.map(group => {
      return { ...group, colours: group.colours.filter(colour => colour.name.toLowerCase().includes(q)) }
    })
  }

  // Remove empty colour groups
  filteredColours = filteredColours.filter(group => group.colours.length > 0)

  function handleColourClick(colour){
    setCurrentColour(colour)
  }

  function handleFilterClick(colour){
    if(colour == colourFilter){
      setColourFilter(null)
      setTextFilter("")
    }else{
      setColourFilter(colour)
      setTextFilter("")
    }
  }

  function handleUpdate(e){
    setTextFilter(e.target.value)
  }

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.selectionContent}>
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <p>Filter by colour</p>
              <div className={styles.filterColours}>
                <button className={`${styles.colourFilter} ${colourFilter === `Green` ? styles.selected : ""}`} style={{backgroundColor: "Green"}} onClick={() => handleFilterClick("Green")}/>
                <button className={`${styles.colourFilter} ${colourFilter === `Neutral` ? styles.selected : ""}`} style={{backgroundColor: "White"}} onClick={() => handleFilterClick("Neutral")}/>
                <button className={`${styles.colourFilter} ${colourFilter === `Blue` ? styles.selected : ""}`} style={{backgroundColor: "Blue"}} onClick={() => handleFilterClick("Blue")}/>
              </div>
            </div>
            <div className={styles.filter}>
              <input onChange={handleUpdate} value={textFilter} placeholder="Search by colour name"></input>
            </div>
          </div>
          <div>
            {filteredColours.length > 0 ? filteredColours.map((colourGroup) => {
              return (
                <div key ={colourGroup.class} className={styles.colourOptions}>
                  <h1>{colourGroup.class}</h1>
                  <div className={styles.colourSelect}>
                    {colourGroup.colours.map((colour) => {
                      return <ColourButton 
                        key={colour.hex} 
                        currentlySelected={colour==currentColour} 
                        colour={colour} handleClick={() => handleColourClick(colour)}
                      />
                    })}
                  </div>
                </div>
              );
            })
            : <p>There are no colours that match your search</p>
            }
          </div>
        </div>
        <div className={styles.colourDisplay}>
          <h1>{currentColour.name}</h1>
          <div className={styles.canvasContainer}>
            <Canvas>
              <mesh>
                <ambientLight intensity={Math.PI / 2} />
                <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                <Box colour={currentColour.hex}/>
              </mesh>
            </Canvas>  
          </div>
        </div> 
      </div>
    </div>
  );
}

function ColourButton({currentlySelected, colour, handleClick}){
  return (
    <button className={styles.colourButton} onClick={handleClick}>
      <div className={`${styles.colourBlock} ${currentlySelected ? styles.selected : ""}`} style={{backgroundColor: colour.hex}}/>
      <p>{colour.name}</p>
    </button>
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