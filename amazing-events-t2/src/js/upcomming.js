
import {eventsData, renderShowCase,selectEvents, cardShow} from './main'

let { currentDate, events } = data;

let upcommingEvents = selectEvents(events, {upcomming:true}); 
renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
console.log(upcommingEvents.length);