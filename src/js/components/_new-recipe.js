// ИГРЕДИЕНТЫ
(function(){
	if (document.querySelector('.ingredient')) {
		const ingredientSection = document.querySelector('.ingredient');
		const ingredientList = ingredientSection.querySelector('.ingredient__list')
		const ingredientAdd = ingredientSection.querySelector('.ingredient__btn')
		let countOfFields = 2;
		let maxOfFields = 50;

		function randomID() {
			return Math.floor(Math.random() * Date.now())
		}

		function numberFixed(number, fixed) {
			if ((typeof number === 'number' || typeof number === 'string') && !isNaN(number - parseFloat(number))) {
				number = String(number);
				var split = number.split('.');
				if (split.length > 1) {
					var left = split[0];
					var right = split[1].substr(0, (!fixed ? 1 : fixed));
					return Number(left + (fixed !== 0 ? '.' + right : ''));
				} else {
					return Number(number);
				}
			}
		}

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
					del.classList.add('disabled')
					del.setAttribute('tabindex', '-1')
				}

				if (countOfFields < maxOfFields) {
					ingredientAdd.classList.remove('disabled')
				}
			}
		})

		// добавление ингредиента
		ingredientAdd.addEventListener('click', e => {
			e.preventDefault()
			countOfFields++;
			const fieldIndex = randomID()

			if (countOfFields == maxOfFields) {
				ingredientAdd.classList.add('disabled')
			}

			if (countOfFields > 1) {
				const items = ingredientList.querySelectorAll('.ingredient-item')
				items.forEach(e => {
					const del = e.querySelector('.ingredient-item__delete')
					del.classList.remove('disabled')
					del.removeAttribute('tabindex')
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

// ИНСТРУКЦИЯ ПРИГОТОВЛЕНИЯ
(function(){
	if (document.querySelector('.step')) {
		const stepSection = document.querySelector('.step');
		const stepList = stepSection.querySelector('.step__list')
		const stepAdd = stepSection.querySelector('.step__btn')
		let countOfFields = 2;
		let maxOfFields = 30;

		function randomID() {
			return Math.floor(Math.random() * Date.now())
		}

		// удаление шага
		stepList.addEventListener('click', (e) => {
			let target = e.target
			if (target.classList.contains('step-item__delete') && countOfFields > 1) {
				e.preventDefault()
				countOfFields--;
				target.parentNode.remove()
			}

			if (countOfFields < maxOfFields) {
				stepAdd.classList.remove('disabled')
			}

			if (countOfFields == 1) {
				const item = stepList.querySelector('.step-item')
				const del = item.querySelector('.step-item__delete')
				del.classList.add('disabled')
				del.setAttribute('tabindex', '-1')
			}
		})

		// добавление шага
		stepAdd.addEventListener('click', e => {
			e.preventDefault()
			countOfFields++;
			const fieldIndex = randomID()

			if (countOfFields == maxOfFields) {
				stepAdd.classList.add('disabled')
			}

			if (countOfFields > 1) {
				const items = stepList.querySelectorAll('.step-item')
				items.forEach(e => {
					const del = e.querySelector('.step-item__delete')
					del.classList.remove('disabled')
					del.removeAttribute('tabindex', '-1')
				})
			}

			let stepItem = document.createElement("div")
			stepItem.classList.add('step-item')
			stepItem.setAttribute('id', `step-${fieldIndex}`)
			stepItem.innerHTML += `
				<label class="form-field__label  step-item__number" for="step-description-${fieldIndex}"></label>
				<button type="button" class="btn-reset  step-item__delete" aria-label="Удалить шаг">
					<svg class="icon" aria-hidden="true" focusable="false">
						<use href="${svgCross}" />
					</svg>
				</button>
				<div class="step-item__body">
					<div class="imageuploader  imageuploader--small  step-item__imageuploader">
						<div class="input  input--photo  imageuploader__input">
							<input type="file" name="step-photo-${fieldIndex}" id="step-photo-${fieldIndex}" accept=".jpg, .jpeg, .png" aria-label="Загрузите фото шага">
							<div class="imageuploader__placeholder">
								<svg class="icon" aria-hidden="true" focusable="false">
									<use href="${svgImage}"/>
								</svg>
								Загрузите фото шага
							</div>
						</div>
						<button type="button" class="btn  btn--other  imageuploader__btn  hidden" aria-label="Удалить фото шага">
							<svg class="icon  icon--16" aria-hidden="true" focusable="false">
								<use href="${svgDelete}" />
							</svg>
						</button>
					</div>
					<textarea name="step-description-${fieldIndex}" id="step-description-${fieldIndex}" class="input  input--textarea  step-item__input" placeholder="Замешиваем тесто для блинов. В 1 литр теплого молока добавляем 4 яйца..." autocomplete="off" aria-label="Описание шага"></textarea>
					<label class="form-field__error  hidden" for="step-description-${fieldIndex}">
						<svg class="icon  icon--16" aria-hidden="true" focusable="false">
							<use href="${svgCircleCross}"/>
						</svg>
						<span class="form-field__text"></span>
					</label>
				</div>
			`;
			stepList.append(stepItem)
		})
	}
})();
