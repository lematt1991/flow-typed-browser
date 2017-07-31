const express = require('express')
const path = require('path')
const fs = require('fs')

var port = process.env.PORT || 3002

var app = express()

app.get('/defs', (req, res) => {
  fs.readdir(path.join(__dirname, 'public/flow-typed/definitions/npm'), (err, files) => {
    if(err){
      res.status(500).send(err)
    }else{
      res.json(files)
    }
  })
})

app.listen(port, function () {
  console.log('Listening at http://localhost:' + port)
})  