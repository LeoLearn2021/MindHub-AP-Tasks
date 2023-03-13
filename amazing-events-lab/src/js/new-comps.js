// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSearchRibbon } from './components/ribbon-component';
import { CATEGORIES } from './main';

renderNavigation("nav");

renderSearchRibbon("searchRibbon", CATEGORIES);





