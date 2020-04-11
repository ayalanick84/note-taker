const path = require("path");
const express = require("express");
// Initialize the Express server app
const app = express();
const PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
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
    return res.json(notes);
});
app.post("/api/characters", (req, res) => {
    const newNotes = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();
    characters.push(newCharacter);

    res.json(newCharacter);
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
    


    


