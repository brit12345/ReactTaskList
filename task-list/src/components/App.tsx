import React, { useEffect, useState } from 'react';
import '../App.css';
import { testData } from '../data/testData';
import Task from '../data/dataInterfaces';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import { MyContext } from './MyContext';
import { pages } from '../data/pages';

function App() {
  //Retrieve data from local storage. if none, then set the tasks list as the test data
  const retrievedLocal: string | null = localStorage.getItem("tasks");
  let tempTasks: Array<Task> = testData; //set as default test data
  if(retrievedLocal){ //if real stored data exists (is not null)
    tempTasks = JSON.parse(retrievedLocal)
  } 
  const [tasks, setTasks] = useState(tempTasks);
  const [currentPage, setCurrentPage] = useState(pages.table);
  const [detailID, setDetailID] = useState<string | null>(null);

  //saves the tasks after the component finishes updating
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <MyContext.Provider value={{ tasks, setTasks, currentPage, setCurrentPage, detailID, setDetailID}}>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </MyContext.Provider>
      
    </div>
  );
}

export default App;
