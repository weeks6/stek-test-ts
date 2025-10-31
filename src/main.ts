import './style.css';

import { seedEntries } from './directory/store';
import { renderTable } from './directory/table';
import { setupListeners as setupSortListeners } from './directory/sort';
import { setupListeners as setupSearchListeners } from './directory/search';
import { setupListeners as setupPaginationListeners } from './directory/pagination';

seedEntries();

renderTable('#table-body');

setupSortListeners();
setupSearchListeners();
setupPaginationListeners();
