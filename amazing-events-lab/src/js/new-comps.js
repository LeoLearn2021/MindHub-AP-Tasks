// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { renderNavigation } from './components/nav-component';
import { renderSelectCategory } from './main';
import { renderSearchRibbon } from './components/ribbon-component';

renderNavigation("nav");

renderSearchRibbon("searchRibbon");

renderSelectCategory("catForm");




