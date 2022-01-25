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
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res)=> {
    const sqlSelect= "SELECT * FROM crud_table";
    db.query(sqlSelect, (err,result) => {
      res.send(result);
    });
});

app.post("/api/insert", (req, res ) =>{

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const SqlInsert = "INSERT INTO crud_table (movie_name ,review ) VALUES (?,?)"
    db.query(SqlInsert , [movieName, movieReview] ,(err, result) => {
        console.log(err);
    });
})

app.listen(3001,() =>{
    console.log("server runing on port 3001");
})