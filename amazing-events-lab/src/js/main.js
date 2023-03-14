// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// console.log(data);
// console.log(data_local);
let { currentDate, events } = data;

export const CATEGORIES = getCategories(events);
// console.log(CATEGORIES);

// Function that returns events divided in upcomming and past events according to current date.
const getUpcommingPastEvents = (events, currentDate) => {
  let eventsDivided = {
    upcommingEvents : [],
    pastEvents : [],
  }
  for (let event of events) {
    if (Date.parse(event.date) > Date.parse(currentDate)) {
      eventsDivided.upcommingEvents.push(event);
    } else {
      eventsDivided.pastEvents.push(event);
    }
  }
  return eventsDivided;
}

// Get categories functionality
function getCategories(events) {
  let categories = [];
  for (let event of events) {
    if (!categories.includes(event.category)) {
      categories.push(event.category);
    }
  }
  return categories;
}

// let {upcommingEvents, pastEvents} = getUpcommingPastEvents(events, currentDate);
// console.log(upcommingEvents.length, pastEvents.length);

// Función para seleccionar eventos (categoría, fechas, upcomming, past, etc).
// Función retorna eventos ordenados por fecha.
// Eventualmente puede aceptar distintas currentDate para seleccionar diferente corte.
// Destructured parameter with default value assignment -- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
export const selectEvents = (events, {upcomming=false, past=false, catEvents=[], textSearch=""}={}, currentD=currentDate) => {
  //Función de discriminación de eventos por categoría.
  let result = [];
  console.log(catEvents.length);
  if (catEvents.length === 0) {
    result = events;
  }
  else {
    for (let event of events) {
      for (let cat of catEvents) {
        if (CATEGORIES.includes(cat) && event.category === cat) {
          result.push(event);
        }
      }    
    }
  }
  if (upcomming) {
    result = getUpcommingPastEvents(result, currentD).upcommingEvents;
  }
  if (past) {
    result = getUpcommingPastEvents(result, currentD).pastEvents;
  }
  if (textSearch.trimStart() != ""){
    let findEvent = textSearch.trimStart().toLowerCase();
    result = result.filter(event => event.name.toLowerCase().includes(findEvent));
  }
  
  return orderEvents(result);
}

// Ordenar eventos por fecha
const orderEvents = (events) => events.sort((a, b) => Date.parse(a.date)-Date.parse(b.date));

// Función agrega datos para trasnsferir a pagina detalles mediante contexto
export const getDetailsButtonsListen = (selector) => {
  const detailsButtons = Array.from(document.querySelectorAll(selector));
  detailsButtons.forEach(button => {
    button.addEventListener("click", e => { 
        // e.preventDefault();         
        sessionStorage.setItem("id", e.target.id);
        sessionStorage.setItem("previousPage", window.location.href);        
    });
  });
  return detailsButtons.length > 0;
}



// Rendering events Showcase con resultado de búsquedas:

export function renderShowCase(filteredEvents, selector) {
  const cardShow = document.getElementById(selector);
  console.log(currentDate);
  for (let event of filteredEvents) {
    const card = createCard(event);
    cardShow.appendChild(card);
    console.log(event.date, event.category);
  }
}


// Ejemplos de uso de las funciones //

// renderShowCase(selectEvents(events), cardShow); // Muestra todos los eventos
// console.log(events.length);
// renderShowCase(selectEvents(events, {upcomming:true}), cardShow); // Muestra Upcomming events
// console.log(selectEvents(events, {upcomming:true}).length);
// renderShowCase(selectEvents(events, {past:true}), cardShow); // Muestra Past events
// console.log(selectEvents(events, {past:true}).length);
// let selectCatEvents = selectEvents(events, {catEvents:[CATEGORIES[1], CATEGORIES[3], CATEGORIES[4]]});
// renderShowCase(selectCatEvents, cardShow); // Muestra eventos de la categoria elegida.
// console.log(selectCatEvents.length);

///////////////////////////////
// Render to Document functions:

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
  more.classList.add("btn", "btn-primary", "card-btn", "shadow");
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

