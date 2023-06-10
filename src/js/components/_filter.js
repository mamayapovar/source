(function(){
	function filterPreInit(filterWrapper) {
		const filterToggle = filterWrapper.querySelector('[data-filter-toggle]');
		const filterMenu = filterWrapper.querySelector('[data-filter-menu]');
		const filterItem = filterMenu.querySelectorAll('[data-filter-item]');
		const filterClear = document.querySelector('[data-filter-clear]');

		let optionsList = Array.from(filterMenu.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function openMenu() {
			filterToggle.classList.toggle('active')
			filterMenu.classList.toggle('active')

			if (filterMenu.classList.contains('active')) {
				filterToggle.setAttribute('aria-expanded', 'true');

				if (filterToggle.getAttribute('data-filter-toggle') == 'type') {
					filterToggle.setAttribute('aria-label', 'Закрыть фильтр «Тип»');
				} else if (filterToggle.getAttribute('data-filter-toggle') == 'cooking-time') {
					filterToggle.setAttribute('aria-label', 'Закрыть фильтр «Время приготовления»');
				} else if (filterToggle.getAttribute('data-filter-toggle') == 'ingredients') {
					filterToggle.setAttribute('aria-label', 'Закрыть фильтр «Количество ингредиентов»');
				}

				updateOption(optionHoveredIndex);

				// добавляем прослушки действий
				document.addEventListener('click', watchClickOutside)
				document.addEventListener('keydown', supportKeyboardNavigation)
			} else {
				filterToggle.setAttribute('aria-expanded', 'false');

				if (filterToggle.getAttribute('data-filter-toggle') == 'type') {
					filterToggle.setAttribute('aria-label', 'Открыть фильтр «Тип»');
				} else if (filterToggle.getAttribute('data-filter-toggle') == 'cooking-time') {
					filterToggle.setAttribute('aria-label', 'Открыть фильтр «Время приготовления»');
				} else if (filterToggle.getAttribute('data-filter-toggle') == 'ingredients') {
					filterToggle.setAttribute('aria-label', 'Открыть фильтр «Количество ингредиентов»');
				}

				updateOption(-1);

				// удаляем прослушки действий
				document.removeEventListener('click', watchClickOutside)
				document.removeEventListener('keydown', supportKeyboardNavigation)
			}
		}

		function closeMenu() {
			filterToggle.classList.remove('active')
			filterMenu.classList.remove('active')
			filterToggle.setAttribute('aria-expanded', 'false');
			filterToggle.setAttribute('aria-label', 'Открыть меню действий');
			updateOption(-1);

			// удаляем прослушки действий
			document.removeEventListener('click', watchClickOutside)
			document.removeEventListener('keydown', supportKeyboardNavigation)
		}

		function updateOption(newIndex) {
			optionsList = Array.from(filterMenu.children)
			optionsCount = optionsList.length - 1
			const prevOption = filterMenu.children[optionHoveredIndex];
			const option = filterMenu.children[newIndex];

			if (prevOption) {
				prevOption.classList.remove("focused");
			}

			if (option) {
				option.classList.add("focused");
			}

			if (option != optionsList[optionsCount]) {
				optionsList[optionsCount].classList.remove('focused')
			}

			optionHoveredIndex = newIndex;
		}

		function watchClickOutside(e) {
			const target = e.target
			if (target !== filterToggle && target !== filterMenu) {
				closeMenu()
			}
		}

		function supportKeyboardNavigation(e) {
			if (e.key === "ArrowDown" && filterMenu.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateOption(optionHoveredIndex + 1);
			} else if (e.key === "ArrowDown" && filterMenu.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				updateOption(0);
			}

			if (e.key === "ArrowUp" && filterMenu.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateOption(optionHoveredIndex - 1);
			} else if (e.key === "ArrowUp" && filterMenu.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateOption(optionsCount);
			}

			if (e.key === "Enter" && filterMenu.classList.contains('active')) {
				e.preventDefault();

				// https://codepen.io/sandrina-p/pen/yLprQgj?editors=1111

				// const option = filterMenu.children[optionHoveredIndex];
				// if (option) {
				// 	const link = option.querySelector('button')
				// 	const href = link.getAttribute('href')
				// 	document.location = href
				// }

				closeMenu()
			}

			if (e.key === "Escape" || e.key === "Tab" && filterMenu.classList.contains('active')) {
				closeMenu()
			}
		}

		filterToggle.addEventListener('click', () => {
			openMenu()
		})

		filterItem.forEach(item => {
			const btn = item.querySelector('.filter-menu__btn')
			const toggle = item.parentNode.parentNode.querySelector('[data-filter-toggle]')

			item.addEventListener('click', (e) => {
				e.preventDefault()
				btn.classList.toggle('selected')

				if (btn.classList.contains('selected')) {
					toggle.classList.add('selected')
					filterClear.disabled = false
				} else {
					toggle.classList.remove('selected')
					filterClear.disabled = true
				}
				closeMenu()
			})
		})

		filterClear.addEventListener('click', () => {
			const btns = filterMenu.querySelectorAll('.filter-menu__btn')
			const toggle = document.querySelectorAll('.filter__toggle')

			btns.forEach(el => {
				el.classList.remove('selected')
			})

			toggle.forEach(el => {
				el.classList.remove('selected')
			})

			filterClear.disabled = true
		})
	}

	function filterInit() {
		const allFilterInPage = document.querySelectorAll('[data-filter]');
		allFilterInPage.forEach(filterWrapper => {
			filterPreInit(filterWrapper);
		})
	}

	filterInit()
})();
