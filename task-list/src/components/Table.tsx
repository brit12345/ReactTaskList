import { ChangeEvent, useContext, useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import { MyContext } from "./MyContext";
import Popup from "./Popup";
import Task from "../data/dataInterfaces";

function Table(){
  const { tasks, setTasks } = useContext(MyContext);
  const [ filteredOrSorted, setFilteredOrSorted ] = useState(false);
  const [ alteredTasks, setAlteredTasks ] = useState(tasks); //need new state so i dont save changes to the actual list
  const popups = {
    status: false,
    dueDate: false,
    priority: false,
    labels: false
  }

  const [ popupStats, setPopupStats] = useState(popups);

  const filtersAndSorts = {
    status: "none",
    dueDate: "none",
    priorityFilter: "none",
    prioritySort: "none",
    labels: "none"
  }

  const [ popupInputs, setPopupInputs] = useState(filtersAndSorts);

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    setPopupInputs({...filtersAndSorts, status: e.target.value});
    const tempTasks = tasks.filter(task => { //can only have one filter
      if(e.target.value === "completed" && task.completed === true){
        return task;
      } else if(e.target.value === "uncompleted" && task.completed === false){
        return task;
      } else if(e.target.value === "none"){
        return task; //return all
      }
    });
    
    setAlteredTasks(tempTasks);
  }


  function handlePriorityFilterChange(e: ChangeEvent<HTMLSelectElement>) {
    setPopupInputs({...filtersAndSorts, priorityFilter: e.target.value});
    const tempTasks = tasks.filter(task => { //can only have one filter
      if(e.target.value !== "none"){
        if(e.target.value === task.priority.toString()){
          return task;
        } 
      } else {
        return task; //return all if its none
      }
      
    });
    
    setAlteredTasks(tempTasks);
  }

  function handleDueDateChange(e: ChangeEvent<HTMLSelectElement>) {
    setPopupInputs({...filtersAndSorts, dueDate: e.target.value});
    let tempTasks: Array<Task> = [];
    if(e.target.value !== "none"){
      tempTasks = [...tasks].sort(function(a, b) { //can only have one sort
        if(e.target.value === "ascending"){
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        } else {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        }
  
      });
    } else {
      tempTasks = tasks;
    }
    
    
    setAlteredTasks(tempTasks);
  }

  function handlePrioritySortChange(e: ChangeEvent<HTMLSelectElement>) {
    setPopupInputs({...filtersAndSorts, prioritySort: e.target.value});
    let tempTasks: Array<Task> = [];
    if(e.target.value !== "none"){
      tempTasks = [...tasks].sort(function(a, b) { //can only have one sort
        if(e.target.value === "ascending"){
          return a.priority - b.priority;
        } else {
          return b.priority - a.priority;
        }
      });
    } else {
      tempTasks = tasks;
    }
    
    setAlteredTasks(tempTasks);
  }

  function handleLabelChange(e: ChangeEvent<HTMLSelectElement>) {
    setPopupInputs({...filtersAndSorts, labels: e.target.value});
    let tempTasks: Array<Task> = [];
    if(e.target.value !== "none"){
      tempTasks = tasks.filter(task => { //can only have one filter
        let contains = false;
        task.labels.map(label => {
          if(label.name === e.target.value){
            contains = true;
          }
        })
        if (contains) { return task }
      });
    } else {
      tempTasks = tasks;
    }
    
    
    setAlteredTasks(tempTasks);
  }

  //toggle popups
  function onClick(header: string){
    if(popupStats[header as keyof typeof popupStats] !== true){
      setPopupStats({ ...popups, [header]: true});
    } else {
      setPopupStats({ ...popups, [header]: false});
    }

  }

  function getUniqueLabels(tasks: Array<Task>): Array<string> {
    let labels: Array<string> = [];

    tasks.map(task => {
      task.labels.map(label => labels.push(label.name));
    });
    return [...new Set(labels)];
  }

  return (
    <>
      <table>
        <thead>
          <TableHeader onClick={onClick}></TableHeader>
        </thead>
        <tbody>
          {alteredTasks.map(task => {
            return (
              <TableRow task={task} key={task.id}></TableRow>
            );
          })}
        </tbody>
        
      </table>
      {popupStats.status && 
        <Popup>
          <label htmlFor="statusFilter">Filter</label>
          <select id="statusFilter" value={popupInputs.status} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleStatusChange(e)}}>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
            <option value="none">None</option>
          </select>
        </Popup>
      }
      {popupStats.dueDate && 
        <Popup>
          <label htmlFor="dueDateSort">Sort</label>
          <select id="dueDateSort" value={popupInputs.dueDate} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleDueDateChange(e)}}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="none">None</option>
          </select>
        </Popup>
      }
      {popupStats.priority && 
        <Popup>
          <label htmlFor="priorityFilter">Filter</label>
          <select id="priorityFilter" value={popupInputs.priorityFilter} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handlePriorityFilterChange(e)}}>
            <option value="1">Very Low</option>
            <option value="2">Low</option>
            <option value="3">Medium</option>
            <option value="4">High</option>
            <option value="5">Very High</option>
            <option value="none">None</option>
          </select>
          <label htmlFor="prioritySort">Sort</label>
          <select id="prioritySort" value={popupInputs.prioritySort} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handlePrioritySortChange(e)}}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
            <option value="none">None</option>
          </select>
        </Popup>
      }
      {popupStats.labels && 
        <Popup>
          <label htmlFor="labelFilter">Filter</label>
          <select id="labelFilter" value={popupInputs.labels} onChange={(e: ChangeEvent<HTMLSelectElement>) => {handleLabelChange(e)}}>
            {getUniqueLabels(tasks).map(label => <option key={label} value={label}>{label}</option> )}
            <option value="none">None</option>
          </select>
        </Popup>
      }
    </>
  );
}

export default Table;