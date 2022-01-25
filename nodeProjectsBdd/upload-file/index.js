
const express = require('express');
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express ();
const mysql = require('mysql');
const router = express.Router();

router.get("/",function (req,res, next) {
  res.render("index", {title: "Express"});
});

router.post("/singleFile", function(req,res,next){
  console.log("Bien recu");
})


module.exports= router;