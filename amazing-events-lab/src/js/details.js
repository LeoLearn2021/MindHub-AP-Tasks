// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderDetails, renderSelectCategory } from './main';
import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';

let  { events } = data;

renderNavigation("nav");

renderSearchRibbon("searchRibbon");

renderSelectCategory("catForm");

let eventIdDetails = sessionStorage.getItem("id");
let previousPage = sessionStorage.getItem("previousPage");
console.log(eventIdDetails, previousPage);

let displayDetails = document.getElementById('displayDetails');

let event = events.filter(event=>event._id==eventIdDetails)[0];
displayDetails.innerHTML = renderDetails(event, previousPage);
