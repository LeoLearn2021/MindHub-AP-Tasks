
import {renderShowCase,selectEvents, cardShow, getDetailsButtonsListen, renderSelectCategory} from './main'
import { renderNavigation } from './components/nav-component';

let { events } = data;

renderNavigation("nav");

renderSelectCategory("catForm");

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');