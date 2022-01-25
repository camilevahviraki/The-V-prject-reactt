const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express ();
const mysql = require('mysql');
const {body,validationResult } = require('express-validator');
const bcrypt =require('bcrypt');

const saltRounds = 10;

const db = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'react-data-base',
}); 



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/* [  (newEmail=req.body.mailEnv ) => {       
    db.query(`SELECT * FROM inscription_vendeurs_b WHERE e_mail = ?`, newEmail,(err, res)=> {   
                  if(res.length > 0) throw new err('Email is already registered.');  
                   });
                   //console.log(res);
               }],  */

 /* [  validating('mailEnv ')    
                           .isEmail().withMessage('Please Insert a valid Email')    
                           .custom(mailEnv => {        
                               db.query(`SELECT * FROM inscription_vendeurs_b WHERE e_mail = ?`,
                               mailEnv,(err, res)=> {  if(res.length > 0) throw new Error('Email is already registered.'); }); 
                                   })
                                ], */     
  /* 
  app.post('/register',body('mailEnv').custom(mailEnv => {        
    db.query(`SELECT * FROM inscription_vendeurs_b WHERE e_mail = ?`,
    mailEnv,(err, res)=> { 
         if(res.length > 0) {
             console.log(res);
           //  return Promise.reject('Username already in use');
            }
             }); 
        }), (req, res) => {

    const errors =validationResult(req);
    if(!errors.isEmpty()) {
       return res.status(400).send(json({errors: errors.array()}),'this count allready in use');
        
    }
  */                                       

app.post('/register' , (req, res) => {
    
    const nomEnv = req.body.nom1Env;
    const postnomEnv = req.body.lastnameEnv;
    const mailEnv = req.body.mailEnv;
    const passwordEnv = req.body.password1Env;
    const phnnumberEnv = req.body.phoneNumberEnv;
    const paysEnv = req.body.paysEnv;
 

    db.query(`SELECT * FROM inscription_vendeurs_b WHERE e_mail = ?`,
    mailEnv,(err, res)=> { 
         if(res.length > 0) {
      
             console.log(res) 
             console.log('ce compte est utilise')
           //  res.send({message:'Ce compte est utilise'});
             //return message;
      } 
      else{
        const sqlInsert = "INSERT INTO inscription_vendeurs_b (nom,post_nom,e_mail,password,phone_number,pays) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsert,[nomEnv, postnomEnv, mailEnv, passwordEnv, phnnumberEnv, paysEnv], (err, result) => {
           
            console.log('Bienvenus dans vitron ')
        });
      }
     
    });    
   
});


app.listen(3001,() =>{
    console.log("server runing on port 3001");
});