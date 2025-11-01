export function openModal(
	templateSelector: string,
	onMount: (close: Function) => Function
) {
	const modalTemplate = document.querySelector(
		templateSelector
	) as HTMLTemplateElement;

	if (!modalTemplate) return;

	const modalContainer = document.querySelector(
		'[data-modal-container]'
	) as HTMLDivElement;

	const modalBody = document.querySelector(
		'[data-modal-body]'
	) as HTMLDivElement;

	const modalOverlay = document.querySelector(
		'[data-modal-overlay]'
	) as HTMLDivElement;

	modalBody.appendChild(modalTemplate.content.cloneNode(true));

	modalContainer.classList.add('modal-container--active');

	const closeButton = modalBody.querySelector(
		'[data-modal-close]'
	) as HTMLButtonElement;

	function closeHandler() {
		modalContainer.classList.remove('modal-container--active');
		closeButton.removeEventListener('click', closeHandler);
		modalOverlay.removeEventListener('click', closeHandler);
		cleanup();

		modalBody.innerHTML = '';
	}

	closeButton.addEventListener('click', closeHandler);
	modalOverlay.addEventListener('click', closeHandler);

	const cleanup = onMount(closeHandler);
}
