const navBarList = document.querySelectorAll(".nav-bar-element");
const containerMyList = document.getElementById("list")
const containerTrending = document.getElementById("em-alta");
const containerSeries = document.getElementById("series");
const containerMovies = document.getElementById("filmes");

navBarList.forEach( (element, index) => {
    let aux = "";

    if (index === 0) {
        aux = containerMyList;
    } else if (index === 1) {
        aux = containerTrending;
    } else if (index === 2) {
        aux = containerSeries;
    } else if (index === 3) {
        aux = containerMovies;
    }

    element.addEventListener("click", event => {
        event.preventDefault();
        window.scrollTo({
        top: aux.offsetTop  - (window.innerHeight * 0.1),
        behavior: "smooth"
        });
    });
});
