import type { SortableColumns } from './model';
import { directoryStore } from './store';
import { renderTable } from './table';

export function setupListeners() {
	const buttons = document.querySelectorAll(
		'[data-sort-button]'
	) as NodeListOf<HTMLButtonElement>;

	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const newSortBy = button.getAttribute('data-col') as SortableColumns;

			if (directoryStore.sortBy !== newSortBy) {
				directoryStore.sortDirection = 'asc';
			} else {
				directoryStore.sortDirection =
					directoryStore.sortDirection === 'asc' ? 'desc' : 'asc';
			}

			directoryStore.sortBy = newSortBy;

			buttons.forEach((btn) => {
				btn.classList.remove('table__header-button--asc');
				btn.classList.remove('table__header-button--desc');
			});

			button.classList.add(
				`table__header-button--${directoryStore.sortDirection}`
			);

			renderTable('#table-body');
		});
	});
}
