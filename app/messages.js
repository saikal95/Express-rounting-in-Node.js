const express = require('express');
const fs = require("fs");
let newTerm = new Date().toISOString();

const fileName = `./fileForWrite/${newTerm}`;
const path = './fileForWrite'
let data = [];
let anotherArray = [];

const router = express.Router();

router.get('/', (req, res) => {
  fs.readdir(path, (err, data) => {
    data.forEach(info => {
      let newPath = `${path}/${info}`
      anotherArray.push(newPath);
    });
  });

  anotherArray.forEach(item => {

    fs.readFile(item, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File contents:', JSON.parse(data));
      }
    })

  });


  return res.send('we will see here messages');

});

router.post('/', (req, res) => {
  const message = {
    date: new Date().toISOString(),
    description: req.body.description,
  }

  data.push(message);
  fs.writeFileSync(fileName, JSON.stringify(data));

  return res.send(`Date:${message.date}${message.description} `);
})


module.exports = router;