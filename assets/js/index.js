// I am using OMDB API for fetching movie details
// Details =  http://www.omdbapi.com/?i=tt3896198&apikey=8ca57d1b
// Titles: https://omdbapi.com/?s=thor&page=1&apikey=8ca57d1b



const movieSearchBox = document.querySelector('.form-control');
const searchList = document.querySelector('.search-list');
const resultGrid = document.querySelector('.result-grid');

// load movies from API
async function loadMovies(movieName){
    const res = await fetch(`https://omdbapi.com/?s=${movieName}&page=1&apikey=8ca57d1b`);
    const data = await res.json();
    // console.log(data);
    if(data.Response == "True"){
        // console.log(data.Search);
        displayMovieList(data.Search);
    }
}

// loadMovies('Guardians of the Galaxy Vol. 2');


function findMovies(){
    const searchMovie = (movieSearchBox.value).trim();
    // trim(): trims any whitespace from the string value returned by movieSearchBox.value,
    // console.log(searchMovie);

    if(searchMovie.length > 0){
        searchList.classList.remove('invisible');
        loadMovies(searchMovie);
    }else {
        searchList.classList.add('invisible');
    }
}


function displayMovieList(movie){
    searchList.innerHTML = "";

    for(let id=0; id < movie.length; id++){
        let movieListItem = document.createElement('div');
        // console.log(movieListItem);
        movieListItem.dataset.id = movie[id].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');

        if(movie[id] != "N/A"){
            moviePoster = movie[id].Poster;
        }else {
            moviePoster = "/assets/images/no-image-icon-23485.png";
        }

        movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
                <img src="${moviePoster}">
            </div>
            <div class="search-item-info">
                <h3>${movie[id].Title}</h3>
                <p>${movie[id].Year}</p>
            </div> `;

        searchList.appendChild(movieListItem);
    }
}

