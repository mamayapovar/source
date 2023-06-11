import { randomID } from '../functions/random-id'

(function(){
	if (document.querySelector('.step')) {
		const stepSection = document.querySelector('.step');
		const stepList = stepSection.querySelector('.step__list')
		const stepAdd = stepSection.querySelector('.step__btn')
		const maxOfFields = 30;
		let countOfFields = 2;

		// удаление шага
		stepList.addEventListener('click', (e) => {
			let target = e.target
			if (target.classList.contains('step-item__delete') && countOfFields > 1) {
				e.preventDefault()
				countOfFields--;
				target.parentNode.remove()
			}

			if (countOfFields < maxOfFields) {
				stepAdd.disabled = false
			}

			if (countOfFields == 1) {
				const item = stepList.querySelector('.step-item')
				const del = item.querySelector('.step-item__delete')
				del.classList.add('disabled')
				del.disabled = true
			}
		})

		// добавление шага
		stepAdd.addEventListener('click', e => {
			e.preventDefault()
			countOfFields++;
			const fieldIndex = randomID()

			if (countOfFields == maxOfFields) {
				stepAdd.disabled = true
				stepAdd.blur()
			}

			if (countOfFields > 1) {
				const items = stepList.querySelectorAll('.step-item')
				items.forEach(e => {
					const del = e.querySelector('.step-item__delete')
					del.classList.remove('disabled')
					del.disabled = false
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
						<div class="input  input--photo  imageuploader__wrapper">
							<input type="file" class="imageuploader__input" name="step-photo-${fieldIndex}" id="step-photo-${fieldIndex}" accept=".jpg, .jpeg, .png" aria-label="Загрузи фото шага">
							<div class="imageuploader__placeholder">
								<svg class="icon" aria-hidden="true" focusable="false">
									<use href="${svgImage}"/>
								</svg>
								Загрузи фото шага
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
