export function updateCounter(value: number) {
	const counterElement = document.querySelector(
		'[data-counter]'
	) as HTMLElement;

	if (!counterElement) return;

	counterElement.textContent = `${value} организаций`;
}
