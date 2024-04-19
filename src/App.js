import React, { useEffect, useState }  from 'react';
import ToDo from './components/ToDo';
import {addToDo, deleteToDo, getAllToDo,updateTodo} from "./utils/HandleApi"
function App() {
  const[toDo,setToDo]=useState([])
  const[text,setText]=useState("")
  const[isUpdating,setIsUpdating]=useState(false)
  const[toDoId,setToDoId]=useState("")
  const updateMode = (_id,text)=>{
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)

  }
  useEffect(()=>{
    getAllToDo(setToDo)
  },[])
  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type ="text" placeholder="Add ToDos.."
          value={text}
          onChange={(e)=>setText(e.target.value)}/>
          
          <div className="add" onClick={isUpdating ?
          ()=> updateTodo(toDoId,text,setToDo,setText,setIsUpdating)
          :()=>addToDo(text,setText,setToDo)}>
          {isUpdating ? "Update":"Add"}</div>

        </div>
        <div className="container">
          {toDo.map((item)=> <ToDo 
          key={item._id} 
          text={item.text}
          updateMode={()=>updateMode(item._id,item.text)}
          deleteToDo={()=>deleteToDo(item._id,setToDo)}/>)}
        </div>
      
      
      </div>
    </div>
  );
}

export default App;
