(function () {
	if (document.querySelector('[data-search-query]')) {
		const searchQuery = document.querySelector('[data-search-query]');
		const searchMenu = document.querySelector('[data-search-menu]');
		const searchList = document.querySelector('[data-search-list]');
		const searchClear = document.querySelector('[data-search-clear]');
		const searchLink = document.querySelectorAll('[data-search-link]');

		let optionsList = Array.from(searchList.children);
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function searchMenuOpen() {
			if (searchQuery.value != '') {
				updateSearchOption(optionHoveredIndex);

				if (!searchMenu.classList.contains('active')) {
					searchMenu.classList.add('active');
					searchClear.setAttribute('tabindex', '0');
					searchClear.classList.add('active');
					window.addEventListener('click', watchClickOutside);
					window.addEventListener('keydown', supportKeyboardNavigation);
				}
			} else {
				searchMenuClear()
			}
		}

		function searchMenuClose() {
			searchQuery.blur();
			searchMenu.classList.remove('active');
			updateSearchOption(-1);
			window.removeEventListener('click', watchClickOutside);
			window.removeEventListener('keydown', supportKeyboardNavigation);
		}

		function searchMenuClear() {
			searchMenuClose();
			searchQuery.value = '';
			searchQuery.focus();
			searchClear.setAttribute('tabindex', '-1');
			searchClear.classList.remove('active');
			searchLink.forEach(e => e.remove());
		}

		function updateSearchOption(newIndex) {
			optionsList = Array.from(searchList.children);
			optionsCount = optionsList.length - 1;
			const prevOption = searchList.children[optionHoveredIndex];
			const option = searchList.children[newIndex];
			if (prevOption) {
				prevOption.classList.remove("focused");
				prevOption.removeAttribute('aria-selected')
			}
			if (option) {
				option.classList.add("focused");
				option.setAttribute('aria-selected', 'true')
			}
			if (option != optionsList[optionsCount]) {
				optionsList[optionsCount].classList.remove('focused');
				optionsList[optionsCount].removeAttribute('aria-selected');
			}
			optionHoveredIndex = newIndex;
		}

		function watchClickOutside(e) {
			const target = e.target;
			if (target !== searchQuery && target !== searchMenu && target !== searchClear) {
				searchMenuClose();
			}
		}

		function supportKeyboardNavigation(e) {
			// перемещние вниз по списку результов
			if (e.key === "ArrowDown" && searchMenu.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateSearchOption(optionHoveredIndex + 1);
			} else if (e.key === "ArrowDown" && searchMenu.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				optionHoveredIndex = 0;
				updateSearchOption(optionHoveredIndex);
			}

			// перемещние вверх по списку результов
			if (e.key === "ArrowUp" && searchMenu.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateSearchOption(optionHoveredIndex - 1);
			} else if (e.key === "ArrowUp" && searchMenu.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateSearchOption(optionsCount);
			}

			// переход по ссылке в списке результатов
			if (e.key === "Enter" && searchMenu.classList.contains('active')) {
				if (searchList.children[optionHoveredIndex]) {
					e.preventDefault();
					const option = searchList.children[optionHoveredIndex];
					option.firstElementChild.click()
					searchMenuClose();
				}
			}

			// очистка списка результатов
			if (e.key === "Escape" && searchMenu.classList.contains('active')) {
				searchMenuClear();
			}
			if (e.key === "Tab" && searchMenu.classList.contains('active') && e.target.closest('[data-search-clear]')) {
				searchMenuClose();
			} else if (e.key === "Tab" && searchMenu.classList.contains('active') && !searchClear.classList.contains('active')) {
				searchMenuClose();
			} else if (e.shiftKey && e.key === "Tab" && searchMenu.classList.contains('active')) {
				searchMenuClose();
			}
		}

		// вывод запроса после отправки формы
		document.addEventListener('DOMContentLoaded', () => {
			if (document.querySelector('.search__info .info__name')) {
				const query = document.querySelector('.search__info .info__name');
				searchQuery.value = query.textContent;
				searchClear.setAttribute('tabindex', '0');
				searchClear.classList.add('active');
			}
		});

		// открытие списка результатов
		searchQuery.addEventListener('click', searchMenuOpen);
		searchQuery.addEventListener('keyup', searchMenuOpen);
		searchQuery.addEventListener('keydown', searchMenuOpen);

		// закрытие списка результатов
		searchClear.addEventListener('focusin', searchMenuClose);
		window.addEventListener('click', e => {
			const target = e.target;
			if (target.closest('[data-search-link]') || target.closest('[data-search-all]') && searchMenu.classList.contains('active')) {
				searchMenuClose();
			}
		});

		// очистка списка результатов
		searchClear.addEventListener('click', searchMenuClear);

		// проверка на наличие запроса
    window.addEventListener('keydown', e => {
      if (e.key === "Enter" && searchQuery == document.activeElement && searchQuery.value < 1) {
        e.preventDefault();
      }
    });

		const config = {
			childList: true,
		};

		const callback = function (mutationsList, observer) {
			for (let mutation of mutationsList) {
				if (mutation.type === 'childList') {
					updateSearchOption(-1);
				}
			}
		};

		const observer = new MutationObserver(callback);
		observer.observe(searchList, config);
	}
})();
