'use client'
import { useState } from "react"
import '../_styles/colourSelector.css'

export default function ColourSelector({colourGroups, currentColour, handleColourClick, compact}){
  const [colourFilter, setColourFilter] = useState(null)
  const [textFilter, setTextFilter] = useState("")

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
    <div className={"selectionContent"}>
      <div className={"filterContainer"}>
        <div className={"filter"}>
          <ColourFilters handleFilterClick={handleFilterClick} colourFilter={colourFilter}/>
        </div>
        <div className={"filter"}>
          <TextFilter handleUpdate={handleUpdate} textFilter={textFilter}/>
        </div>
      </div>
      <ColourGalary 
        colourGroups={colourGroups} 
        currentColour={currentColour} 
        colourFilter={colourFilter} 
        textFilter={textFilter} 
        handleClick={handleColourClick}
        compact={compact}/>
    </div>
  )
}

function ColourFilters({handleFilterClick, colourFilter}){
  return (
    <>
      <p>Filter by colour</p>
      <div className={"filterColours"}>
        <ColourFilter colour="Green" colourId="Green" colourFilter={colourFilter} handleClick={handleFilterClick}/>
        <ColourFilter colour="lightgrey" colourId="Neutral" colourFilter={colourFilter} handleClick={handleFilterClick}/>
        <ColourFilter colour="Blue" colourId="Blue" colourFilter={colourFilter} handleClick={handleFilterClick}/>
      </div>
    </>
  )
}

function ColourFilter({colour, colourId, colourFilter, handleClick}){
  return <button className={`${"colourFilter"} ${colourFilter === colourId ? "selected" : ""}`} style={{backgroundColor: colour}} onClick={() => handleClick(colourId)}/>
}

function TextFilter({handleUpdate, textFilter}){
  return <input onChange={handleUpdate} value={textFilter} placeholder="Search by colour name"></input>
}

function ColourGalary({colourGroups, colourFilter, textFilter, currentColour, handleClick, compact}){
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
    <div className={`${compact ? "colourGalaryCompact" : "colourGalary"}`}>
      {filteredColours.length > 0 ? filteredColours.map((colourGroup) => {
        return (
            <div key ={colourGroup.class} className={`${compact ? "compactGroup" : "colourOptions"}`}>
                {compact ? 
                <ColourGroup 
                    colourGroup={colourGroup} 
                    currentColour={currentColour} 
                    handleClick={handleClick}/>
                :
                <>
                    <h1>{colourGroup.class}</h1>
                    <div className={"colourSelect"}>
                        <ColourGroup 
                        colourGroup={colourGroup} 
                        currentColour={currentColour} 
                        handleClick={handleClick}/>
                    </div>
                </>
                }
            </div>
        );
      })
      : <p>There are no colours that match your search</p>
      }
    </div>
  )
}

function ColourGroup({colourGroup, currentColour, handleClick}){
    return (
        <>
            {colourGroup.colours.map((colour) => {
                return <ColourButton 
                    key={colour.hex} 
                    currentlySelected={colour==currentColour} 
                    colour={colour} handleClick={() => handleClick(colour)}
                />
            })}
        </>
    )
}

function ColourButton({currentlySelected, colour, handleClick}){
  return (
    <button className={"colourButton"} onClick={handleClick}>
      <div className={`${"colourBlock"} ${currentlySelected ? "selected" : ""}`} style={{backgroundColor: colour.hex}}/>
      <p>{colour.name}</p>
    </button>
  )
}