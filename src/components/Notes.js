import React, { useEffect, useRef, useState } from 'react'
import notesContext from "../context/notes/noteContext"
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
  const context = useContext(notesContext);
  const { notes, setNotes, getAllNotes, editNote } = context;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setEnote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });
  }
  const [enote, setEnote] = useState({ eid: "", etitle: "", edescription: "", etag: "default" });
  const handleOnClick = (e) => {
    e.preventDefault();
    if (enote.etitle.length < 5 || enote.edescription.length < 5 || enote.etag.length < 5) {
      return;
    }
    editNote(enote.eid, enote.etitle, enote.edescription, enote.etag);
    ref.current.click();
    props.showAlert("Updated note successfully!", "success");
  }
  const onChange = (e) => {
    setEnote({ ...enote, [e.target.name]: e.target.value })
  }

  const ref = useRef(null);
  const refClose = useRef(null);
  
  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button type="button" style={{ display: 'none' }} ref={ref} className="btn btn-primary d-null" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my-3">
                <h2>Edit Note</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={enote.etitle} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={enote.edescription} onChange={onChange} minLength={5} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={enote.etag} onChange={onChange} minLength={5} required />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" ref={refClose} onClick={handleOnClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className='row my-3'>
        <h2>Your Notes</h2>
        {
          notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          })
        }
      </div>
    </>
  )
}
