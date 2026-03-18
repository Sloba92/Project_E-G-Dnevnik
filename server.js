const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use("/", require("./routes"));


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})