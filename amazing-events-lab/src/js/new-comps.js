// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon, listenToSearchParams } from './components/ribbon-component';
import { CATEGORIES } from './main';

renderNavigation("nav");

renderSearchRibbon("searchRibbon", CATEGORIES);

listenToSearchParams("searchRibbon", "change", "keyup");


// console.log( JSON.parse(sessionStorage.searchParams) );
console.log( JSON.parse(sessionStorage.searchParams) );

window.addEventListener("storage", e => {
    if(e.storageArea===sessionStorage){
        alert('change');
      }
    console.log( JSON.parse(sessionStorage.searchParams) );
});