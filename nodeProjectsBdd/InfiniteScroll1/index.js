const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express ();
const mysql = require('mysql');
const cookieParser = require('cookie-parser');
const session = require('express-session');




const db = mysql.createPool({ 
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'react-data-base',
}); 


app.use(cors({
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

app.get('/scrollAgain' , (req, res) => {
    
    const page =parseInt( req.query.page);
    const pageUp=page+1;
    const articlesDown = 20* page;
    const articlesUp = 20* pageUp;
    console.log(page);
  
    db.query(`SELECT * FROM inscription_vendeurs_b LIMIT ${articlesDown},${articlesUp} `,(err, result)=> { 
         if(result.length> 0) {
      
             console.log(result) 
             const articles= result;
             res.send({
               articlesData: articles,
              });
             
             console.log("chargement nouvelle page")
             //send result
      } 
      else{
               
        res.send({
          articlesData: [],
         });
          
             console.log('fin de page') 
      }
      if (err) {
        console.log(err);
      }
     
    });    
   
});


 app.listen(3001,() =>{
    console.log("server runing on port 3001");
}); 