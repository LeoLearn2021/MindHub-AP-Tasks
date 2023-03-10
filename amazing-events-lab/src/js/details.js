// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderDetails } from './main'

let  { events } = data;

let eventIdDetails = sessionStorage.getItem("id");
let previousPage = sessionStorage.getItem("previousPage");
console.log(eventIdDetails, previousPage);

let displayDetails = document.getElementById('displayDetails');

let event = events.filter(event=>event._id==eventIdDetails)[0];
displayDetails.innerHTML = renderDetails(event, previousPage);
