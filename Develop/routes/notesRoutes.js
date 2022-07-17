const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');


// GET Route for retrieving all the notes
notes.get('/', (req,res) => {
    alert(`${req.method} request received `);
    
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
    alert(`${req.method} request received`);
    let{ text, title } = req.body;

    
    if (title && text) {
        
        let note = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(note, './db/db.json');

        let response = {
            status: 'success',
            body: note,
        };

        res.json(response);
    } else {
        res.json('Error')
    }
    //}
});

notes.delete('/:id', (req, res) => {
    alert(`${req.method} request received`);
    let { id } = req.params;
    let notes = readFromFile('./db/db.json');
    let newNotes = notes.filter((note) => note.id !== id);
    writeToFile(newNotes, './db/db.json');
    res.json('Note deleted');
});

module.exports = notes;
