// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderSelectCategory } from './main';
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


// Render Details function (use function declaration to allow hoisting)
function renderDetails(event, previousPage="./index.home") {
    let render='';
    if (!event){
      render = `<h2 class="text-center">Not able to retrieve info at the moment, please try later.</h2>` 
    } else {
      render = `<h2 class="text-center">Details Page</h2>
                      <div class="d-flex justify-content-around flex-wrap">
                          <!--Card Details -->
                          <div class="d-card">
                              <div class="card m-2 text-bg-dark text-center rgb">
                                  <img src="${event.image}" alt="${event.name} picture"/>
                              </div>
                          </div>
                          <div class="d-card">
                              <div class="card m-2 text-bg-dark text-center">
                                  <div class="card-body">
                                      <h5 class="card-title">${event.name}</h5>
                                      <p class="card-text">${event.description}</p>
                                      <p class="card-text">
                                          Place: ${event.place}
                                      </p>
                                      <p class="card-text">
                                          Capacity: ${event.capacity}
                                      </p>
                                      <p class="card-text">Price: $${event.price}</p>
                                      <a href="${previousPage}" type="button" class="shadow">Keep looking...</a>
                                  </div>
                              </div>
                          </div>
                          <!--Card Details -->
                      </div>`
    }
    return render;
  } 
