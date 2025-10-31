import { directoryStore } from './store';
import { renderTable } from './table';

export function setupListeners() {
	const inputElement = document.querySelector(
		'[data-search-input]'
	) as HTMLInputElement;

	if (!inputElement) return;

	inputElement.addEventListener('input', (event) => {
		directoryStore.searchQuery = (
			event.target as HTMLInputElement
		).value.trim();

		renderTable('#table-body');
	});
}
