import { numberFixed } from '../functions/number-fixed'

(function(){
	function checkCountOfSymbols(field, maxSymbols, errorText) {
		const errorContainer = field.parentNode.querySelector('.form-field__error')
		const errorPlace = errorContainer.querySelector('.form-field__text')
		let count = field.value.length

		if (count > maxSymbols) {
			field.classList.add('invalid')
			errorContainer.classList.remove('hidden')
			errorPlace.textContent = errorText
		} else {
			field.classList.remove('invalid')
			errorContainer.classList.add('hidden')
			errorPlace.textContent = ''
		}
	}

	if (document.querySelector('#username-register')) {
		const input = document.querySelector('#username-register')
		const errorText = 'Проверь правильно ли написано имя'
		const maxSymbols = 30

		input.addEventListener("input", () => {
			checkCountOfSymbols(input, maxSymbols, errorText)
		});
	}

	if (document.querySelector('#settings-username')) {
		const input = document.querySelector('#settings-username')
		const errorText = 'Проверь правильно ли написано имя'
		const maxSymbols = 30

		input.addEventListener("input", () => {
			checkCountOfSymbols(input, maxSymbols, errorText)
		});
	}

	if (document.querySelector('.new-recipe-section__field--title')) {
		const input = document.querySelector('.new-recipe-section__field--title input')
		const errorText = 'Укажи более короткое название блюда, до 80 символов'
		const maxSymbols = 80

		input.addEventListener("input", () => {
			checkCountOfSymbols(input, maxSymbols, errorText)
		});
	}

	if (document.querySelector('.new-recipe-section__field--desc')) {
		const textArea = document.querySelector('.new-recipe-section__field--desc textarea')
		const errorText = 'Опиши рецепт покороче, до 180 символов'
		const maxSymbols = 180

		textArea.addEventListener("input", () => {
			checkCountOfSymbols(textArea, maxSymbols, errorText)
		});
	}

	if (document.querySelector('.ingredient-item')) {
		const maxSymbols = 80

		document.addEventListener('click', (e) => {
			const target = e.target
			if (target.classList.contains('ingredient-item__input')) {
				const input = target
				const errorText = 'Укажи более короткое название ингредиента, до 80 символов'

				input.addEventListener("input", () => {
					checkCountOfSymbols(input, maxSymbols, errorText)
				});
			}
		})
	}

	if (document.querySelector('.step-item')) {
		const maxSymbols = 1200

		document.addEventListener('click', (e) => {
			const target = e.target
			if (target.classList.contains('step-item__input')) {
				const textArea = target
				const errorText = 'Опиши шаг покороче, до 1200 символов'

				textArea.addEventListener("input", () => {
					checkCountOfSymbols(textArea, maxSymbols, errorText)
				});
			}
		})
	}

	if (document.querySelector('.new-recipe-section__field--time')) {
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
			inputMinutes.value = numberFixed(inputMinutes.value)
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
			inputHours.value = numberFixed(inputHours.value)
		})
	}
})();
