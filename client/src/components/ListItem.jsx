import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import Modal from './Modal'
import { useState } from 'react'

function ListItem({task, getData}) {
  const [showModal, setShowModal] = useState(false)

  async function deleteItem(){
    try{
      const response = await fetch(`http://localhost:8000/tasks/${task.id}`, {
        method: 'DELETE'
      })
      if(response.status === 200){
        getData()
      }
    }catch(err){
      console.error(err)
    }
  }

    return (
      <div className="list-item">
        
          <div className="info-container">
            <TickIcon/>
            <p className="task-title">{task.title}</p>
            <ProgressBar progress={task.progress}/>
          </div>

          <div className="button-container">
            <button className="button-edit" onClick={() => setShowModal(true)}>EDIT</button>
            <button className="button-delete" onClick={deleteItem}>DELETE</button>
          </div>
          {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}

      </div>
    )
  }
  
  export default ListItem