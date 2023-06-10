import { randomID } from '../functions/random-id'
import { numberFixed } from '../functions/number-fixed'

(function(){
	if (document.querySelector('.ingredient')) {
		const ingredientSection = document.querySelector('.ingredient');
		const ingredientList = ingredientSection.querySelector('.ingredient__list')
		const ingredientAdd = ingredientSection.querySelector('.ingredient__btn')
		const maxOfFields = 50;
		let countOfFields = 2;

		// проверка кол-ва ингредиентов
		document.addEventListener('click', () => {
			let ingredientAmounts = ingredientSection.querySelectorAll('.ingredient-item__input--amount')

			ingredientAmounts.forEach((input) => {
				const max = 999

				input.addEventListener('change', () => {
					if (input.value > max - 1) {
						input.value = max
					} else if (input.value <= 0.1) {
						input.value = 0.1
					}
					input.value = numberFixed(input.value)
				})
			})
		})

		// удаление ингредиента
		ingredientList.addEventListener('click', (e) => {
			e.preventDefault()
			let target = e.target
			if (target.classList.contains('ingredient-item__delete') && countOfFields > 1) {
				countOfFields--;
				target.parentNode.remove()

				if (countOfFields == 1) {
					const item = ingredientList.querySelector('.ingredient-item')
					const del = item.querySelector('.ingredient-item__delete')
					del.disabled = true
				}

				if (countOfFields < maxOfFields) {
					ingredientAdd.disabled = false
				}
			}
		})

		// добавление ингредиента
		ingredientAdd.addEventListener('click', e => {
			e.preventDefault()
			countOfFields++;
			const fieldIndex = randomID()

			if (countOfFields == maxOfFields) {
				ingredientAdd.disabled = true
				ingredientAdd.blur()
			}

			if (countOfFields > 1) {
				const items = ingredientList.querySelectorAll('.ingredient-item')
				items.forEach(e => {
					const del = e.querySelector('.ingredient-item__delete')
					del.disabled = false
				})
			}

			let ingredientItem = document.createElement("div")
			ingredientItem.classList.add('ingredient-item')
			ingredientItem.setAttribute('id', `ingredient-${fieldIndex}`)
			ingredientItem.innerHTML += `
				<input type="text" name="ingredient-name-${fieldIndex}" class="input  ingredient-item__input  ingredient-item__input--name" placeholder="Название ингредиента" autocomplete="off">
				<input type="number" name="ingredient-amount-${fieldIndex}" class="input  ingredient-item__input  ingredient-item__input--amount" value="1" step="0.1" autocomplete="off" aria-label="Количество ингредиента">
				<div class="select  ingredient-item__select">
					<select name="ingredient-measure-${fieldIndex}" aria-label="Выбрать единицу измерения">
						<option value="">Ед. измерения</option>
						<option>шт</option>
						<option>г</option>
						<option>кг</option>
						<option>мл</option>
						<option>л</option>
						<option>стакан</option>
						<option>чайная ложка</option>
						<option>столовая ложка</option>
						<option>щепотка</option>
						<option>зубчик</option>
					</select>
					<svg class="icon" aria-hidden="true" focusable="false">
						<use href="${svgChevron}"/>
					</svg>
				</div>
				<button type="button" class="btn-reset  ingredient-item__delete" aria-label="Удалить ингредиент">
					<svg class="icon  icon--16" aria-hidden="true" focusable="false">
						<use href="${svgCross}" />
					</svg>
				</button>
				<label class="form-field__error  hidden">
					<svg class="icon  icon--16" aria-hidden="true" focusable="false">
						<use href="${svgCircleCross}"/>
					</svg>
					<span class="form-field__text"></span>
				</label>
			`;
			ingredientList.append(ingredientItem)
		})
	}
})();
