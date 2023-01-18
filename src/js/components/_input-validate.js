(function(){
	if (document.querySelector('.new-recipe-section__field--time')) {
		function getMeNumber(value) {
			var pow = Math.pow(10, 0);
			return (value * pow >> 0) / pow;
		}

		const field = document.querySelector('.new-recipe-section__field--time')
		const inputMinutes = field.querySelector('.new-recipe-section__field--minutes input')
		const inputHours = field.querySelector('.new-recipe-section__field--hours input')

		const maxMinutes = 59
		const maxHours = 12

		inputMinutes.addEventListener('blur', () => {
			if (inputMinutes.value >= maxMinutes) {
				inputMinutes.value = maxMinutes
			} else if (inputMinutes.value <= 0) {
				inputMinutes.value = 0
			}
			inputMinutes.value = getMeNumber(inputMinutes.value)
		})

		inputHours.addEventListener('blur', () => {
			if (inputHours.value >= maxHours) {
				inputHours.value = maxHours
				inputMinutes.removeAttribute('required')
				inputMinutes.setAttribute('min', '')
			} else if (inputHours.value >= 1) {
				inputMinutes.removeAttribute('required')
				inputMinutes.setAttribute('min', '0')
			} else if (inputHours.value <= 0) {
				inputHours.value = 0
				inputMinutes.setAttribute('required', '')
				inputMinutes.setAttribute('min', '1')
			}
			if (inputMinutes.value <= 0) {
				inputMinutes.value = 0
			}
			inputHours.value = getMeNumber(inputHours.value)
		})
	}
})();
