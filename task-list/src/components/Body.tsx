
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import { useState } from "react";
import Task from "../data/dataInterfaces";
import Table from "./Table";

function Body({ tasks }: { tasks: Array<Task>}){
  const pages: Array<string> = ["table", "detail", "edit"];

  const [currentPage, setCurrentPage] = useState("table");

  //Display correct page depending on what the state is
  return (
    <>
      {currentPage === "table" && <Table tasks={tasks}></Table>}
    </>

  )
}

export default Body;