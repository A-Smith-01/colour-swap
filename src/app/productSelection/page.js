'use client'
import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three/webgpu'
import shapes from "../shapes";
import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";
import colours from "../colours";


export default function Main(){
    const [typeFilter, setTypefilter] = useState([])
    let filteredShapes = [...shapes]

    function updateTypeFilter(newFilter){
        if(typeFilter.includes(newFilter)){
            setTypefilter(typeFilter.filter((filter) => filter != newFilter))
        }else{
            setTypefilter([...typeFilter, newFilter])
        }
    }
    console.log(typeFilter)
    if(typeFilter.length > 0){
        filteredShapes = filteredShapes.filter((shape) => typeFilter.includes(shape.type))
    }

    return (
        <div className={styles.productSelection}>
            <HeroImage/>
            <Filters updateTypeFilter={updateTypeFilter} typeFilter={typeFilter}/>
            <div className={styles.gallary}>
                {filteredShapes.map((shape, idx) => {
                    return (
                        <Item key={idx} item={shape} />
                    )
                })}
                <Item />
            </div>
        </div>
    )
}

function HeroImage(){
    return (
        <div className={styles.heroImage}>
            <Image src={"/productImages/cover-image.webp"} alt="" width={1400} height={600}/>
            <div>
                <h1>Shapes for Entities</h1>
                <p>Handmade for translating, rotating and everything inbetween</p>
            </div>
        </div>
    )
}

function Item({item}){
    if (!item) return;
    return (
        <div className="Item">
            <Link href={{
                pathname: '/productPage',
                query: { id: item.id }
            }}>
                <div className="image">
                    <Canvas>
                        <mesh>
                            <ambientLight intensity={Math.PI / 2} />
                            <spotLight position={[30, 30, 30]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
                            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
                            <Shape colour={"#ffffff"} shape={item.id}/>
                        </mesh>
                    </Canvas>  
                </div>
                <div className="info">
                    <h2>{item.name}</h2>
                        <p>{item.price}</p>
                        <div className="colour-select">
                            <div className="colour-button"></div>
                            <span>+x more colours</span>
                        </div>
                </div>
            </Link>
        </div>
    )
}

function Filters({updateTypeFilter, updateColourFilter, typeFilter}){
    const [focus, setFocus] = useState("")

    function handleSelectFilterClick(newFocus){
        focus == newFocus ? setFocus("") : setFocus(newFocus)
    }

    const typeFilterValue = typeFilter.length > 0 ? typeFilter.join(", ") : "All Types"

    return (
        <>
            <div className={styles.filterContainer}>
                <Filter type="Shape type" value={typeFilterValue} handleClick={() => {handleSelectFilterClick("type")}} focused={focus == "type"}/>
                <Filter type="Colour" value={"Any Colour"} handleClick={() => {handleSelectFilterClick("colour")}} focused={focus == "colour"}/>
            </div>
            <div className={styles.filteroptions}>
                {focus ? focus == "type" ? 
                    <TypeFilter updateFilter={updateTypeFilter}/>
                    : <ColourFilter handleClick={updateColourFilter}/>
                    : <p>Showing a few shapes</p>
                }
            </div>
        </>
    )
}

function Filter({type, value, handleClick, focused}){
    return (
        <div className={`${styles.filter} ${focused ? styles.focused : ""}`}>
            <p>{type}</p>
            <button onClick={handleClick}>
                <span>{value}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                    <path d="M9 18l6-6-6-6"></path>
                </svg>
            </button>
        </div>
    )
}

function TypeFilter({updateFilter}){
    return (
        <>
            <CheckButton name={"Polyhedron"} handleClick={() => updateFilter("Polyhedron")}/>
            <CheckButton name={"Not Polyhedron"} handleClick={() => updateFilter("Not Polyhedron")}/>
        </>
    )
}

function CheckButton({name, handleClick}){
    const [checked, setChecked] = useState(false)

    function handleClickandCheck(){
        setChecked(!checked)
        handleClick()
    }

    return (
        <button className={styles.checkButton} onClick={handleClickandCheck}>
            <div className={styles.checkbox}>
                {checked ? <div className={styles.checkmark}>&#10003;</div> : null}
            </div>
            <span>{name}</span>
        </button>
    )
}

function ColourFilter({colours, handleClick, selected}){
    return (
        <></>
    )
}

function Shape({colour="#ffffff", shape}){
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