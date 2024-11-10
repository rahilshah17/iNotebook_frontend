import React, { useState } from 'react'
import notesContext from "../context/notes/noteContext"
import { useContext } from 'react';

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleOnClick = (e) => {
        e.preventDefault();
        if (note.title.length < 5 || note.description.length < 5 || note.tag.length < 5) {
            alert("Min length has to be 5")
            return;
        }
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully", "success");
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
