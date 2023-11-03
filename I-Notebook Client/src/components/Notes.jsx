import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/NoteContext";
import NoteItem from "./NoteItem";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate = useNavigate();
  // Importing Function
  const { notes, getAllNotes, editNote } = useContext(noteContext);

  // Fetching all Notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
      getAllNotes();
    } else {
      navigate("/login");
    }
  }, []);

  // Updtaing note
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  // Start Modal button
  const starter = useRef(null);
  // Close Modal button
  const closer = useRef(null);

  const updateNote = (currentNote) => {
    starter.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleSubmit = () => {
    editNote(note.eid, note.etitle, note.edescription, note.etag);
    closer.current.click();
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote />

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={starter}
      >
        Launch demo modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="className=">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Enter Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="etitle"
                    id="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    name="edescription"
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    value={note.etag}
                    onChange={onChange}
                    name="etag"
                    minLength={3}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                ref={closer}
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {!notes.length && "No Content to show "}
        </div>
        {notes?.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
