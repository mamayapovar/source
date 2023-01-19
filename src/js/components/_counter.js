(function(){
	if (document.querySelector('.counter__input')) {
		const counterInput = document.querySelector('.counter__input')
		const counterPlus = document.querySelector('.counter__btn--plus')
		const counterMinus = document.querySelector('.counter__btn--minus')
		const counterMax = 20

		function enableButton(btn) {
			btn.classList.remove('disabled')
			btn.removeAttribute('tabindex')
		}

		function disableButton(btn) {
			btn.classList.add('disabled')
			btn.setAttribute('tabindex', '-1')
		}

		function plusValidate() {
			if (counterInput.value > counterMax - 1) {
				counterInput.value = counterMax
				disableButton(counterPlus)
			} else {
				enableButton(counterPlus)
			}
		}

		function minusValidate() {
			if (counterInput.value <= 1) {
				counterInput.value = 1
				disableButton(counterMinus)
			} else {
				enableButton(counterMinus)
			}
		}

		document.addEventListener('DOMContentLoaded', () => {
			plusValidate()
			minusValidate()
		})

		counterInput.addEventListener('change', () => {
			plusValidate()
			minusValidate()
		})

		counterPlus.addEventListener('click', (e) => {
			e.preventDefault()
			let currentValue = parseInt(counterInput.value)

			currentValue++
			counterInput.value = currentValue
			enableButton(counterMinus)
			plusValidate()
		})

		counterMinus.addEventListener('click', (e) => {
			e.preventDefault()
			let currentValue = parseInt(counterInput.value)

			currentValue--
			counterInput.value = currentValue
			enableButton(counterPlus)
			minusValidate()
		})
	}
})();
