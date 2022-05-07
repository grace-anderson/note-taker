const notes = require("express").Router();
const {
  readFromFile,
  readAndAppend,
  deleteNote,
} = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.status(400).json({
      err: "No body in note",
    });
  }
});

// DELETE note route
notes.delete("/:id", (req, res) => {
  deleteNote(req.params.id, "./db/db.json");
  res.status(200).json({
    data: "Note deleted",
  });
});

module.exports = notes;
