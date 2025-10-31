import type { DirectoryEntry, EntryAddress } from './model';
import { directoryStore } from './store';

function formatPhoneNumber(phone_number: string): string {
	return phone_number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 $1 $2-$3-$4');
}

function formatAddress(address: EntryAddress): string {
	return `${address.city}, ${address.street}, ${address.building}`;
}

function removeEntryHandler(evt: MouseEvent): void {
	const target = evt.target as HTMLButtonElement;
	const key = target.getAttribute('data-delete-button');

	if (!key) {
		console.warn('key not found');
		return;
	}

	directoryStore.deleteEntry(key);
	const row = document.querySelector(`[data-id="${key}"]`);

	if (row) {
		target.removeEventListener('click', removeEntryHandler);
		row.remove();
	}
}

function renderTableRow(key: string, entry: DirectoryEntry): HTMLDivElement {
	const row = document.createElement('div');

	row.setAttribute('data-id', key);
	row.classList.add('table__row');

	row.appendChild(document.createElement('div')).textContent = entry.name;
	row.appendChild(document.createElement('div')).textContent = entry.full_name;
	row.appendChild(document.createElement('div')).textContent =
		formatPhoneNumber(entry.phone_number);

	row.appendChild(document.createElement('div')).textContent = formatAddress(
		entry.address
	);

	const deleteButton = row.appendChild(document.createElement('button'));
	deleteButton.setAttribute('data-delete-button', key);
	deleteButton.textContent = 'X';
	deleteButton.classList.add('table__delete-button');

	deleteButton.addEventListener('click', removeEntryHandler);

	return row;
}

export function renderTable(tableBodySelector: string): void {
	const tableBody = document.querySelector(
		tableBodySelector
	) as HTMLTableSectionElement;

	if (!tableBody) {
		console.warn('Table body not found');
		return;
	}

	const entries = directoryStore.list;

	Object.entries(entries).forEach(([entryId, entry]) => {
		const tableRow = renderTableRow(entryId, entry);
		tableBody.appendChild(tableRow);
	});
}
