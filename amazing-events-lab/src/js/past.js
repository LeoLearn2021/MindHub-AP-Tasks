
import {renderShowCase, selectEvents, getDetailsButtonsListen, renderSelectCategory} from './main'
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';

let { events } = data;

renderNavigation("nav");

renderSearchRibbon("searchRibbon");

renderSelectCategory("catForm");

let pastEvents = selectEvents(events, {past:true}); 
renderShowCase(pastEvents, "cardsShow"); // Showing Past events
console.log(pastEvents.length);

getDetailsButtonsListen('div .card a');