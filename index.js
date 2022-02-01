
const express = require('express');
const app = express();
const port = 3000;


app.use(express.static(__dirname + '/Public/'));
app.use(function (req, res, next) {
  res.set('Cache-control', 'public, max-age=7200')
}) 
app.get ('/', (req, res) => {
    res.sendFile('/Public/sfx.html', { root: __dirname});
})


app.listen(port, () => {
    console.log(`SFX app listening on port ${port}!`)
})
