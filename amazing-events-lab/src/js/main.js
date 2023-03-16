// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


let { currentDate, events } = data;

export const CATEGORIES = getCategories(events);

// Function that returns events divided in upcomming and past events according to current date.
const getUpcomingPastEvents = (events, currentDate) => {
  let eventsDivided = {
    upcomingEvents: [],
    pastEvents: [],
  }
  for (let event of events) {
    if (Date.parse(event.date) > Date.parse(currentDate)) {
      eventsDivided.upcomingEvents.push(event);
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
export const selectEvents = (events = events, { upcoming = false, past = false, catEvents = [], textSearch = "" } = {}, currentD = currentDate) => {
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
  if (upcoming) {
    result = getUpcomingPastEvents(result, currentD).upcomingEvents;
  }
  if (past) {
    result = getUpcomingPastEvents(result, currentD).pastEvents;
  }
  if (![null, undefined, ""].includes(textSearch) && textSearch.trimStart() != "") {
    let findEvent = textSearch.trimStart().toLowerCase();
    result = result.filter(event => event.name.toLowerCase().includes(findEvent));
  }

  return orderEvents(result);
}

// Ordenar eventos por fecha
const orderEvents = (events) => events.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

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


// Manage usr's query search 
export const searchToSession = {
  searchParams: {
      categorySelection: [],
      findEventText: "",
  },
  resetSearchParams() { sessionStorage.removeItem("searchParams");},
  getSearchParams() {
      if (sessionStorage.hasOwnProperty("searchParams")) {
          this.searchParams.categorySelection = JSON.parse(sessionStorage.searchParams).categorySelection;
          let txt = JSON.parse(sessionStorage.searchParams).findEventText;
          this.searchParams.findEventText = txt;
          if ( typeof txt != String){              
              this.resetSearchParams();
          };
      };
      console.log(this.searchParams);
      return this.searchParams;
  },
  setSearchParams(searchParamsInput) {  
      console.log(searchParamsInput);      
      sessionStorage.searchParams = JSON.stringify(searchParamsInput);
  },
};