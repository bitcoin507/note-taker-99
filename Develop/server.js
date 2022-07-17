
const express = require('express');
const data = require('./public/assets/js/index');
const PORT =3001;
const notes = require('./db/db.json')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/api/notes', (req, res) => res.json(notes));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
 
  



