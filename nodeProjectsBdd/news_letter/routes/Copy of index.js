var express = require('express');
var router = express.Router();
const multer = require('multer');
var ejs = require('ejs');
const path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


 
const fs = require("fs");
const { promisify } = require('util');
const pipeline = promisify(require("stream").pipeline);

const storage = multer.diskStorage({
  destination:'/../public/images',
  filename: function (req, file, cb) {
    cb(null,file.fieldname+'-'+Date.now()+ 
    path.extname(file.originalname));
  }
}) 
const upload = multer({storage: storage});


router.post("/gallery",upload.single("gallery"),function(req,res,next)  {
         
     
      
      
      console.log(req.file);
      console.log(req.body);
      res.send({msg: 'Bien joue'})
      console.log('successfully');
});

module.exports = router;
