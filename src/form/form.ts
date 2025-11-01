export function setupFormListener(
	formSelector: string,
	submitHandler: Function
) {
	const form = document.querySelector(formSelector) as HTMLFormElement;
	const submitButton = form.querySelector(
		'[type="submit"]'
	) as HTMLButtonElement;

	const inputs = form.querySelectorAll('input');

	let firstCheck = true;

	function checkValidity() {
		const isFormValid = form.checkValidity();
		if (isFormValid) {
			submitButton.disabled = false;
		} else {
			submitButton.disabled = true;
		}
		firstCheck = false;
	}

	function onInput(event: Event) {
		const input = (event.target as HTMLInputElement).closest('label');
		if (!input) return;

		input.classList.remove('form__input--error');

		checkValidity();
	}

	function onInvalid(event: Event) {
		if (firstCheck) return;

		const input = (event.target as HTMLInputElement).closest('label');
		if (!input) return;

		input.classList.add('form__input--error');
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);

		submitHandler(data);
	}

	inputs.forEach((input) => {
		input.addEventListener('input', onInput);
		input.addEventListener('invalid', onInvalid);
	});

	form.addEventListener('submit', onSubmit);

	checkValidity();

	return function () {
		inputs.forEach((input) => {
			input.removeEventListener('input', onInput);
			input.removeEventListener('invalid', onInvalid);
		});

		form.removeEventListener('submit', onSubmit);
	};
}
