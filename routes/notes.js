const notes = require('express').Router();
const { readFromFile, readAndAppend, updateNotes } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
// const { allNotes } = require('..db/db.json');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

notes.delete('/notes/:id', (req, res) => {
  updateNotes(req.params.id)
})

module.exports = notes;
