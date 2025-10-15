'use client'
import styles from "./page.module.css";
import { useState } from "react"
import colourGroups from "./colours";

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
                <button className={styles.colourFilter} style={{backgroundColor: "Green"}} onClick={() => handleFilterClick("Green")}/>
                <button className={styles.colourFilter} style={{backgroundColor: "White"}} onClick={() => handleFilterClick("Neutral")}/>
                <button className={styles.colourFilter} style={{backgroundColor: "Blue"}} onClick={() => handleFilterClick("Blue")}/>
              </div>
            </div>
            <div className={styles.filter}>
              <input onChange={handleUpdate} value={textFilter}></input>
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
        <div className={styles.colourDisplay} style={{backgroundColor: currentColour.hex}}>{currentColour.name}</div> 
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