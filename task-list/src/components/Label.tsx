import { Label } from "../data/dataInterfaces";
import { labelColours } from "../data/labelColours";

function LabelComponent({ label }: {label: Label}){
  let col = label.colour;
  if(labelColours[col.toLocaleLowerCase() as keyof typeof labelColours]){
    col = labelColours[col.toLocaleLowerCase() as keyof typeof labelColours]
  }
  return (
    <div className="label" style={{backgroundColor: col}}>
      <p>{label.name}</p>
    </div>
  )
}

export default LabelComponent;