// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { renderShowCase, updateShow } from './components/render-showcase-component';
import { getData, selectEvents, getDetailsButtonsListen, searchToSession } from './main';

getData().then((data) => {
  console.log(data);

  let { events, currentDate } = data;

  let searchParams = searchToSession.getSearchParams()
  let newCompEvents = selectEvents(
    events, {
    upcoming: true,
    catEvents: searchParams.categorySelection,
    textSearch: searchParams.findEventText,
    },currentDate
  );

  renderNavigation("nav");
  console.log(searchParams);
  sessionStorage.getItem("searchParams") == null ?
    renderShowCase(newCompEvents) :
    updateShow(searchParams, newCompEvents, currentDate);

  renderSearchRibbon(events, landing = true);

  getDetailsButtonsListen('div .card a');

});

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