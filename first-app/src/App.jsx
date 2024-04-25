import './App.css'
import Courses from './components/Courses/Courses'
import data from './courseData/data';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddForm from './components/AddForm/AddForm';
import { useState } from 'react';
import SearchAndSort from './components/SearchAndSort/SearchAndSort';

function App() {
 const [myData,setMyData]=useState(data)
 const [copy,setCopy]=useState(data)

  return (
    <>
    <AddForm data={myData} setMyData={setMyData}/>
    <SearchAndSort data={myData} setMyData={setMyData} copy={copy} setCopy = {setCopy}/>
    <Courses data={myData} setMyData={setMyData}/>
    </>
  )
}

export default App
