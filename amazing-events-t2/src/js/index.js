
import {eventsData, renderShowCase,selectEvents, cardShow} from './main'

let { currentDate, events } = data;

let allEvents = selectEvents(events); 
renderShowCase(allEvents, cardShow); // Muestra Upcomming events
console.log(allEvents.length);