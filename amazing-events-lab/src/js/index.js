
import {renderShowCase, selectEvents, cardShow, getDetailsButtonsListen} from './main'

let { events } = data;

let allEvents = selectEvents(events); 

renderShowCase(allEvents, cardShow); // Show all events
console.log(allEvents.length);

getDetailsButtonsListen('div .card a');
