const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express ();
const mysql = require('mysql');

const db = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'react-data-base',
}); 


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register',(req, res) => {

    const nomEnv = req.body.nomEnv;
    const postnomEnv = req.body.postnomEnv;
    const mailEnv = req.body.mailEnv;
    const passwordEnv = req.body.passwordEnv;
    const phnnumberEnv = req.body.phnnumberEnv;
    const paysEnv = req.body.paysEnv;
    
    const sqlInsert = "INSERT INTO inscription_vendeurs_b (nom,post_nom,e_mail,password,phone_number,pays) VALUES (?,?,?,?,?,?)";
    db.query(sqlInsert,[nomEnv, postnomEnv, mailEnv, passwordEnv, phnnumberEnv, paysEnv], (err, result) => {
        console.log(err);
    });
});


app.listen(3001,() =>{
    console.log("server runing on port 3001");
});