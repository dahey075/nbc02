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

    // //search상자, 버튼 위치 가져오기
    // const searchInput = document.getElementById("searchInput");
    // const searchBtn = document.getElementById("searchBtn");

    // //검색 함수
    // function search() {

    //   let scan = searchInput.value.toLowerCase();
    //   console.log(scan.toLowerCase());

    //   console.log(movieData[0].title);

    //   movieData.forEach(movie => {
    //     let movieTitle = movie.title;

    //   });

    // }

    // //검색버튼 클릭시 search 함수 호출
    // searchBtn.addEventListener('click', () => {
    //   search();
    // })


  })

  .catch(err => console.error(err));



