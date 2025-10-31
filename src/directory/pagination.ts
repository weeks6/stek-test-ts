import { directoryStore } from './store';
import { renderTable } from './table';

function paginationHandler(newPage: number, newPerPage?: number) {
	if (newPage < 1) newPage = 1;
	if (newPage > (directoryStore.totalPages ?? 0)) newPage = 1;

	directoryStore.page = newPage;

	renderTable('#table-body');
}

function paginationPageHandler(event: MouseEvent) {
	const page = parseInt(
		(
			(event.target as HTMLButtonElement)?.closest(
				'[data-page]'
			) as HTMLButtonElement
		).dataset.page!
	);

	paginationHandler(page);
}

export function renderPagesContainer() {
	const pagesContainer = document.querySelector(
		'[data-pagination-pages]'
	) as HTMLDivElement;

	pagesContainer.querySelectorAll('button').forEach((button) => {
		button.removeEventListener('click', paginationPageHandler);
	});

	const half = Math.floor(5 / 2);

	let start = directoryStore.page - half;
	let end = directoryStore.page + half;

	if (start < 1) {
		end = end + (1 - start);
		start = 1;
	}

	if (end > directoryStore.totalPages) {
		start = start - (end - directoryStore.totalPages);
		end = directoryStore.totalPages;
	}

	if (start < 1) start = 1;

	const pages = [];

	for (let i = start; i <= end; i++) pages.push(i);

	pagesContainer.innerHTML = '';
	pages.forEach((page) => {
		if (!page) return;

		const pageButton = document.createElement('button');
		pageButton.textContent = page.toString();
		pageButton.setAttribute('data-page', page.toString());
		pageButton.classList.add('pagination__button');

		if (page === directoryStore.page) {
			pageButton.classList.add('pagination__button--active');
		}

		pageButton.addEventListener('click', paginationPageHandler);

		pagesContainer.appendChild(pageButton);
	});
}

export function setupListeners() {
	const prevButton = document.querySelector(
		'[data-pagination-prev]'
	) as HTMLButtonElement;

	const nextButton = document.querySelector(
		'[data-pagination-next]'
	) as HTMLButtonElement;

	prevButton.addEventListener('click', () => {
		paginationHandler(directoryStore.page - 1);
	});

	nextButton.addEventListener('click', () => {
		paginationHandler(directoryStore.page + 1);
	});
}
