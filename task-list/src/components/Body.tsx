
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import { useContext, useEffect, useState } from "react";
import Table from "./tablePage/Table";
import Detail from "./detailPage/Detail";
import { pages } from "../data/pages";
import { MyContext } from "./MyContext";
import Edit from "./addAndEditPages/Edit";
import Add from "./addAndEditPages/Add";

let overdueAlerted = false; //recommended from https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application

function Body(){
  const { currentPage } = useContext(MyContext);

  const [currTime, setCurrTime] = useState(new Date());

  const { tasks } = useContext(MyContext);

  tasks.map(task => {
    if(new Date(task.reminder + "+10:00").getTime() === new Date().setMilliseconds(0)){ //time for reminder, make sure it knows it's aus timezone
      alert("'" + task.title + "'" + " reminder!");
    }
    if(new Date(task.dueDate + "+10:00").getTime() - new Date().setMilliseconds(0) === 15*60000){ //if 15 minutes before
      alert("'" + task.title + "'" + " is due in 15 minutes!");
    } 
  });

  useEffect(() => {
    if(!overdueAlerted){
      overdueAlerted = true;
      tasks.map(task => {
        if(new Date().setMilliseconds(0) > new Date(task.dueDate + "+10:00").getTime()){ //if past current time
          alert("'" + task.title + "'" + " is overdue!");
        } 
      })
    }
  }, []);

  useEffect(() => { //updates the time every second
    const interval = setInterval(() => { setCurrTime(new Date()) }, 1000);
    return () => clearInterval(interval);
  })

  //Display correct page depending on what the state is
  return (
    <>
      {currentPage === pages.table && <Table></Table>}
      {currentPage === pages.detail && <Detail></Detail>}
      {currentPage === pages.edit && <Edit></Edit>}
      {currentPage === pages.add && <Add></Add>}
    </>

  )
}

export default Body;