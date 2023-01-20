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

		inputMinutes.addEventListener('change', () => {
			if (inputMinutes.value >= maxMinutes) {
				inputMinutes.value = maxMinutes
			} else if (inputMinutes.value <= 0) {
				inputMinutes.value = 0
			}
			inputMinutes.value = getMeNumber(inputMinutes.value)
		})

		inputHours.addEventListener('change', () => {
			if (inputHours.value >= maxHours) {
				inputHours.value = maxHours
			} else if (inputHours.value <= 0) {
				inputHours.value = 0
			}
			if (inputMinutes.value <= 0) {
				inputMinutes.value = 0
			}
			inputHours.value = getMeNumber(inputHours.value)
		})
	}
})();
