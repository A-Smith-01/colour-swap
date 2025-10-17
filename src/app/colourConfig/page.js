'use client'
import styles from "./page.module.css";
import { useState, useRef } from "react"
import colourGroups from "./colours";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three/webgpu'
// import { OrbitControls } from '@react-three/drei'

export default function ColourConfig() {
  const [currentColour, setCurrentColour] = useState(colourGroups[0].colours[0])
  const [colourFilter, setColourFilter] = useState(null)
  const [textFilter, setTextFilter] = useState("")

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
    <>
      <ColourDisplay currentColour={currentColour}/>
      <div className={styles.selectionContent}>
        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <ColourFilters handleFilterClick={handleFilterClick} colourFilter={colourFilter}/>
          </div>
          <div className={styles.filter}>
            <TextFilter handleUpdate={handleUpdate} textFilter={textFilter}/>
          </div>
        </div>
        <ColourGalary currentColour={currentColour} colourFilter={colourFilter} textFilter={textFilter} handleClick={handleColourClick}/>
      </div>
      
    </>
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

function ColourFilters({handleFilterClick, colourFilter}){
  return (
    <>
      <p>Filter by colour</p>
      <div className={styles.filterColours}>
        <ColourFilter colour="Green" colourId="Green" colourFilter={colourFilter} handleClick={handleFilterClick}/>
        <ColourFilter colour="lightgrey" colourId="Neutral" colourFilter={colourFilter} handleClick={handleFilterClick}/>
        <ColourFilter colour="Blue" colourId="Blue" colourFilter={colourFilter} handleClick={handleFilterClick}/>
      </div>
    </>
  )
}

function ColourFilter({colour, colourId, colourFilter, handleClick}){
  return <button className={`${styles.colourFilter} ${colourFilter === colourId ? styles.selected : ""}`} style={{backgroundColor: colour}} onClick={() => handleClick(colourId)}/>
}

function TextFilter({handleUpdate, textFilter}){
  return <input onChange={handleUpdate} value={textFilter} placeholder="Search by colour name"></input>
}

function ColourGalary({colourFilter, textFilter, currentColour, handleClick}){
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

  return (
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
                  colour={colour} handleClick={() => handleClick(colour)}
                />
              })}
            </div>
          </div>
        );
      })
      : <p>There are no colours that match your search</p>
      }
    </div>
  )
}

function ColourDisplay({currentColour}){
  return (
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
  )
}