import React, { useContext } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import noteContext from '../context/notes/noteContext'
const Home = (props) => {
  const {showAlert} = props;
  return (
    <div>
      <Notes showAlert = {showAlert}/>
    </div>
  )
}

export default Home
