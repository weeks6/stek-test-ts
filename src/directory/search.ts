import { directoryStore } from './store';
import { renderTable } from './table';

export function setupListeners() {
	const inputElement = document.querySelector(
		'[data-search-input]'
	) as HTMLInputElement;

	const clearButton = document.querySelector(
		'[data-search-input-clear]'
	) as HTMLButtonElement;

	if (!inputElement) return;

	inputElement.addEventListener('input', (event) => {
		directoryStore.searchQuery = (
			event.target as HTMLInputElement
		).value.trim();

		renderTable('#table-body');
	});

	clearButton.addEventListener('click', () => {
		inputElement.value = '';
		inputElement.dispatchEvent(new Event('input'));
		inputElement.focus();
	});
}
