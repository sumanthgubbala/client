import React, {useEffect,useState} from 'react'
import axios from 'axios';
const App = () => {

  const [item,setItem]=useState([]);
  const [newtask,setNewTask] =useState('');
  useEffect(()=>{

    axios.get('http://localhost:5000/gettatsk').then(response =>{

      setItem(response.data);

    }
     
    )

  },[])

  const submithandler = e =>{
    e.preventDefault();
    axios.post('http://localhost:5000/addtask',{todo:newtask}).then(response =>{

      setItem(response.data);

    }
    )
  };

  const deletehandler = (id) =>{
    axios.delete(`http://localhost:5000/delete/${id}`).then(response =>{

      setItem(response.data);

    }
    )
  };

  return (
    <div>
      <center>
      <form onSubmit={submithandler}>
        <input type="text" value={newtask}  placeholder="Enter Course"  
        onChange={(e)=> setNewTask(e.target.value)}   />
        <input type="submit" value="submit" />
      </form>
       { item.map(task => 
       <div key={task._id}>
        <h3>{task.todo}</h3>
        <button onClick={()=> deletehandler(task._id)}>Delete</button>
       </div>)}
      </center>
    </div>
  )
}

export default App