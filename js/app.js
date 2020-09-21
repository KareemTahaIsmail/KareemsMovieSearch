var API_KEY = "9502c598c779d0c49e032d70c52627ef";

const url =
  "https://api.themoviedb.org/3/search/movie?api_key=9502c598c779d0c49e032d70c52627ef&query=";

//Getting input from search
const inputValue = document.getElementById("search-bar");
const searchResult = document.getElementById("search-result-container");

const modalRelatedContent = document.getElementById("modalRelatedContent");

///////////////////////////////// SEARCH Result //////////////////////////////////////////
/* 


<div class="col-md-4 col-sm-6">
           <div class="grid-item">
               <a href="#" data-toggle="modal" data-target="#modalRelatedContent"><div class="thumb">
                   <div class="hover-effect">
                       <div class="hover-content">
                           <h1>Rush Hour <i class="far fa-registered"></i></h1>
                           <p>Comedy, Action</p>
                       </div>
                   </div>
                   <div class="grid-image">
                       <img src="https://wallpapercave.com/wp/wp3896795.jpg">
                   </div>
               </div></a>
           </div>
       </div>

*/

/* 

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!      MODAL ///////////////////////////////

<div class="modal-content">
      <!--Header-->
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" style="font-size: 40px; color:white;">&times;</span>
      </button>
      <div class="modal-header" style="background-color: black;">
        <h1 class="heading" style="color: white;">Joker</h1>

        
      </div>

      <!--Body-->
      <div class="modal-body" style="background-color: black;">

        <div class="row">
          <div class="col-5">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/t433PEQGErc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>

          <div class="col-7" style="color: white;">
            <p><strong>Summary:</strong></p>
            <p>Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker.</p>
            <button type="button" class="btn addToList-btn">Add To List</button>

          </div>
        </div>
      </div>
    </div>

*/

// TOP-RATED !!!!!!!!!!!!! ///////////////////////////////////////////////////////////

/*

<div class="item">
        
        <div class="item-content">
        <h4>Joker</h4>
         <!-- <button type="button" class="btn readmore-btn">Read More</button>
         <button type="button" class="btn btn-warning watchlist-btn">Add To Watchlist</button> -->
      </div>
        <img class="item-img"
          src="https://images.hdqwalls.com/wallpapers/joker-2019-movie-4k-g0.jpg"
        />
      </div>

*/

window.onload = function() {
    popularMovies();
    topMovies();
  };

var stringToHTML = function (str) {

	// If DOMParser is supported, use it
	if (support) {
		var parser = new DOMParser();
		var doc = parser.parseFromString(str, 'text/html');
		return doc.body;
	}

	// Otherwise, fallback to old-school method
	var dom = document.createElement('div');
	dom.innerHTML = str;
	return dom;

};

function popularMovies() {
  const popularURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=9502c598c779d0c49e032d70c52627ef&language=en-US&page=1";
    

    const popularsection = document.getElementById("grid-popular");
 
    fetch(popularURL)
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results;
        $.each(movies, (index, movie) => {
       let output = '';
          output += `
          <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" data-toggle="modal" data-target="#modalRelatedContent" onclick="setModal(${movie.id})">
          <div class="middle">
          <div class="text">${movie.original_title}</div>
          <p style="color:white;">Click to learn more.</p>
        </div>
          `;
             console.log(index);
             popularsection.innerHTML += output;
        });
      
      });
}


function topMovies() {
  const topURL =
    "https://api.themoviedb.org/3/movie/top_rated?api_key=9502c598c779d0c49e032d70c52627ef&language=en-US&page=1";
  const topsection = document.getElementById("grid-top");
 
  fetch(topURL)
    .then((response) => response.json())
    .then((data) => {
      let movies = data.results;
      $.each(movies, (index, movie) => {
     let output = '';
        output += `
        <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}" data-toggle="modal" data-target="#modalRelatedContent" onclick="setModal(${movie.id})">
        <div class="middle">
    <div class="text">${movie.original_title}</div>
    <p style="color:white;">Click to learn more.</p>
  </div>
        `;
           console.log(index);
           topsection.innerHTML += output;
      });
    
    });
  
}

function setModal(movieID) {
  const movieURL =
    "https://api.themoviedb.org/3/movie/" +
    movieID +
    "?api_key=9502c598c779d0c49e032d70c52627ef&language=en-US";
  const vidUrl =
    "https://api.themoviedb.org/3/movie/" +
    movieID +
    "/videos?api_key=9502c598c779d0c49e032d70c52627ef&language=en-US";

  let youtubeVidUrl = "";
  fetch(vidUrl)
    .then((response) => response.json())
    .then((data) => {
      let vids = data.results;
      $.each(vids, (index, video) => {
        if (video.site == "YouTube") {
          youtubeVidUrl +=
            '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
            video.key +
            '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        }
      });
    });

  fetch(movieURL)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data: ", data);
      let movie = data;
      let output = "";
      output += `
          <div class="modal-content">
      <!--Header-->
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true" style="font-size: 40px; color:white;">&times;</span>
      </button>
      <div class="modal-header" style="background-color: black;">
        <h1 class="heading" style="color: white;">${movie.original_title}</h1>
        <p class="heading" style="color: white;">${
          (movie.genres[0].name, movie.genres[1].name)
        }</p>

        
      </div>

      <!--Body-->
      <div class="modal-body" style="background-color: black;">

        <div class="row">
          <div class="col-5">
            ${youtubeVidUrl}
          </div>

          <div class="col-7" style="color: white;">
            <p><strong>Summary:</strong></p>
            <p>${movie.overview}</p>
            <p><strong>Released:</strong></p>
            <p>${movie.release_date}</p>
            <button type="button" class="btn addToList-btn">Add To List</button>

          </div>
        </div>
      </div>
    </div>
          
          `;
      modalRelatedContent.innerHTML = output;
    })

    .catch((error) => {
      console.log("Error: ", error);
    });

  console.log("Value: ", value);
}

function showResults() {
  const newUrl = url + inputValue.value;

  fetch(newUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log("Data: ", data);
      let movies = data.results;
      let output = "";
      $.each(movies, (index, movie) => {
        let rated = "block";
        if (!movie.adult) {
          rated = "none";
        }
        output += `
          <div class="col-md-4 col-sm-6">
           <div class="grid-item">
               <a href="#" data-toggle="modal" data-target="#modalRelatedContent" onclick="setModal(${movie.id})"><div class="thumb">
                   <div class="hover-effect">
                       <div class="hover-content">
                           <h1>${movie.original_title}</h1><i class="far fa-registered" style="display: ${rated};"></i>
                           <p><i class="fas fa-star"></i> ${movie.vote_average}</p>
                       </div>
                   </div>
                   <div class="grid-image">
                       <img src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}">
                   </div>
               </div></a>
           </div>
       </div>
          `;
        searchResult.innerHTML = output;
      });
    })
    .catch((error) => {
      console.log("Error: ", error);
    });

  console.log("Value: ", value);
}
