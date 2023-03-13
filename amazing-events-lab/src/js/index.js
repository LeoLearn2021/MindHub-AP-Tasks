
import {renderShowCase, selectEvents, cardShow, getDetailsButtonsListen, renderSelectCategory, CATEGORIES} from './main'
import { renderNavigation } from './components/nav-component';
let { events } = data;

renderNavigation("nav");

renderSelectCategory("catForm");

let allEvents = selectEvents(events); 

renderShowCase(allEvents, cardShow); // Show all events
console.log(allEvents.length);

getDetailsButtonsListen('div .card a');
