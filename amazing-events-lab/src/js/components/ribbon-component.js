import { searchToSession } from "../main";
import { updateShow } from "./render-showcase-component";

// let { events } = data;

let updateSelection;

export const renderSearchRibbon = (events, currentDate, CATEGORIES, landing=false) => {

    let findEventText = searchToSession.getSearchParams().findEventText;
    // console.log(findEventText);
    const sRibbon = document.getElementById("searchRibbon");
    // console.log(sRibbon);

    updateSelection = updateSelection(events, currentDate, landing);

    let ribbonContent = `
        <div class="myRow" id="breackable">
            
            <!--Cat checks-->
            <div class="col-lg-8 col ps-2 cat-check" id="catForm">                    
            </div>
            <!--Cat checks-->

            <!-- Search Box -->
            <div class="col-lg-4 col-10 ps-4">
                <form class="d-flex">
                    <input class="form-control me-2" type="search" aria-label="Search" oninput="${updateSelection}" placeholder="...Find event"
                        value="${findEventText != undefined ? findEventText : ""}"/>
                    <button class="btn btn-outline-primary" type="button" disabled id="searchButton">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" fill="currentColor"
                            class="bi bi-search" viewBox="0 0 16 16">
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <!-- Search Box -->
        </div>`;    

    sRibbon.innerHTML = ribbonContent;

    renderSelectCategory(CATEGORIES);
}

// Select category display rendering
const renderSelectCategory = (CATEGORIES) => {
    // console.log(categories);
    let categorySelection = searchToSession.getSearchParams().categorySelection;
    
    const displayContainer = document.getElementById("catForm");
    // console.log(displayContainer);
    let catForm = `<div class="row">`;
    CATEGORIES.forEach(category => {
        catForm += `    
          <div class="col form-check mx-2 p-2">
              <input class="form-check-input  border border-primary cat-check" onchange="${updateSelection}" type="checkbox" 
                    value=${category.replace(" ", "-")}
                    id=${category.replace(" ", "-")}
                    ${categorySelection.includes(category) ? "checked" : ""} />
              <label class="form-check-label" for=${category.replace(" ", "-")}>
                  ${category}
              </label>
          </div>`;        
    });
    catForm += "</div>";
    displayContainer.innerHTML = catForm;
}

// Listener to search Params functionality
updateSelection = (events, currentDate, landing) => {
    const searchParamsBox = document.getElementById("searchRibbon");

    let searchParams = searchToSession.getSearchParams();
    let noUsrInput = true;

    searchParamsBox.onchange = (e) => {
        // console.log(e.target.value.replace("-"," "));
        searchParams.categorySelection = Array.from(searchParamsBox.querySelectorAll("input[type=checkbox]"))
        .filter(cat => cat.checked)    
        .map(cat => cat.value.replace("-"," "));
        
        searchToSession.setSearchParams(searchParams);
        updateShow(events, currentDate, searchParams);
        noUsrInput = false;
        console.log(searchParams);        
    };
    searchParamsBox.oninput = () => {
        searchParams.findEventText = searchParamsBox.querySelector("input[type=search]").value;

        searchToSession.setSearchParams(searchParams);
        updateShow(events, currentDate, searchParams);
        noUsrInput = false;
        console.log(searchParams);
    }; 
    
    if (noUsrInput && !landing) {
        updateShow(events, currentDate, searchParams);
        console.log(searchParams);
    }
    
};

     

