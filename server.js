'use strict';

const express = require("express");

const app = express();

const axios = require("axios");

const dotenv = require('dotenv');

dotenv.config();

const APIKEY = process.env.APIKEY;
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    return res.status(200).send("Hello World");
});

app.get("/trending", trendingHandler);
app.get("/upcoming",upcomingMovie)
app.get("/search", searchMovieHandler)
app.get("/recommendations",recommended)


app.use(errorHandler);

app.use("*", notFountHandler);

function Movie(title, id, release_date, poster_path, overview){
    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
    
}


function trendingHandler(req,res){
    let movies = []
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${APIKEY}&language=en-US`).then(value => {
        value.data.results.forEach(element => {
            let movie = new Movie(element.title, element.id, element.release_date, element.poster_path, element.overview);
            movies.push(movie);
            
        })

        
        return res.status(200).json(movies);
    }).catch((error) => {
        errorHandler(error, req,res);
    })
   
};




function searchMovieHandler(req, res){

    let serachQuery = req.query.searchStr;
    let numberOfPages= req.query.numberOfPages
    let movies = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${APIKEY}&language=en-US&query=${serachQuery}&page=${numberOfPages}`).then(value => {
        value.data.results.forEach(element => {
            let movie = new Movie(element.title, element.id, element.release_date, element.poster_path, element.overview);
            movies.push(movie);
        })
        return res.status(200).json(movies);
    }).catch(error => {
        errorHandler(error, req,res);
    })
}



function recommended(req, res){

    let recommendFilmId = req.query.recommendFilmId;
    let movies = [];
    axios.get(`https://api.themoviedb.org/3/movie/${recommendFilmId}/recommendations?api_key=${APIKEY}&language=en-US&page=1`).then(value => {
        value.data.results.forEach(element => {
            let recomendedMovie = new Movie(element.title, element.id, element.release_date, element.poster_path, element.overview);
            movies.push(recomendedMovie);
        })
        
        return res.status(200).json(movies);
    }).catch(error => {
        errorHandler(error, req,res);
    })
}





function upcomingMovie(req, res){
  
  
    let movies = [];
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US`).then(value => {
        value.data.results.forEach(element => {
            let recomendedMovie = new Movie(element.title, element.id, element.release_date, element.poster_path, element.overview);
            movies.push(recomendedMovie);
        })
        return res.status(200).json(movies);
    }).catch(error => {
        errorHandler(error, req,res);
    })
}




function notFountHandler(req,res){
    res.status(404).send("No endpoint with this name");
}

function errorHandler(error, req, res){
    const err = {
        status : 500,
        message : error
    }

    res.status(500).send(err);
}

app.listen(PORT, () => {
    console.log(`I am using port ${PORT}`);
});