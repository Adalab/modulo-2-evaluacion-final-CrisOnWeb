'use strict';
/* POSIBLES MEJORAS:
  - Refactorizar
*/

// QUERY SELECTORS
const searchBtn = document.querySelector('.js_searchBtn');
const searchInput = document.querySelector('.js_searchInput');
const resultsUl = document.querySelector('.js_resultsUl');
const favoritesUl = document.querySelector('.js_favoritesUl');
const removeAllFavoritesBtn = document.querySelector('.js_favoritesRemoveAll');

//VARIABLES GLOBALES
let searchedSeries = [];
let favoriteSeries = [];

// FUNCIONES
function getSeriesDataFromAPI(searchedItem) {
  fetch(`//api.tvmaze.com/search/shows?q=${searchedItem}`)
    .then((response) => response.json())
    .then((data) => {
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

      renderAllSeries(searchedSeries);
    })
    .catch((error) => console.error(error));
}

function renderOneSerie(dataSerie) {
  // Busca en favoritos si existe la serie
  const favsIndex = favoriteSeries.findIndex(
    (serie) => serie.id === dataSerie.id,
  );

  // Creación de la clase para favoritos solo si se encuentra en favoritos
  const favClass = favsIndex !== -1 ? 'results__item--favorite' : '';

  // Creación del <li>
  const liSerie = document.createElement('li');
  liSerie.classList.add('js_resultsLi', 'results__item');
  // Añade la clase solo si favClass no es falsy (está vacío)
  if (favClass) {
    liSerie.classList.add(favClass);
  }
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
  resultsUl.innerHTML = '';

  dataSeries.forEach((serie) => {
    renderOneSerie(serie);
  });
}

function renderOneFav(dataFav) {
  // Creación de <li>
  const liFav = document.createElement('li');
  liFav.classList.add('favorites__item');
  liFav.dataset.id = `${dataFav.id}`;
  favoritesUl.appendChild(liFav);

  // Creación de <img>
  const imgFav = document.createElement('img');
  imgFav.classList.add('favorites__img');
  imgFav.src = `${dataFav.image}`;
  imgFav.alt = `${dataFav.name}`;
  liFav.appendChild(imgFav);

  // Creación de <p>
  const titleFav = document.createElement('p');
  titleFav.classList.add('favorites__text');
  const textTitle = document.createTextNode(`${dataFav.name}`);
  titleFav.appendChild(textTitle);
  liFav.appendChild(titleFav);

  //Creación de <button>
  const btnFav = document.createElement('button');
  btnFav.classList.add('favorites__btn');
  btnFav.ariaLabel = 'Eliminar de favoritos';
  btnFav.innerHTML = `
    <svg
      class="icon-heart"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e0fbfc">
      <path
        d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/>
    </svg>

    <svg
      class="icon-broken"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e0fbfc">
      <path
        d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"/>
    </svg> `;
  liFav.appendChild(btnFav);
}

function renderAllFavourites(dataFavs) {
  favoritesUl.innerHTML = '';

  dataFavs.forEach((serie) => {
    renderOneFav(serie);
  });
}

// Trae los datos de localStorage a la página
function getFromLocalStorage() {
  const localStorageFavs = localStorage.getItem('favs');

  if (localStorageFavs !== null) {
    favoriteSeries = JSON.parse(localStorageFavs);
  }
}

// Guarda los datos en el localStorage solo si el array tiene elementos
function setInLocalStorage() {
  if (favoriteSeries.length === 0) {
    localStorage.removeItem('favs');
  } else {
    const stringifyFavSeries = JSON.stringify(favoriteSeries);
    localStorage.setItem('favs', stringifyFavSeries);
  }
}

// Añadir un favorite al array
function addFavorite(clickedSerie) {
  favoriteSeries.push(clickedSerie);
}

// Eliminar un favorite del array
function removeFavorite(clickedId) {
  const favIndex = favoriteSeries.findIndex((serie) => serie.id === clickedId);
  favoriteSeries.splice(favIndex, 1);
}

// Añadir o eliminar del array
function toggleFavorite(clickedSerie) {
  const favIndex = favoriteSeries.findIndex(
    (serie) => serie.id === clickedSerie.id,
  );

  if (favIndex === -1) {
    // Si no está, lo añade
    addFavorite(clickedSerie);
  } else {
    // Si está, lo borra
    removeFavorite(clickedSerie.id);
  }
}

//FUNCIONES DE EVENTOS
function handleClickSearchBtn(event) {
  event.preventDefault();
  const searchedValue = searchInput.value.trim();

  getSeriesDataFromAPI(searchedValue);
}

function handleToggleFavorite(event) {
  // Encontrar el li clicado en el ul
  const clickedLi = event.target.closest('li');

  // Si hace click fuera de un <li> (null)
  if (!clickedLi) {
    return;
  }

  // Extraer el id del li clicado
  const clickedId = parseInt(clickedLi.dataset.id);

  // Para saber si el click viene del botón de favoritos
  const isFavoriteList = clickedLi.closest('.favorites');

  if (isFavoriteList) {
    // El click viene de favorites
    // encontrar el botón al que se ha clickado
    const btn = event.target.closest('.favorites__btn');
    // De no clicarse en el botón, no hace nada
    if (!btn) {
      return;
    }
    removeFavorite(clickedId);
  } else {
    // El click viene de results
    // Encontrar el elemento en el array de searchedSeries
    const clickedSerie = searchedSeries.find((serie) => serie.id === clickedId);

    toggleFavorite(clickedSerie);
  }
  setInLocalStorage();

  renderAllFavourites(favoriteSeries);
  renderAllSeries(searchedSeries);
}

function handleRemoveAllFavorites() {
  favoriteSeries = [];

  setInLocalStorage();

  renderAllFavourites(favoriteSeries);
  renderAllSeries(searchedSeries);
}

//EVENTOS
searchBtn.addEventListener('click', handleClickSearchBtn);
resultsUl.addEventListener('click', handleToggleFavorite);
favoritesUl.addEventListener('click', handleToggleFavorite);
removeAllFavoritesBtn.addEventListener('click', handleRemoveAllFavorites);

// CÓDIGO DE INICIO
getFromLocalStorage();
renderAllFavourites(favoriteSeries);
