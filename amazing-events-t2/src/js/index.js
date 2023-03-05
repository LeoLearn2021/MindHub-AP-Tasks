
import {renderShowCase,selectEvents, cardShow} from './main'

let { events } = data;

let allEvents = selectEvents(events); 
renderShowCase(allEvents, cardShow); // Show all events
console.log(allEvents.length);