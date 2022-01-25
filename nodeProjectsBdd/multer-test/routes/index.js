var express = require('express');
var router = express.Router();
const multer = require('multer');
var ejs = require('ejs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



const app = express();
app.set('view engine','ejs');
app.use(express.static('./../public')); 

const storage = multer.diskStorage({
  destination:function (req, file, cb) {
    cb(null, './../public/images/');
},
  filename: function (req, file, cb) {
    let fileExtension = file.originalname.split('.')[1]
    cb(null,file.fieldname+'-'+Date.now()+"."+ fileExtension
    // path.extname(file.originalname)
    );
  }
}) 
const upload = multer({storage: storage}).single("gallery");


router.post("/gallery",(req,res) => {
         
      upload(req,res ,(err) => {
        if(err){
          res.send({msg:'error occured'});
          console.log(err);
        }
        else{
          console.log(req.file);
          console.log(req.body);
          res.send({msg: 'Bien joue'})
          console.log('successfully');
        }
      });
      
});


module.exports = router;
