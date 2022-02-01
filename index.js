
const express = require('express');
const app = express();
const port = 3000;

var options = {

  setHeaders: function (res, path, stat) {
    res.set('Cache-Control', 'public, max-age=7200'))
  }
}

app.use(express.static(__dirname + '/Public/', options));

app.get ('/', (req, res) => {
    res.sendFile('/Public/sfx.html', { root: __dirname});
})


app.listen(port, () => {
    console.log(`SFX app listening on port ${port}!`)
})
