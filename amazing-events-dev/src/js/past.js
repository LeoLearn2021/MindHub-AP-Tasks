
import {renderShowCase,selectEvents, cardShow} from './main'

let { events } = data;

let pastEvents = selectEvents(events, {past:true}); 
renderShowCase(pastEvents, cardShow); // Showing Past events
console.log(pastEvents.length);