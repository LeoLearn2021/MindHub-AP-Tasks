// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { renderShowCase, updateShow } from './components/render-showcase-component';
import { selectEvents, getDetailsButtonsListen, searchToSession } from './main';

let { events } = data;
let searchParams = searchToSession.getSearchParams()
// searchToSession.setSearchParams(searchParams);
let upcomingEvents = selectEvents(
  events, {
    upcoming: true,
    catEvents: searchParams.categorySelection,
    textSearch: searchParams.findEventText,
  });

renderNavigation("nav");
// console.log(searchParams);
sessionStorage.getItem("searchParams") == null ?
renderShowCase(upcomingEvents) :
updateShow(searchParams, upcomingEvents);

renderSearchRibbon();

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