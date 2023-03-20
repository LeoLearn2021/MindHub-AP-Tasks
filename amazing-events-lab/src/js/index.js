// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { renderShowCase, updateShow } from './components/render-showcase-component';
import { selectEvents, getDetailsButtonsListen, searchToSession } from './main';

let { events } = data;
let searchParams = searchToSession.getSearchParams()
// searchToSession.setSearchParams(searchParams);
let homeEvents = selectEvents(
  events, {
    catEvents: searchParams.categorySelection,
    textSearch: searchParams.findEventText,
  });

renderNavigation("nav");
console.log(searchParams);
sessionStorage.getItem("searchParams") == null ?
renderShowCase(homeEvents) :
updateShow(searchParams, homeEvents);

renderSearchRibbon(landing=true);

getDetailsButtonsListen('div .card a');

// console.log( JSON.parse(sessionStorage.searchParams) );

// addEventListener("storage", event => {
//     console.log( JSON.parse(sessionStorage.searchParams) );
// });

// window.addEventListener("storage", e => {
//     if(e.storageArea===sessionStorage){
//         alert('change');
//       }
//     console.log( JSON.parse(sessionStorage.searchParams) );
// });