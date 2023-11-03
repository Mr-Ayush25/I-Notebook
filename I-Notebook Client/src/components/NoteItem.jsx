/* eslint-disable react/prop-types */
import { useContext } from "react";
import noteContext from "../context/NoteContext";
const NoteItem = ({ note, updateNote }) => {
  const { deleteNote } = useContext(noteContext);
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title inline">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-regular fa-pen-to-square mx-2 d-inline"
            onClick={() => {
              updateNote(note);
            }}
          />
          <i
            className="fa-regular fa-trash-can mx-2 d-inline"
            onClick={() => {
              deleteNote(note._id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
