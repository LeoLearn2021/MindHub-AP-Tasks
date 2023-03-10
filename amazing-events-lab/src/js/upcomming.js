
import {renderShowCase,selectEvents, cardShow, getDetailsButtonsListen} from './main'

let { events } = data;

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
console.log(upcommingEvents.length);

getDetailsButtonsListen('div .card a');