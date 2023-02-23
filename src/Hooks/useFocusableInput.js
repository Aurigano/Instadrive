export function useFocusableInput(input) {
	if (input) {
		setTimeout(() => {
			input.focus();
		}, 100);
	}
}
