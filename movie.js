document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  const token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZWNkNmM5OTE2YzM4MzQyZDA5NDIyZmE2ZDViMjgwYyIsIm5iZiI6MTczOTUxMzAwNi44ODYwMDAyLCJzdWIiOiI2N2FlZGNhZTZkMWE3YjYwNTIzYjU5N2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z7-i8ep4YlWqLy_BQWlEWIsoCA7bhj2kq0axLZTTgnE";
  if (btn) {
    btn.addEventListener("click", () => {
      window.location.href = "movie.html";
    });
  } else {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //page:1,results(영화정보를 담은 배열),totalpages,totalrelsults 등 모든 정보를 포함한 객체체
        const movies = data.results; //data중 영화정보를 담은 배열 즉 result만 movies로 추출
        const cardContainer = document.getElementById("container");
        //먼저 각각의 card를 담을 container선언
        movies.forEach((movie) => {
          //movie는 results배열안에 있는 영화정보를 담고있는 객체체
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = ` language=ko-KR
                           <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" >
                            <div class="info">
                            <h3>${movie.title}</h3>
                             <p>평점:${movie.vote_average}</p>
                             <p>개봉일:${movie.release_date}</p>
                            </div>
                            `;

          cardContainer.appendChild(card);
        });
      })
      .catch((err) => console.error(err));
  }
});
