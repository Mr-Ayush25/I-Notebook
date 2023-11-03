const express = require("express");
const Notes = require("../models/Notes");
const { check, validationResult } = require("express-validator");
// Importing Router.
const router = express.Router();
// Importing MiddleWare.
const fetchuser = require("../middleware/fetchuser");

// Route 1- get all notes. : LoggedIn user details : get "api/notes/getuser".LogIn Requirred
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const { id } = req.user;
  const notes = await Notes.find({ user: id });
  res.json([notes]);
});
// Route 2- add notes. :LoggedIn user details: post "api/notes/addnode".LogIn Requirred
router.post(
  "/addnote",
  fetchuser,
  [
    check("title", "title length should be greater than 3 characters.")
      .exists()
      .isLength({ min: 3 }),
    check(
      "description",
      "Description length should be greater than 10 characters."
    )
      .exists()
      .isLength({ min: 10 }),
  ],
  async (req, res) => {
    try {
      // If any validation error occurs.
      const errors = validationResult(express.query);
      if (!errors.isEmpty()) {
        res.status(400);
        return res.json({ errors: errors.array() });
      }
      // If everything is Right.
      const { id } = req.user;
      const { title, description, tags } = req.body;
      // Creating notes.

      const note = new Notes({
        title,
        description,
        tags,
        user: id,
      });
      const savedNotes = await note.save();

      // We can do either way
      /*
      const note = await Notes.create({
        title,
        description,
        tags,
        user: id,
      });
      */
      res.json({ savedNotes });
    } catch (error) {
      // If any internal error has Occurred.
      res.status(500);
      res.send("Internal Server Error has occured:" + error);
    }
  }
);

// Route 3- update notes. :LoggedIn user details: put "api/notes/updatenode/:id".LogIn Requirred
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    try {
      const { title, tag, description } = req.body;
      // Note id obtained from user.
      const { id } = req.params;
      // User id obtained from user Token.
      const userid = req.user.id;
      // Create a new Note Object.
      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;

      // Find the note to be updated and update it.
      let note = await Notes.findById(id);
      // If user id is not found in notes db.
      if (note.user.toString() !== userid) {
        res.status(404);
        return res.send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(
        id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      res.status(500);
      return res.send("Try Again");
    }
  }
);

// Route 4 - delete notes. :LoggedIn user details: delete "api/notes/deletenote/:id".LogIn Requirred
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Note id obtained from user.
    const { id } = req.params;
    // User id obtained from user Token.
    const userid = req.user.id;
    // Find the note to be deleted and delete it.
    let note = await Notes.findById(id);
    // If user id is not found in notes db.
    if (note.user.toString() !== userid) {
      res.status(404);
      return res.send("Not Allowed");
    }
    note.deleteOne();
    return res.json({ msg: "Note Deleted" });
  } catch (error) {
    res.status(500);
    return res.send("Internal error has occured");
  }
});

module.exports = router;
