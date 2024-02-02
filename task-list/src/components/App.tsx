import React, { useEffect, useState } from 'react';
import '../App.css';
import { testData } from '../data/testData';
import Task from '../data/dataInterfaces';
import Header from './Header';
import Footer from './Footer';
import Body from './Body';

function App() {
  //Retrieve data from local storage. if none, then set the tasks list as the test data
  const retrievedLocal: string | null = localStorage.getItem("tasks");
  let tempTasks: Array<Task> = testData; //set as default test data
  if(retrievedLocal){ //if real stored data exists (is not null)
    tempTasks = JSON.parse(retrievedLocal)
  } 
  const [tasks, setTasks] = useState(tempTasks);

  //saves the tasks after the component finishes updating
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <Header></Header>
      <Body tasks={tasks}></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
