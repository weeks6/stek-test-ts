import './style.css';

import { seedEntries } from './directory/store';
import { renderTable } from './directory/table';

seedEntries();

renderTable('#table-body');
