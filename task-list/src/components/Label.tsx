import { MouseEventHandler } from "react";
import { Label } from "../data/dataInterfaces";
import { labelColours } from "../data/labelColours";

function LabelComponent({ label, editMode = false, onClick }: {label: Label, editMode: boolean, onClick: MouseEventHandler<HTMLButtonElement> | undefined}){
  let col = label.colour;
  if(labelColours[col.toLocaleLowerCase() as keyof typeof labelColours]){
    col = labelColours[col.toLocaleLowerCase() as keyof typeof labelColours]
  }
  return (
    <div className="label" style={{backgroundColor: col}}>
      <p>{label.name}</p>
      {editMode && <button onClick={onClick}><img src="close-circle.svg" alt="delete label" style={{width: 20, height: 20}}/></button>}
    </div>
  )
}

export default LabelComponent;