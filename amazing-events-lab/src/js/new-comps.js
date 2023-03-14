// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon, listenToSearchParams } from './components/ribbon-component';
import { CATEGORIES, selectEvents } from './main';
import { renderShowCase } from './components/render-showcase-component';
import { getSearchParams } from './components/ribbon-component';

let { events } = data;
let newCompEvents = selectEvents(events, { catEvents: getSearchParams().categorySelection});

renderNavigation("nav");

renderSearchRibbon("searchRibbon", CATEGORIES);

renderShowCase(newCompEvents, "cardsShow"); // Show all events for this page selected up.

listenToSearchParams(selectEvents(events), "searchRibbon", "change", "keyup");


// console.log( JSON.parse(sessionStorage.searchParams) );
console.log( JSON.parse(sessionStorage.searchParams) );

window.addEventListener("storage", e => {
    if(e.storageArea===sessionStorage){
        alert('change');
      }
    console.log( JSON.parse(sessionStorage.searchParams) );
});