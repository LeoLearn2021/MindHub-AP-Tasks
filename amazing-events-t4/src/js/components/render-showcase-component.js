
import { selectEvents, getDetailsButtonsListen, searchToSession } from '../main';
import emptyStage from "url: ../../../assets/img-sources/emptyStage2.jpg";

// Rendering events Showcase con resultado de búsquedas:
export function renderShowCase(filteredEvents) {
    const cardShow = document.getElementById("cardsShow");
    if (filteredEvents.length == 0){
        cardShow.innerHTML = renderNoEvent;
        return;
    };
    cardShow.innerHTML = "";
    for (let event of filteredEvents) {
        const card = createCard(event);
        cardShow.appendChild(card);
     //console.log(event.date, event.category);
    }

    getDetailsButtonsListen('div .card a');
}

// Rendering events updating selection of events
export const updateShow = (events, currentDate, searchParams) => {
    let currentPage = window.location.pathname;
    // console.log(currentPage);    
    switch (currentPage){
        case "/index.html":
            // console.log(searchParams);
            // console.log(events);
            filteredEvents = selectEvents(events,{
                catEvents: searchParams.categorySelection,
                textSearch: searchParams.findEventText,
                },
                currentDate);
            break;
        case "/upcoming.html":
            filteredEvents = selectEvents(events,{
                upcoming: true,
                catEvents: searchParams.categorySelection,
                textSearch: searchParams.findEventText,
                },
                currentDate);
            break;
        case "/past.html":
            filteredEvents = selectEvents(events,{
                past:true,
                catEvents: searchParams.categorySelection,
                textSearch: searchParams.findEventText,
                },
                currentDate);
            break;
        case "/details.html":
            // TO DO !!!!!!!!!!!!! Create functionality
         // console.log(searchParams);
            searchToSession.setSearchParams(searchParams);
            return;
        case "/new-comps.html":
         // console.log(searchParams);
            filteredEvents = selectEvents(events,{
                past:true,
                catEvents: searchParams.categorySelection,
                textSearch: searchParams.findEventText,
                },
                currentDate);
            break;
        default:
            filteredEvents = selectEvents(events,{
                catEvents: searchParams.categorySelection,
                textSearch: searchParams.findEventText,
                },
                currentDate);
    }
    renderShowCase(filteredEvents);
};  

// Render card function
function createCard(event) {
    // card
    let s_card = document.createElement('div');
    s_card.classList.add('s-card');
    let card = document.createElement("div");
    card.classList.add("card", "m-4", "text-bg-dark", "text-center", "rgb");
    // card image
    let img = document.createElement("img");
    img.src = event.image;
    img.alt = `${event.name} picture`
    img.classList.add("card-image");
    // card body
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = event.name;
    const cardText = document.createElement("p");
    cardText.classList.add("card-text");
    cardText.innerText = event.description;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    // card footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer", "shadow");
    const cardFooterContent = document.createElement("div");
    cardFooterContent.classList.add("d-flex", "justify-content-around");
    const eventPrice = document.createElement("p");
    eventPrice.innerText = `Price: $${event.price}`;
    const more = document.createElement("a");
    more.classList.add("btn", "btn-primary", "card-btn", "shadow", "details");
    more.innerText = "Tell me more";
    more.href = "./details.html";
    more.setAttribute("id", event._id);
    cardFooterContent.appendChild(eventPrice);
    cardFooterContent.appendChild(more);
    cardFooter.appendChild(cardFooterContent);
    // Armado del card
    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);
    s_card.appendChild(card);
    return s_card;
}


// Render Details function (use function declaration to allow hoisting)
const renderNoEvent = `<h2 class="text-center">Woops!...</h2>
                      <div class="d-flex justify-content-around flex-wrap">
                          <!--Card Details -->
                          <div class="d-card">
                              <div class="card m-2 text-bg-dark text-center rgb">
                                  <img src=${emptyStage} alt="Empty Stage picture"/>
                              </div>
                          </div>
                          <div class="d-card">
                              <div class="card m-2 text-bg-dark text-center">
                                  <div class="card-body">
                                      <h5 class="card-title">No event found!</h5>
                                      <p class="card-text">Please refine you query to find something Amazing!</p>                                      
                                  </div>
                              </div>
                          </div>
                          <!--Card Details -->
                      </div>`;

// Render Details function (use function declaration to allow hoisting)
export function renderDetails(event, previousPage="./index.home") {
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
