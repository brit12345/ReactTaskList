
//Considered using https://react-tables.com/ for the table, but I have 
//enough time to do it myself and wish to demonstrate that I can

import { useContext, useState } from "react";
import Table from "./Table";
import Detail from "./Detail";
import { pages } from "../data/pages";
import { MyContext } from "./MyContext";

function Body(){
  const { currentPage } = useContext(MyContext);
  //Display correct page depending on what the state is
  return (
    <>
      {currentPage === pages.table && <Table></Table>}
      {currentPage === pages.detail && <Detail></Detail>}
    </>

  )
}

export default Body;