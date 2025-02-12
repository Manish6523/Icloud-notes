import { useState } from "react";
import NoteContext from "./noteContext";
import {  toast } from 'react-toastify';

const NoteState = (props) => {

  const host = 'http://localhost:5000'


  const [notes, setNotes] = useState([])
// fetch all the notes on first rendering

const allNotes = async()=>{
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
  });
  const json = await response.json()
  console.log(json)
  console.log(json)
  setNotes(json)
}


  //Add a note
  const addNote = async(title, description, tag) => {
    // fetching api calls
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json()
    console.log()

    setNotes(notes.concat(note))

  }

  
  //Deleta a note
  const deleteNote = async(id) => {
    // eslint-disable-next-line no-restricted-globals
    let resu = confirm("do you want to delete this Note"); 
    if(resu){
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
    toast.success('Note Deleted')

    const newNote = await notes.filter((note) => { return note._id !== id });
      setNotes(newNote)
    }
  }


  //Edit a note
  const editNote = async (id, title, description, tag) => {
    // fetching api calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json()
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag
        break;
      }
    }
    console.log(id, newNotes)
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, allNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;