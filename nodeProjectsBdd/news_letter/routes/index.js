var express = require('express');
const bodyParser= require('body-parser');
//const cors = require('cors');
var router = express.Router();
const multer = require('multer');
var ejs = require('ejs');
const path = require('path');
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt =require('bcrypt');

const app = express();
const saltRounds = 10;

const db = mysql.createPool({ // create data base
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'guellord_newsletter',
});
/***** *
app.use(cors({  // link to front end
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true 
}));

 *****/
app.use(express.json()); 

app.use(cookieParser()); // cookies definition
app.use(session({
  key: "userId",
  secret: "camilux",
  resave: false,
  saveUninitialized: false,
  cookies: {
    expires: 60 * 60 * 24,
  }
}));                                      
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//////////


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//////////////////////Inscription and login part******

app.post('/register' , (req, res) => {
    
  const nomEnv = req.body.nom1Env;
  const mailEnv = req.body.mailEnv;
  const passwordEnv = req.body.password1Env;
  


  db.query(`SELECT * users WHERE mail = ?`,
  mailEnv,(err, result)=> { 
       if(result.length > 0) {
    
           console.log(res) 
           console.log('ce compte est utilise')
           res.send({message1: "Ce compte est utilise"});
           //return message;
    } 
    else{
      bcrypt.hash(passwordEnv,saltRounds,(err,hash)=> {

        const sqlInsert = "INSERT INTO users (nom,mail,password) VALUES (?,?,?)";
      db.query(sqlInsert,[nomEnv, mailEnv, hash], (err, result) => {
          
          res.send({message2: "Votre compte a bien ete cree"})
          console.log('Bienvenus dans vitron ')
      })
      })
      
    }
   
  });    
 
});
app.get("/login",(req,res)=> {
 if(req.session.user){
    res.send({loggedIn: true, user:  req.session.user});
 }else{
    res.send({loggedIn: false});
 }  
})

app.post('/login',(req,res)=>{
const mailConnect = req.body.mailConnect;
const passwordConnect = req.body.passwordConnect;


db.query("SELECT * FROM users WHERE mail=?  ",mailConnect,(err,result) => {
  if(err){
   res.send({ err: err});
    console.log(err);
  }
  if(result.length > 0){
      bcrypt.compare(passwordConnect, result[0].password,(error,response)=>{
       
       if(response){
         req.session.user = result;
        res.send(result);
        console.log( req.session.user);
       }else{
         res.send({message:"Mot de passe incorrect"})
        
       }
        
      })
 
 
  }
  else {
    res.send({message: "Ce compte n'existe pas"});
  }
}
);
});
//////////////////////Inscription and login part******





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
          console.log("something went wrong")
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
