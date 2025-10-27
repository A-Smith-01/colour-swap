'use client'
import * as THREE from 'three/webgpu'
import { useState, useRef, act } from "react"
import { Canvas, useFrame } from "@react-three/fiber";
import shapes from "../shapes";
import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";
import colours from "../colours";
import ColourSelector from "../_components/ColourSelector";
import Shape from "../_components/Shape";
import ColourButton from '../_components/ColourButton';


export default function Main(){
    const [typeFilter, setTypefilter] = useState([])
    const [colourFilter, setColourFilter] = useState(null)
    let filteredShapes = [...shapes]

    function updateTypeFilter(newFilter){
        if(typeFilter.includes(newFilter)){
            setTypefilter(typeFilter.filter((filter) => filter != newFilter))
        }else{
            setTypefilter([...typeFilter, newFilter])
        }
    }

    function updateColourFilter(colour){
        if(colour == colourFilter){
            setColourFilter(null)
        }else{
            setColourFilter(colour)
        }
    }

    console.log(typeFilter)
    if(typeFilter.length > 0){
        filteredShapes = filteredShapes.filter((shape) => typeFilter.includes(shape.type))
    }

    if(colourFilter){
        filteredShapes = filteredShapes.filter((shape) => {
            return shape.colours.some((colourGroup) => {
                return colourGroup.colours.some((colour) => colour.name == colourFilter.name)
            })
        })
    }

    return (
        <div className={styles.productSelection}>
            <HeroImage/>
            <Filters 
                updateTypeFilter={updateTypeFilter} 
                typeFilter={typeFilter} 
                colourFilter={colourFilter}
                updateColourFilter={updateColourFilter}/>
            <div className={styles.gallary}>
                {filteredShapes.map((shape, idx) => {
                    return (
                        <Item key={idx} item={shape} activeColour={colourFilter}/>
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
            <Image src={"/productImages/cover-image.webp"} alt="" fill={true}/>
            <div>
                <h1>Shapes for Entities</h1>
                <p>Handmade for translating, rotating and everything inbetween</p>
            </div>
        </div>
    )
}

function Item({item, activeColour}){
    const [currentColour, setCurrentColour] = useState(item ? item.colours[0].colours[0] : null)
    if (!item) return;
    const colour = activeColour ? activeColour : currentColour
    const noColours = item.colours.reduce((total, group) => total + group.colours.length, 0);
    const itemColours = item.colours.flatMap(group => group.colours);
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
                            <Shape colour={colour.hex} shape={item.id}/>
                        </mesh>
                    </Canvas>  
                </div>
                <div className="info">
                    <h2>{item.name}</h2>
                    <p>{`£${item.price}`}</p>
                </div>
            </Link>
            <div className={styles.colourSelect}>
                {activeColour ? 
                    <>
                        <div className={styles.smallColourButton}>
                            <ColourButton 
                                currentlySelected={colour} 
                                colour={colour}
                                handleClick={() => null}
                                compact={true}/>
                        </div>
                        <span>{`+ ${noColours-1} colours`}</span>
                    </> 
                : <>{itemColours.map((itemCol, idx) => {
                    return (
                    <div key={idx} className={styles.smallColourButton}>
                        <ColourButton 
                            currentlySelected={itemCol==currentColour} 
                            colour={itemCol} 
                            handleClick={() => setCurrentColour(itemCol)}
                            compact={true}/>
                    </div>
                    )
                })}</>
                }
            </div>
        </div>
    )
}

function Filters({updateTypeFilter, updateColourFilter, typeFilter, colourFilter}){
    const [focus, setFocus] = useState("")

    function handleSelectFilterClick(newFocus){
        focus == newFocus ? setFocus("") : setFocus(newFocus)
    }

    const typeFilterValue = typeFilter.length > 0 ? typeFilter.join(", ") : "All Types"
    const colourFilterValue = colourFilter ? colourFilter.name : "Any Colour"

    return (
        <>
            <div className={styles.filterContainer}>
                <Filter type="Shape type" value={typeFilterValue} handleClick={() => {handleSelectFilterClick("type")}} focused={focus == "type"}/>
                <Filter type="Colour" value={colourFilterValue} handleClick={() => {handleSelectFilterClick("colour")}} focused={focus == "colour"}/>
            </div>
            <div className={styles.filteroptions}>
                {focus ? focus == "type" ? 
                    <TypeFilter updateFilter={updateTypeFilter}/>
                    : <ColourFilter handleClick={updateColourFilter} selected={colourFilter} colours={colours}/>
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
        <ColourSelector 
            colourGroups={colours} 
            handleColourClick={handleClick} 
            currentColour={selected}
            compact={true}/>
    )
}

