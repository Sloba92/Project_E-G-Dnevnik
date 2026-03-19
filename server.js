const express = require("express");
const app = express();
const monoose = require("mongoose");
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

monoose.connect("mongodb://127.0.0.1:27017/").then(() => { console.log("MongoDB konektovan"); })
    .catch((error) => { console.log(error.message) });

app.use("/", require("./routes"));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})