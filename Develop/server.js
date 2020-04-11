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

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("/api/notes", (req, res) => {
    let jsonData = []

    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) throw err
        jsonData = JSON.parse(data)
        return res.json(jsonData)
    })
});

app.post("/api/notes", (req, res) => {
    const newNotes = req.body;
    let jsonData = []
    fs.readFile("db.json", (err, data) => {
        if (err) throw err;
        jsonData = JSON.parse(data);
        jsonData.push(newNotes);
            jsonData.forEach((item, i) => {
                item.id = i + 1;
            });
        const dataString = JSON.stringify(jsonData);
        fs.writeFile(
            path.join(__dirname, "Develop\db\db.json"), dataString, "UTF8", err => {
                if (err) throw err;
                return res.json(dataString);
            }
        );
    });
});

app.delete("/api/notes/:id", (req, res) => {
    let jsonData = []
    fs.readFile("db.json", (err, data) => {
      if (err) throw err;
      jsonData = JSON.parse(data);
  
      
      const noteIndex = jsonData.findIndex(
        (note) => note.id === parseInt(req.params.id)
      );
      
      if (noteIndex === -1) {
        return res.sendStatus(404);
      }
    
      jsonData.splice(noteIndex, 1);
      const dataString = JSON.stringify(jsonData);;
  
      fs.writeFile(
        path.join(__dirname, "db.json"),
        dataString,
        "UTF8",
        function (err) {
          if (err) throw err;
          return res.sendStatus(200);
        }
      );
    });
  });
  

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});






