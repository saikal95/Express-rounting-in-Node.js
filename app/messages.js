
const express = require('express');
const fs = require("fs");
let newTerm = new Date().toISOString();

const fileName = `./fileForWrite/${newTerm}`;
let data = [];



const router = express.Router();


router.get('/', (req, res) => {

  // fs.readdir(fileName, (err, data) => {
  //   data.forEach(info => {
  //     console.log(fileName + '/' + info);
  //     console.log(data);
  //   });
  // })
  return res.send('we will see here messages');

});

router.post('/', (req, res) => {
  const message = {
    date: new Date().toISOString(),
    description: req.body.description,
  }

  data.push(message);
  console.log(data, fileName);
  fs.writeFileSync(fileName, JSON.stringify(data));
  
  return res.send(`Date:${message.date}${message.description} `);
})





module.exports = router;