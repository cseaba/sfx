const e = require('express');
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static("Public"));


app.get ('/', (req, res) => {
    res.sendFile(__dirname + "/public/sfx.html")
})


app.listen(port, () => {
    console.log(`SFX app listening on port ${port}!`)
})