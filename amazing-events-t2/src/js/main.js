// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// console.log(data);
// console.log(data_local);
let { currentDate, events } = data;

// get categories, upcomming and past events.
let categories = [];
let upcommingEvents = [];
let pastEvents = [];

for (let event of events) {
  if (!categories.includes(event.category)) {
    categories.push(event.category);
  }
  if (Date.parse(event.date) > Date.parse(currentDate)) {
    upcommingEvents.push(event);
  } else {
    pastEvents.push(event);
  }
}

console.log(categories);
// console.log(upcomingEvents.length, pastEvents.length);

// función para seleccionar eventos (categoría, fechas, upcomming, past, etc).
// TO DO
const selectEvents = (events, searchParam=[]) => {
  //Función de discriminación de eventos por categoría.
  if (searchParam.length == 0) {
    return events;
  }
  let result = [];
  for (let event of events) {
    for (let cat of searchParam) {
      if (categories.includes(cat) && event.category === cat) {
        result.push(event);
      }
    }    
  }
  return result;
}

// Rendering events Showcase con resultado de búsquedas:
// create card Showcase
const cardShow = document.getElementById("cardsShow");

function renderShowCase(searchEvents, showDisplay) {
  for (let event of searchEvents) {
    const card = createCard(event);
    showDisplay.appendChild(card);
  }
}


// Ejemplos de uso de las funciones //

// let catEvents = selectEvents(events, [categories[0], categories[1], categories[6]]);
// renderShowCase(events, cardShow); // Muestra todos los eventos
// console.log(events.length);
// renderShowCase(upcommingEvents, cardShow); // Muestra Upcomming events
// console.log(upcommingEvents.length);
// renderShowCase(pastEvents, cardShow); // Muestra Past events
// console.log(pastEvents.length);
// renderShowCase(catEvents, cardShow); // Muestra eventos de la categoria elegida.
// console.log(catEvents.length);


function createCard(event) {
  // card
  let card = document.createElement("div");
  card.classList.add("card", "m-3", "text-center");
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
  more.href = "#";
  cardFooterContent.appendChild(eventPrice);
  cardFooterContent.appendChild(more);
  cardFooter.appendChild(cardFooterContent);
  // Armado del card
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  return card;
}



