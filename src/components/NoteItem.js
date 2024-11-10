import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const {deleteNote} = context;
  const handleOnClick = () => {
    
  }
  return (
    <div className="col-md-3">
      {/* {note.title}
            {note.description} */}
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}
              <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showAlert("Note deleted successfully", "success")}}></i>
            </h5>
          </div>


          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
