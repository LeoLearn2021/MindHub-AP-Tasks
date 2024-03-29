// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { getData, getCategories } from './main';
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { renderDetails } from './components/render-showcase-component';

getData().then((data) => {
    console.log(data);

    let { events, currentDate } = data;

    const CATEGORIES = getCategories(events);

    renderNavigation("nav");

    renderSearchRibbon(events, currentDate, CATEGORIES, landing = true);

    let eventIdDetails = sessionStorage.getItem("id");
    let previousPage = sessionStorage.getItem("previousPage") != null ? sessionStorage.getItem("previousPage") : "./index.html";

    // console.log(eventIdDetails, previousPage);
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("previousPage");

    let displayDetails = document.getElementById('displayDetails');

    let event = events.filter(event => event._id == eventIdDetails)[0];
    displayDetails.innerHTML = renderDetails(event, previousPage);

    const searchButton = document.getElementById("searchButton");
    searchButton.disabled = false;
    searchButton.addEventListener("click", e => {
        // e.preventDefault();
        window.location.href = previousPage;
        // console.log(e);
    });

});
