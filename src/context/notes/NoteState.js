import react, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let initNotes = [];
  const [notes, setNotes] = useState(initNotes);

  const getAllNotes = async() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-token",
      localStorage.getItem('token')
    );
    const response = await fetch(
      `${host}/api/notes/fetchallnotes`,
      {
        method: "GET",
        body: JSON.stringify(),
        headers: myHeaders,
      }
    );
    const json = await response.json();
    setNotes(json);
  }
  const addNote = async (title, description, tag) => {
    // TODO: add api call
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-token",
      localStorage.getItem('token')
    );

    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        body: JSON.stringify({ title, description, tag}),
        headers: myHeaders,
      }
    );
    const note = await response.json();
    setNotes(notes.concat(note))
  };

  const deleteNote = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-token",
      localStorage.getItem('token')
    );

    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: myHeaders,
      }
    );
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "auth-token",
      localStorage.getItem('token')
    );

    const response = await fetch(
      `${host}/api/notes/updatenote/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ title, description, tag}),
        headers: myHeaders,
      }
    );
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  // getAllNotes();

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
