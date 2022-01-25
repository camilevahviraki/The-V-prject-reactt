const express = require('express');
const fileUpload = require('express-fileupload');

const app = express ();
const mysql = require('mysql');

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
 }));
 
 
app.post("/gallery",(req,res)=>{
  console.log(req.files);
} );







 app.listen(3001,() =>{
    console.log("server runing on port 3001");
}); 