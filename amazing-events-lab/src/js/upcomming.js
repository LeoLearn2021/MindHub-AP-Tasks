
import {renderShowCase,selectEvents, cardShow, getDetailsButtonsListen, renderSelectCategory} from './main'

let { events } = data;

renderSelectCategory("catForm");

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');