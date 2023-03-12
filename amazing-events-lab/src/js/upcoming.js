
import {renderShowCase,selectEvents, cardShow, getDetailsButtonsListen, renderSelectCategory} from './main'
import { renderNavigation } from './navComponent';

let { events } = data;

renderNavigation();

renderSelectCategory("catForm");

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');