
export const renderSearchRibbon = (selector, categories) => {
    
    let findEventText = getSearchParams().findEventText;
    const sRibbon = document.getElementById(selector);
    ribbonContent =`
        <div class="myRow" id="breackable">
            
            <!--Cat checks-->
            <div class="col-lg-8 col ps-2 cat-check" id="catForm">                    
            </div>
            <!--Cat checks-->

            <!-- Search Box -->
            <div class="col-lg-4 col-10 ps-4">
                <form class="d-flex">
                    <input class="form-control me-2" type="search" aria-label="Search" placeholder="...Find me event"
                        value="${findEventText}"/>
                    <button class="btn btn-outline-primary" type="submit">
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
    
    renderSelectCategory("catForm", categories);
} 

// Select category display rendering
const renderSelectCategory = (selector, categories) => {

    let categorySelection = getSearchParams().categorySelection;

    const displayContainer = document.getElementById(selector);
    // console.log(displayContainer);
    let catForm = `<div class="row">`;
    categories.forEach(category => {
      catForm +=`    
          <div class="col form-check mx-2 p-2">
              <input class="form-check-input  border border-primary cat-check" type="checkbox" 
                    value=${category}
                    id=${category}
                    ${categorySelection.includes(category)? "checked":""} />
              <label class="form-check-label" for=${category}>
                  ${category}
              </label>
          </div>` 
    });
    catForm += "</div>";
    displayContainer.innerHTML = catForm;
  }

// Listener to search Params functionality
export const listenToSearchParams = (selector, eventTypeCategories, eventTypeTextSearch) => {
  const searchParamsBox = document.getElementById(selector);
  searchParamsBox.querySelector("form button").disabled = true; // Doesn't use submit to request text search.
  // console.log(searchParamsBox);
  
  // console.log(searchParamsBox.querySelector("#catForm"));
  const searchParams = {
    categorySelection: [],
    findEventText: "",
  };
  searchParamsBox.querySelector("#catForm").addEventListener(eventTypeCategories, e => {
    
    searchParams.categorySelection = [];
    searchParamsBox.querySelectorAll("input[type=checkbox]")
      .forEach(cat => cat.checked ? searchParams.categorySelection.push(cat.value):null);
      console.log(JSON.stringify(searchParams));
      sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
  });
  searchParamsBox.querySelector("form").addEventListener(eventTypeTextSearch, e =>  {
    // console.log(searchParamsBox.querySelector("form button"));
    searchParams.findEventText = searchParamsBox.querySelector("input[type=search]").value;
    console.log(searchParams);
    sessionStorage.setItem("searchParams", JSON.stringify(searchParams));
  });  
};

function getSearchParams (){
    let searchParams = {
        categorySelection: [],
        findEventText: "",
    }
    return (sessionStorage.searchParams != undefined) ? 
        JSON.parse(sessionStorage.searchParams) : searchParams;
}