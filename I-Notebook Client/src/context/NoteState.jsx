/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:8080";
  // const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  // Get All Notes
  //-------------------------------------------------
  const getAllNotes = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const url = `${host}/api/notes/fetchallnotes`;
    axios
      .get(url, config)
      .then((res) => {
        setNotes(res.data[0]);
      })
      .catch((err) => console.log(err));
  };
  //-------------------------------------------------------
  // Add a note
  const addNote = (title, description, tag) => {
    const data = { title, description, tag };
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const url = `${host}/api/notes/addnote`;

    axios
      .post(url, data, config)
      .then((res) => {
        setNotes(notes.concat(res.data.savedNotes));
      })
      .catch((err) => console.log(err));
  };

  //---------------------------------------------------------
  // Edit a note
  const editNote = (id, title, description, tag) => {
    // Logic to edit Note
    // Deep Copy of Array.
    let newNote = Array.from(notes);
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);

    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    const url = `${host}/api/notes/updatenote/${id}`;
    axios
      .put(url, { title, description, tag }, config)
      .catch((err) => console.log(err));
  };
  //-------------------------------------------------
  // Delete a note

  const deleteNote = (id) => {
    const url = `${host}/api/notes/deletenote/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    };
    axios
      .delete(url, config)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== id));
      })
      .catch((err) => console.log(err));
  };
  //----------------------------------------------------

  return (
    <NoteContext.Provider
      value={{
        getAllNotes,
        notes,
        addNote,
        editNote,
        deleteNote,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
