
import {renderShowCase, selectEvents, getDetailsButtonsListen, renderSelectCategory, CATEGORIES} from './main'
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';

let { events } = data;
let allEvents = selectEvents(events);

renderNavigation("nav");

renderSearchRibbon("searchRibbon");

renderSelectCategory("catForm"); 

renderShowCase(allEvents, "cardsShow"); // Show all events
console.log(allEvents.length);

getDetailsButtonsListen('div .card a');
