// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { searchToSession } from './main';
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { renderDetails } from './components/render-showcase-component';

let  { events } = data;

renderNavigation("nav");

renderSearchRibbon();

let eventIdDetails = sessionStorage.getItem("id");
let previousPage = sessionStorage.getItem("previousPage");
// console.log(eventIdDetails, previousPage);
sessionStorage.removeItem("id");
sessionStorage.removeItem("previousPage");

let displayDetails = document.getElementById('displayDetails');

let event = events.filter(event=>event._id==eventIdDetails)[0];
displayDetails.innerHTML = renderDetails(event, previousPage);

const searchButton = document.getElementById("searchButton");
searchButton.disabled = false;
searchButton.addEventListener("click", e => {
    // e.preventDefault();
    window.location.href = previousPage;
    // console.log(e);
});

