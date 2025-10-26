import ColourButton from "./ColourButton"

export default function ColourGalary({colourGroups, colourFilter, textFilter, currentColour, handleClick, compact}){
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