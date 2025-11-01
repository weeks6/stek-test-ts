import { setupFormListener } from '../form/form';
import { openModal } from '../modals/modal';
import { directoryStore } from './store';
import { renderTable } from './table';

export function setupListeners() {
	const addButton = document.querySelector(
		'[data-add-button]'
	) as HTMLButtonElement;

	addButton.addEventListener('click', () => {
		openModal('#entry-modal', 'Добавить организацию', (_, close) => {
			const cleanup = setupFormListener(
				'#entry-form',
				(data: {
					name: string;
					full_name: string;
					phone_number: string;
					city: string;
					street: string;
					building: string;
				}) => {
					directoryStore.addEntry({
						name: data.name,
						full_name: data.full_name,
						phone_number: data.phone_number,
						address: {
							city: data.city,
							street: data.street,
							building: data.building,
						},
					});

					renderTable('#table-body');
					close();
				}
			);

			return () => {
				cleanup();
			};
		});
	});
}
