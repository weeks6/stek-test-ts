import type { DirectoryEntry } from './model';
import { directoryStore } from './store';

import DeleteSvg from '../../assets/icons/delete.svg?raw';
import { updateCounter } from './counter';
import { renderPagesContainer } from './pagination';
import { rowEditHandler } from './edit';
import { modalOpened } from '../modals/modal';

function formatPhoneNumber(phone_number: string): string {
	return phone_number.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '+7 $1 $2-$3-$4');
}

function removeRow(table: HTMLDivElement, id: string) {
	const row = table.querySelector(`[data-id="${id}"]`) as HTMLDivElement;
	if (!row) return;

	const deleteButton = row.querySelector(
		'[data-delete-button]'
	) as HTMLButtonElement;

	row.removeEventListener('click', rowEditHandler);
	deleteButton.removeEventListener('click', removeEntryHandler);
}

function removeEntryHandler(evt: MouseEvent): void {
	if (modalOpened) return;

	const target = (evt.target as HTMLElement).closest(
		'[data-delete-button]'
	) as HTMLButtonElement;

	const table = target?.closest('[data-table]') as HTMLDivElement;

	const key = target?.getAttribute('data-delete-button');

	if (!key) {
		console.warn('key not found');
		return;
	}

	removeRow(table, key);

	directoryStore.deleteEntry(parseInt(key));
	updateCounter(directoryStore.list.length);

	renderTable('#table-body');
}

function renderTableRow(entry: DirectoryEntry): HTMLDivElement {
	const row = document.createElement('div');

	row.setAttribute('data-id', entry.id.toString());
	row.classList.add('table__row');

	row.appendChild(document.createElement('div')).textContent = entry.name;
	row.appendChild(document.createElement('div')).textContent = entry.full_name;
	row.appendChild(document.createElement('div')).textContent =
		formatPhoneNumber(entry.phone_number);

	row.appendChild(document.createElement('div')).textContent =
		directoryStore.formatAddress(entry.address);

	const deleteButton = document.createElement('button');
	deleteButton.setAttribute('data-delete-button', entry.id.toString());
	deleteButton.classList.add('table__delete-button');

	const icon = document.createElement('svg');
	icon.innerHTML = DeleteSvg;
	deleteButton.appendChild(icon);

	row.appendChild(deleteButton);

	row.addEventListener('click', rowEditHandler);
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

	let entries = [...directoryStore.list];

	if (directoryStore.searchQuery) {
		entries = directoryStore.filterEntriesByFullName(entries);
	}

	if (directoryStore.sortBy) {
		entries = directoryStore.sort(entries);
	}

	// should be updated before pagination
	updateCounter(entries.length);

	directoryStore.totalPages = Math.ceil(
		entries.length / directoryStore.perPage
	);

	entries = directoryStore.paginate(entries);

	renderPagesContainer();

	const rows = tableBody.querySelectorAll(
		'[data-id]'
	) as NodeListOf<HTMLDivElement>;

	rows.forEach((row) => removeRow(tableBody, row.dataset.id!));

	const newTable = document.createElement('div');

	entries.forEach((entry) => {
		const tableRow = renderTableRow(entry);
		newTable.appendChild(tableRow);
	});

	tableBody.innerHTML = '';
	tableBody.append(...newTable.childNodes);
}
