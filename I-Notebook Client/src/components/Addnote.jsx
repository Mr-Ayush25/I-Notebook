import { useContext, useState } from "react";
import noteContext from "../context/NoteContext";

const Addnote = () => {
  const { addNote } = useContext(noteContext);

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <div>
        <h1>Add a Note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter Title *
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              value={note.title}
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description *
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={note.description}
              onChange={onChange}
              name="description"
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
              value={note.tag}
              className="form-control"
              id="tag"
              onChange={onChange}
              name="tag"
              minLength={3}
              required
            />
          </div>

          <button
            disabled={note.title.length < 5 || note.description.length < 5}
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addnote;
