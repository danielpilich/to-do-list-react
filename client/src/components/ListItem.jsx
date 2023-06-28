import TickIcon from "./TickIcon"
import ProgressBar from "./ProgressBar"
import Modal from './Modal'
import { useState } from 'react'

function ListItem({task}) {
  const [showModal, setShowModal] = useState(false)

    return (
      <div className="list-item">
        
          <div className="info-container">
            <TickIcon/>
            <p className="task-title">{task.title}</p>
            <ProgressBar/>
          </div>

          <div className="button-container">
            <button className="button-edit" onClick={() => setShowModal(true)}>EDIT</button>
            <button className="button-delete">DELETE</button>
          </div>
          {showModal && <Modal mode={'edit'} setShowModal={setShowModal}/>}

      </div>
    )
  }
  
  export default ListItem