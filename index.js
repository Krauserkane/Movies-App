
const API_KEY = 'api_key=36ff6ba90bc74810c025b46fe9a3e25f';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const main=document.querySelector('#main')
const form=document.querySelector('#form')
const search=document.querySelector('#search');

function getMovies(url){
    axios.get(url).then(data=>{
        //console.log(data.data.results)
         showMovies(data.data.results)
     
     })
}
getMovies(API_URL);


function showMovies(obj){
    main.innerHTML="";
    obj.forEach(movies=>{
      //  console.log(movies);
        const movie_element =document.createElement('div');
        movie_element.classList.add('movie')
        movie_element.innerHTML=`
        <img class="movie img" src="${IMG_URL+movies.poster_path}" alt="image">
        <div class="movie-info">
            <h3>${movies.original_title}</h3>
            <span class="${getclass(movies.vote_average)}">${movies.vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
           ${movies.overview}
        </div>    
        `
        main.append(movie_element)
    })
}

function getclass(rating){
    if(rating>=8){
        return "green";
    }
    if(rating>=5){
        return "orange";
    }
    return "red";
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const searchterm=search.value;
    const searchresult=searchURL+'&query='+searchterm;
    axios.get(searchresult).then(data=>{
        showMovies(data.data.results)
    })
    .catch(er=>{
        console.log(err);
        getMovies(API_URL)
    })
})