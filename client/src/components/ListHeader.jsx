import Modal from './Modal'
import { useState } from 'react'

function ListHeader({ listName }) {
  const [showModal, setShowModal] = useState(null)

    function signOut(){
      console.log('signout')
    }

    return (
      <div className='list-header'>
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="button-create" onClick={() => setShowModal(true)}>ADD NEW</button>
          <button className="button-signout" onClick={signOut}>SIGN OUT</button>
        </div>
        {showModal && <Modal mode={'create'} setShowModal={setShowModal}/>}
      </div>
    )
  }
  
  export default ListHeader