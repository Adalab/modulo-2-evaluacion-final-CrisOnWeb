'use strict';
// QUERY SELECTORS
const searchBtn = document.querySelector('.js_searchBtn');
const searchInput = document.querySelector('.js_searchInput');
const resultsUl = document.querySelector('.js_resultsUl');

//VARIABLES GLOBALES
let searchedSeries = [];
const favoriteSeries = [];

// FUNCIONES
function getSeriesDataFromAPI(searchedItem) {
  fetch(`//api.tvmaze.com/search/shows?q=${searchedItem}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchedSeries = data.map((serie) => {
        return {
          id: serie.show.id,
          name: serie.show.name,
          // Si la API tiene imagen, guarda la medium y si no tiene imagen, guarda imagen default
          image: serie.show.image
            ? serie.show.image.medium
            : 'https://placehold.co/210x295/e0fbfc/5f9ea0/?text=TV',
        };
      });
      console.log(searchedSeries);

      renderAllSeries(searchedSeries);
    })
    .catch((error) => console.error(error));
}

function renderOneSerie(dataSerie) {
  // Creación del <li>
  const liSerie = document.createElement('li');
  liSerie.classList.add('results__item');
  liSerie.dataset.id = `${dataSerie.id}`;
  resultsUl.appendChild(liSerie);

  // Creación de la <img>
  const imgSerie = document.createElement('img');
  imgSerie.classList.add('results__img');
  imgSerie.src = `${dataSerie.image}`;
  imgSerie.alt = `${dataSerie.name}`;
  liSerie.appendChild(imgSerie);

  // Creación del <p>
  const titleSerie = document.createElement('p');
  titleSerie.classList.add('results__text');
  const textTitle = document.createTextNode(`${dataSerie.name}`);
  titleSerie.appendChild(textTitle);
  liSerie.appendChild(titleSerie);
}

function renderAllSeries(dataSeries) {
  dataSeries.forEach((serie) => {
    renderOneSerie(serie);
  });
}

//FUNCIONES DE EVENTOS
function handleClickSearchBtn(event) {
  event.preventDefault();
  const searchedValue = searchInput.value.trim();
  console.log(searchedValue);

  getSeriesDataFromAPI(searchedValue);
}

//EVENTOS
searchBtn.addEventListener('click', handleClickSearchBtn);

// CÓDIGO DE INICIO
