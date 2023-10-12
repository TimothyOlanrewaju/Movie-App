const global = {
     currentPage: window.location.pathname,
     search:{
      term:'',
      type:'',
      page:1,
      total_pages:1
     },
     api:{
      apiKey:'3b7208c5acf82a19d7c7f0b6231c9173',
      apiUrl:'https://api.themoviedb.org/3/'
     }
}

//fetch API data and response here
async function fetchAPIData(endpoint){
  const API_KEY = global.api.apiKey
  const API_URL = global.api.apiUrl
  showSpinner(); 
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`)
  const data = await response.json();
  hideSpinner();
  return data;
}

//make request to Search
async function searchAPIData(){
  const API_KEY = global.api.apiKey
  const API_URL = global.api.apiUrl
  showSpinner();
  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`)
  const data = await response.json();
  hideSpinner();
  return data;
}

//fetch popular movies here
async function fetchPopularMovies(){
    const {results} = await fetchAPIData('movie/popular')
    results.forEach(movie=>{
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML=`
        <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path
                ?`<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"/>`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>`;
          document.querySelector('#popular-movies').appendChild(div)
        })
}
//display movie details here
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1]
    const movie = await fetchAPIData(`movie/${movieId}`)
    console.log(movie)
    const div = document.createElement('div')
    div.innerHTML=`
    <div class="details-top">
          <div>
          ${
            movie.poster_path
            ?`<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"/>`
          : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"/>`
        }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(movie.revenue)}</li>
            <li><span class="text-secondary">Runtime:</span> $${addCommas(movie.runtime)} minutes</li>
            <li><span class="text-secondary">Status:</span> ${addCommas(movie.status)}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
    `
    document.querySelector('#movie-details').appendChild(div)
}
//fetch popular tv shows here
async function fetchPopularShows(){
    const {results} = await fetchAPIData('tv/popular')
    results.forEach(show=>{
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML=`
        <a href="tv-details.html?id=${show.id}">
            ${
                show.poster_path
                ?`<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"/>`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${show.first_air_date}</small>
            </p>
          </div>`;
          document.querySelector('#popular-shows').appendChild(div)
        })
}
//display tv shows details
async function displayShowDetails(){
  const showsID = window.location.search.split('=')[1]
  const show = await fetchAPIData(`tv/${showsID}`)
  console.log(show)
  const div = document.createElement('div')
    div.innerHTML=`
    <div class="details-top">
          <div>
          ${
            show.poster_path
            ?`<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"/>`
          : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"/>`
        }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date}</p>
            <p>${show.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre)=>`<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Number of episodes:</span> ${show.number_of_episodes}</li>
            <li><span class="text-secondary">Number of seasons:</span> ${show.number_of_seasons}</li>
            <li><span class="text-secondary">Status:</span> ${addCommas(show.status)}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies.map((company)=>`<span>${company.name}</span>`).join('')}</div>
        </div>
    `
    document.querySelector('#show-details').appendChild(div)
}

//Search for Movies/TV shows
async function search(){
  const queryStrings = window.location.search
  const urlParams = new URLSearchParams(queryStrings)
  global.search.type = urlParams.get('type')
  global.search.term = urlParams.get('search-term')
  if(global.search.term !== '' && global.search.term !== null){
    const {results, total_pages, page} = await searchAPIData();
    if(results.length === 0){
      searchAlert('No results found');
      return;
    }
    //displaying search results
    displaySearchResults(results)
    document.querySelector('#search-term').value = ''

  }else{
    searchAlert('Please enter a search term')
  }
}
//function to display search results
function displaySearchResults(results){
  results.forEach(result=>{
    const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML=`
        <a href="${global.search.type}?id=${result.id}">
            ${
                result.poster_path
                ?`<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${global.search.type === 'movie'? result.title : result.name }"/>`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${global.search.type === 'movie'? result.title : result.name }"/>`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie'? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${global.search.type === 'movie'? result.release_date : result.first_air_date }</small>
            </p>
          </div>`;
          document.querySelector('#search-results').appendChild(div)
})
}

//Creating a Search Alert
function searchAlert(message, className = 'error'){
  const div = document.createElement('div')
  div.classList.add('alert',className)
  div.appendChild(document.createTextNode(message))
  document.getElementById('alert').appendChild(div)

  //setting timeout to remove the search alert
  setTimeout(()=>div.remove(),3000)
}
//highlighting active links here
function highlightActiveLink(){
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link)=>{
        if(link.getAttribute('href')=== global.currentPage){
            link.classList.add('active')
        }
    })
}
//showing spinner while awaiting response
function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}
//hide spinner after getting response
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')
}
//function that adds commas to a number
function addCommas(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
}
//routing all pages
function init(){
    switch(global.currentPage){
        case '/':
        case '/index.html':
            fetchPopularMovies();
            break;
        case '/shows.html':
            fetchPopularShows();
            break;
        case '/movie-details.html':
            displayMovieDetails();
            break;
        case '/tv-details.html':
            displayShowDetails();
            break;
        case '/search.html':
          search();
          displayMovieDetails();
          displayShowDetails();
          break;
    }
    highlightActiveLink();
}
document.addEventListener('DOMContentLoaded',init)