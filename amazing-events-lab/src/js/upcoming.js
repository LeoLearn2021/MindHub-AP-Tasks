
import {renderShowCase, selectEvents, getDetailsButtonsListen, renderSelectCategory} from './main'
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';

let { events } = data;

renderNavigation("nav");

renderSearchRibbon("searchRibbon");

renderSelectCategory("catForm");

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, "cardsShow"); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');