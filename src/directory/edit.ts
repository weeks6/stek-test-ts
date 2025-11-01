import { setupFormListener } from '../form/form';
import { openModal } from '../modals/modal';
import { directoryStore } from './store';
import { renderTable } from './table';

export function rowEditHandler(event: MouseEvent) {
	let id = parseInt(
		((event.target as HTMLElement)?.closest('[data-id]') as HTMLDivElement)
			?.dataset.id!
	);

	if (!id) return;

	openModal(
		'#entry-modal',
		'Редактировать организацию',
		(modal: HTMLDivElement, close) => {
			const entry = directoryStore.list.find((e) => {
				return e.id === id;
			})!;

			const form = modal.querySelector('#entry-form') as HTMLFormElement;

			(form.querySelector('[name="name"]')! as HTMLInputElement).value =
				entry.name;
			(form.querySelector('[name="full_name"]')! as HTMLInputElement).value =
				entry.full_name;
			(form.querySelector('[name="phone_number"]')! as HTMLInputElement).value =
				entry.phone_number;
			(form.querySelector('[name="city"]')! as HTMLInputElement).value =
				entry.address.city;
			(form.querySelector('[name="street"]')! as HTMLInputElement).value =
				entry.address.street;
			(form.querySelector('[name="building"]')! as HTMLInputElement).value =
				entry.address.building;

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
					directoryStore.editEntry(id, {
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
		}
	);
}
