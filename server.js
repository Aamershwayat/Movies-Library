'use strict'

const express = require('express')
const cors= require('cors')
const app = express(); 
const jsonData = require("./MovieData/data.json");



    
    
    var error_404 = {
        "status": 404,
        "responseText": "This page endpoint not found "
        }

// www.localhost:3000/hello 

app.get ('/' , homepage )
app.get ('/favorite', favorite)
app.get('*', error404 )


function homepage(req,res){
    res.status(200).json({
        "title": "Spider-Man: No Way Home",
        "poster_path": "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "overview": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man."
        })
    }
    
    function Ensure(title,poster_path,overview)
    {
        this.title = title;
        this.poster_path = poster_path;
        this.overview = overview;
    }



    function favorite(req,res){
        res.status(200).send("Welcome to Favorite Page");
    }
    

function error404 (req,res){
res.status(404).send(error_404)
}




app.listen (3000, () => {
    console.log("I can hear you");

} )
 
