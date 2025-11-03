'use client'
import { useState } from "react"
import ColourGalary from "./ColourGalary"
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