const express = require('express');
const fs = require("fs");
let newTerm = new Date().toISOString();

const fileName = `./fileForWrite/${newTerm}`;
const path = './fileForWrite'
let data = [];
let data2 = [];
let anotherArray = [];

const router = express.Router();

router.get('/', (req, res) => {
  fs.readdir(path, (err, data) => {
    data.forEach(info => {
      data2.push(info)
      let newPath = `${path}/${info}`
      anotherArray.push(newPath);
    });
  });

  const newArray2 = anotherArray.slice(anotherArray.length - 5);

  newArray2.forEach(item => {

    fs.readFile(item, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File contents are:', JSON.parse(data));

      }

    })
  });

  return res.send({"message": data});

});

router.post('/', (req, res) => {
  const message = {
    date: new Date().toISOString(),
    description: req.body.description,
  }

  data.push(message);

  fs.writeFileSync(fileName, JSON.stringify(data));

  return res.send(`Date:${message.date}Description:${message.description} `);
})


module.exports = router;