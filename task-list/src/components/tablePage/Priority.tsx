import { priorityWords } from "../../data/priorityWords";

function Priority({priority} : { priority: number}){
  let word: string = "Medium";
  if(priorityWords[priority.toString() as keyof typeof priorityWords]){
    word = priorityWords[priority.toString() as keyof typeof priorityWords];
  }
  return <td>{word}</td>;
}

export default Priority;