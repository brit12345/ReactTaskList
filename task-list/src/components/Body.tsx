
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import { useContext, useEffect, useState } from "react";
import Table from "./Table";
import Detail from "./Detail";
import { pages } from "../data/pages";
import { MyContext } from "./MyContext";
import Edit from "./Edit";
import Add from "./Add";
import Alert from "./Alert";

function Body(){
  const { currentPage } = useContext(MyContext);
  
  const [reminderAlert, setReminderAlert] = useState(false);

  const [currTime, setCurrTime] = useState(new Date());

  const { tasks } = useContext(MyContext);
  //here is where we need to figure out if an alert is on
  //and then when we turn it on, pass the correct stuff
  //ok so for each due date, we need to alert the day before
  //and then for each reminder, we alert at that time
  tasks.map(task => {
    if(new Date(task.reminder + "+10:00").getTime() === new Date().setMilliseconds(0)){ //time for reminder, make sure it knows it's aus timezone
      alert("'" + task.title + "'" + " reminder!");
    }
    if(new Date(task.dueDate + "+10:00").getTime() - new Date().setMilliseconds(0) === 15*60000){ //if 15 minutes before
      alert("'" + task.title + "'" + " is due in 15 minutes!");
    } 
  });

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