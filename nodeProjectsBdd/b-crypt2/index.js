const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express ();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt =require('bcrypt');

const saltRounds = 10;

const db = mysql.createPool({ 
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'react-data-base',
}); 

app.use(cors({  // link to front end
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true 
}));

app.use(express.json());

app.use(cookieParser());
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

app.post('/register' , (req, res) => {
    
    const nomEnv = req.body.nom1Env;
    const postnomEnv = req.body.lastnameEnv;
    const mailEnv = req.body.mailEnv;
    const passwordEnv = req.body.password1Env;
    const phnnumberEnv = req.body.phoneNumberEnv;
    const paysEnv = req.body.paysEnv;
 

    db.query(`SELECT * FROM inscription_vendeurs_b WHERE e_mail = ?`,
    mailEnv,(err, result)=> { 
         if(result.length > 0) {
      
             console.log(res) 
             console.log('ce compte est utilise')
             res.send({message1: "Ce compte est utilise"});
             //return message;
      } 
      else{
        bcrypt.hash(passwordEnv,saltRounds,(err,hash)=> {

          const sqlInsert = "INSERT INTO inscription_vendeurs_b (nom,post_nom,e_mail,password,phone_number,pays) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsert,[nomEnv, postnomEnv, mailEnv, hash, phnnumberEnv, paysEnv], (err, result) => {
            
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
  

  db.query("SELECT * FROM inscription_vendeurs_b WHERE e_mail=?  ",mailConnect,(err,result) => {
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


app.listen(3001,() =>{
    console.log("server runing on port 3001");
}); 