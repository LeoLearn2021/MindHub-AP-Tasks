
import {renderShowCase,selectEvents, cardShow, getDetailsButtonsListen, renderSelectCategory} from './main'

let { events } = data;

renderSelectCategory("catForm");

let pastEvents = selectEvents(events, {past:true}); 
renderShowCase(pastEvents, cardShow); // Showing Past events
console.log(pastEvents.length);

getDetailsButtonsListen('div .card a');