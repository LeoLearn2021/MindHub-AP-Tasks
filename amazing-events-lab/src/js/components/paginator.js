
import { createCard } from "./render-showcase-component";


export const paginator = (events, cardShow) => {
    let perRow = getPerRow();
    let currentPage = 1;
    let numberRows = Math.ceil(events.length / perRow);
    let rowsPerPage = 3;

    console.log(perRow);
    window.onresize = () => {
        if (getPerRow() != perRow){
            perRow = getPerRow();
            // let currentPage = 2;
            paginatorController(events, cardShow, rowsPerPage, perRow, currentPage);
        }
        //   ? perRow : (()=>{})();
        console.log(perRow);
    };

    paginatorController(events, cardShow, rowsPerPage, perRow, currentPage);
    
    // events.forEach(event => cardShow.appendChild(createCard(event)));
    // for (let event of events) {
    //     const card = createCard(event);
    //     cardShow.appendChild(card);
    //     console.log(event.date, event.category);
    // }
};

const paginatorController  = (events, cardShow, rowsPerPage, perRow, page) => {
    
    let paginatorNavTop = document.createElement('ul');
    paginatorNavTop.classList.add("pagination","pagination-sm", "col-10");
    let paginatorNavBottom = document.createElement('ul');
    paginatorNavBottom.classList.add("pagination","pagination-sm", "justify-content-end", "col-10");
    let eventsPerPage = rowsPerPage * perRow;
    
    // page--;
    let paginatedEvents = {1:[]};
    // let start = page * eventsPerPage;    
    // let end = start + eventsPerPage > events.length ? events.length : start + eventsPerPage;
    let pageIndex = page;
    events.forEach((event) => {
        // let page = 1;
        if ( paginatedEvents[pageIndex].length < eventsPerPage ) { 
            paginatedEvents[pageIndex].push(event);         
        } else {
            pageIndex++;
            paginatedEvents[pageIndex] = [];
            paginatedEvents[pageIndex].push(event);
        }
    });
    // paginatedEvents.page = events.slice(start, end);
    // paginatedEvents.forEach(event => console.log(event.name, event.date));
    console.log(paginatedEvents);
    const pageNavT =  pagNavigation(paginatedEvents, paginatorNavTop, page);
    const pageNavB =  pagNavigation(paginatedEvents, paginatorNavBottom, page);
    cardShow.innerHTML = "";
    cardShow.appendChild(pageNavT);     
    cardShow.appendChild(pageNavB);

    paginatedDisplay(paginatedEvents, page, cardShow);

    activatePagination(paginatedEvents, cardShow);
};

const paginatedDisplay = (pagedEvents, currentPage, wrapper) => {
    let events = pagedEvents[currentPage];
    let clearEvents = wrapper.childNodes;
    while (clearEvents[1].nodeName != "UL")  wrapper.removeChild(clearEvents[1]);
    events.forEach(event => wrapper.lastChild.insertAdjacentElement("beforebegin", createCard(event)));
    console.log("Paginated Display");
};

const activatePagination = (paginatedEvents, cardShow) => {
    let nextButns = document.querySelectorAll("[pagbtn='-1']");
    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
          if (
            mutation.type !== "attributes" ||
            mutation.attributeName !== "class"
          ) {
            return
          }
          console.log('old:', mutation.oldValue)
          console.log('new:', mutation.target.getAttribute("class"))
        }
    }
    const observer = new MutationObserver(mutationCallback)
    let numPages = Object.entries(paginatedEvents).length;
    nextButns.forEach(btn => {
        if (numPages == 1) btn.classList.add("disabled"); 
        observer.observe(btn, { attributes: true, attributeOldValue: true })
    });
    let navButtons = Array.from(document.querySelectorAll("[pagbtn]"));
    if (navButtons.length > 6){
        navButtons.forEach(btn => {
            btn.addEventListener("click", (event) => {
                let currentBtnsPage = Array.from(document.querySelectorAll("[pagbtn].active"));
                let currentPage = parseInt(currentBtnsPage[0].getAttribute("pagbtn"));
                currentBtnsPage.forEach(btn => btn.classList.remove("active"));
                let actualPage = event.target.getAttribute("pagbtn");

                if (actualPage == 0) actualPage = currentPage - 1;
                if (actualPage == -1) actualPage = currentPage + 1;

                if (actualPage != currentPage) {
                    Array.from(document.querySelectorAll("[pagbtn]")).forEach(pgbtn => {
                        if (pgbtn.getAttribute("pagbtn") == 0) {
                            actualPage == 1 ? pgbtn.classList.add("disabled") : pgbtn.classList.remove("disabled");
                        } else if (pgbtn.getAttribute("pagbtn") == -1) {
                            actualPage == Object.keys(paginatedEvents).length ? pgbtn.classList.add("disabled") : pgbtn.classList.remove("disabled");
                        }
                        if (pgbtn.getAttribute("pagbtn") == actualPage) pgbtn.classList.add("active");
                    });
                    paginatedDisplay(paginatedEvents, actualPage, cardShow);
                }
            });
        });
    }
};

const pagNavigation = (paginatedEvents, wrapper, currentPage) => {
    let prev =`<li class="page-item btn btn-outline-primary disabled" pagbtn=${0}>Previous</li>`;
    let next =`<li class="page-item btn btn-outline-primary" pagbtn=${-1}>Next</li>`;
    wrapper.innerHTML = prev;
    
    Object.keys(paginatedEvents).forEach(page => wrapper.appendChild(paginationButton(page, currentPage)));
  
    wrapper.innerHTML += next;

    return wrapper;
};

const paginationButton = (page, currentPage) => {
    let button = document.createElement('li');
    button.classList.add('page-item', 'btn','btn-outline-primary');
    button.setAttribute("pagbtn",`${page}`);
    button.innerText =`${page}`;
    if (currentPage == page) button.classList.add('active');

    return button;
};

const getPerRow = () => {
    let winWidth = window.innerWidth;
    return winWidth < 992 ? 1 : winWidth < 1200 ? 2 : 3;
};