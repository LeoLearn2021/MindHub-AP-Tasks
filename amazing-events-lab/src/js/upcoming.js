
import {renderShowCase, selectEvents, getDetailsButtonsListen, CATEGORIES} from './main'
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';

let { events } = data;

renderNavigation("nav");

renderSearchRibbon("searchRibbon", CATEGORIES);

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, "cardsShow"); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');