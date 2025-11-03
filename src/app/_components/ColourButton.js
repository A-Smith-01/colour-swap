import "../_styles/colourButton.css"

export default function ColourButton({currentlySelected, colour, handleClick, compact}){
  return (
    <button className={"colourButton"} onClick={handleClick}>
      <div className={`${"colourBlock"} ${currentlySelected ? "selected" : ""}`} style={{backgroundColor: colour.hex}}/>
      {compact ? null : <p>{colour.name}</p>}
    </button>
  )
}