(function(){
  if (document.querySelector('[data-short-ingredients]')) {
		function shortIngredientsPreInit(shortIngredientsWrapper) {
			const shortIngredientsToggle = shortIngredientsWrapper.querySelector('[data-short-ingredients-toggle]');
			const shortIngredientsList = shortIngredientsWrapper.querySelector('[data-short-ingredients-list]');
			const shortIngredientsItem = shortIngredientsList.querySelectorAll('[data-short-ingredients-item]');

			function openMenu() {
				shortIngredientsToggle.classList.toggle('active')
				shortIngredientsList.classList.toggle('active')

				if (shortIngredientsList.classList.contains('active')) {
					shortIngredientsToggle.setAttribute('aria-expanded', 'true');
					shortIngredientsToggle.setAttribute('aria-label', 'Закрыть меню действий');

					// добавляем прослушки действий
					document.addEventListener('click', watchClickOutside)
					document.addEventListener('keydown', supportKeyboardNavigation)
				} else {
					shortIngredientsToggle.setAttribute('aria-expanded', 'false');
					shortIngredientsToggle.setAttribute('aria-label', 'Открыть меню действий');

					// удаляем прослушки действий
					document.removeEventListener('click', watchClickOutside)
					document.removeEventListener('keydown', supportKeyboardNavigation)
				}
			}

			function closeMenu() {
				shortIngredientsToggle.classList.remove('active')
				shortIngredientsList.classList.remove('active')
				shortIngredientsToggle.setAttribute('aria-expanded', 'false');
				shortIngredientsToggle.setAttribute('aria-label', 'Открыть меню действий');

				// удаляем прослушки действий
				document.removeEventListener('click', watchClickOutside)
				document.removeEventListener('keydown', supportKeyboardNavigation)
			}

			function watchClickOutside(e) {
				const target = e.target
				if (target !== shortIngredientsToggle && target !== shortIngredientsList) {
					closeMenu()
				}
			}

			function supportKeyboardNavigation(e) {
				if (e.key === "Escape" || e.key === "Tab" && shortIngredientsList.classList.contains('active')) {
					closeMenu()
				}
			}

			shortIngredientsToggle.addEventListener('click', () => {
				openMenu()
			})

			shortIngredientsItem.forEach(item => {
				item.addEventListener('click', () => {
					closeMenu()
				})
			})
		}

		function shortIngredientsInit() {
			const allShortIngredientsInPage = document.querySelectorAll('[data-short-ingredients]');
			allShortIngredientsInPage.forEach(shortIngredientsWrapper => {
				shortIngredientsPreInit(shortIngredientsWrapper);
			})
		}

		shortIngredientsInit()
  }
})();
