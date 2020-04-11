const path = require("path");
const express = require("express");
const fs = require('fs');
// Initialize the Express server app
const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/public/assets")));
app.use(express.static(path.join(__dirname, "/public/assets/js")));
app.use(express.static(path.join(__dirname, "/public/assets/css")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// function readJSON() {
//     let jsonData = []

//     fs.readFile('./db/db.json', 'utf-8', (err, data) => {
//         if (err) throw err
//         jsonData = JSON.parse(data)
//         return jsonData
//     })
// };


// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    let jsonData = []

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err
        jsonData = JSON.parse(data)
        return res.json(jsonData)
    })
});

app.post("/api/notes", (req, res) => {
    const newNotes = req.body;
    let jsonData = []
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      jsonData = JSON.parse(data);
      jsonData.push(newNotes);
      const dataString = JSON.stringify(jsonData);
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),dataString,"UTF8",err => {
          if (err) throw err;
          return res.json(dataString);
        }
      );
    });
  });
  
  app.delete("/api/notes/:routeName", (req, res) => {
    // finds the index of the matching character in the array
    const notesIndex = notes.findIndex(
      (note) => note.routeName === req.params.routeName
    );
    if (notesIndex === -1) {
      // did not find matching character
      // send error response code
      return res.sendStatus(404);
    }
  
    // removes the character if its found
    notes.splice(notesIndex, 1);
    // send ok response code
    return res.sendStatus(200);
  });  
  
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});






