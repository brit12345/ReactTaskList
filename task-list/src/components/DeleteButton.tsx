import Task from "../data/dataInterfaces";

function DeleteButton( { taskID } : {taskID: number }){

  function onClick() {

  }

  return (
    <button onClick={onClick}>
      <img src="trash.svg" alt="delete" style={{width: 20, height: 20}}/>
    </button>
  );
}

export default DeleteButton;