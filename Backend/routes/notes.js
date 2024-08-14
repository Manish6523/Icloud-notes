const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Note = require("../models/Note");
const { query, body, validationResult } = require("express-validator");


//Route 1---------------Fetch all notes of user in ""Get"" method : ""//api/notes/fetchallnotes""login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id })
    res.json(notes)

  } catch (error) {
    console.error(error.message);
    res.status(500).send('internal error Occured')
  }
})

//Route 2--------------- create notes in ""post"" method : ""//api/notes/addnote""login required
router.post('/addnote', fetchuser, [
  body("title").isLength({ min: 3 }),
  body("description").isLength({ min: 5 })], async (req, res) => {
    try {
      const { title, description, tag } = req.body

      //if errors
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array() });
      }
      const note = new Note({
        title, description, tag, user: req.user.id
      })
      const saveNote = await note.save()
      res.json(saveNote)
    } catch (error) {
      console.error(error.message);
      res.status(500).send('internal error Occured')
    }
  })
//Route 3--------------- update notes in ""put"" method : ""//api/notes/updatenote/:id""login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  try {
    //create a new Note object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //find the note yo be updated and update it by id
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("not found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json(note)

  } catch (error) {
    console.error(error.message);
    res.status(500).send('internal error Occured')
  }
})

//Route 3--------------- update notes in ""put"" method : ""//api/notes/updatenote/:id""login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    //create a new Note object
    //find the note yo be updated and update it by id
    let note = await Note.findById(req.params.id);
    if (!note) { return res.status(404).send("not found") }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"message":"Deleted Success", note:note})

  } catch (error) {
    console.error(error.message);
    res.status(500).send('internal error Occured')
  }
})
module.exports = router