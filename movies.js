const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjc4OGU0MTExZTlmMTFjNGY5YjZlZjAyNWMyNjQ1YiIsInN1YiI6IjY1MmYyYzI1YTgwMjM2MDEzNzY4OGZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pp3g7ZQXSYdxXHh4x2C0iAQQ3l0PRtIJ5A3n4lNwbfs'
  }
};

//HTML에서 movieList를 표시할 위치 가져오기
const movieList = document.getElementById("movieList");


fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  //응답을 json형식으로
  .then(response => response.json())
  .then(response => {
    console.log(response);
    let movieData = response["results"];
    console.log(movieData);


    //movieData를 movie(화살표함수)의 매개변수로 받고, foreach문을 통해 반복해서 호출
    movieData.forEach(movie => {
      //영화 카드 생성
      const movieCards = document.createElement("div");

      //영화 포스터 생성
      const image = document.createElement("img");
      image.src = `https://image.tmdb.org/t/p/w200/${movie.poster_path}`;
      //이미지 클릭시 alert 이벤트 
      image.addEventListener("click", function () {
        alert(`id : ${movie.id}`);
      });
      //movieCards에 image 연결
      movieCards.appendChild(image);

      //영화 제목 생성
      const title = document.createElement("h2");
      title.textContent = movie.title;
      movieCards.appendChild(title);

      //영화 줄거리 생성
      const plot = document.createElement("div");
      plot.textContent = movie.overview;
      movieCards.appendChild(plot);

      //영화 평점 생성
      const rating = document.createElement("div");
      rating.textContent = `Rating: ${movie.vote_average}`;
      movieCards.appendChild(rating);

      movieList.appendChild(movieCards);


    });

    //search상자, 버튼 위치 가져오기
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    //검색 함수
    function search() {
      // console.log("확인서치");

      //searchInput 입력값을 소문자로 변환하고 변수 scan에 할당
      let scan = searchInput.value.toLowerCase();
      //빈 배열 array 선언
      let array = []; 

      console.log(scan);

      //newMovieCard 선언 후 표시할 위치 가져오기
      const newMovieCard = document.getElementById("movieList");
      //newBox 선언 후 div 생성
      let newBox = document.createElement("div");
      newBox.className = "box";

      //movieList에 자식노드가 있으면 삭제 
      while (movieList.firstChild) {
        // console.log("확인삭제");
        movieList.removeChild(movieList.firstChild);
      }

      //scan값을 포함한 movieData.title 값 반복해서 찾기
      for (let i = 0; i < 20; i++) {
        if (movieData[i].title.toLowerCase().includes(scan)) {

          array.push(movieData[i]); //찾으면 array에 넣기
          console.log("array =>" + array);
          //newBox 요소 생성
          newBox.innerHTML = `
              <a class="imge"><img src="https://image.tmdb.org/t/p/w200/${movieData[i].poster_path}"</a>
              <h2>${movieData[i].title}</h2>
              <div>${movieData[i].title}</div>
              <div>${movieData[i].overview}</div>
              <div>Rating : ${movieData[i].vote_average}</div>`;   


          //찾은 영화 화면에 표시

           newMovieCard.appendChild(newBox);
         console.log("확인2");

        }
      }




    }

    //검색버튼 클릭시 search 함수 호출
    searchBtn.addEventListener('click', () => {
      // console.log("확인클릭");
      search();
    })


  })

  .catch(err => console.error(err));