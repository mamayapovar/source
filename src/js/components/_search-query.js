(function(){
  if (document.querySelector('[data-search-query]')) {
		const searchQuery = document.querySelector('[data-search-query]');
		const searchMenu = document.querySelector('[data-search-menu]');
		const searchList = document.querySelector('[data-search-list]')
		const searchLabel = searchMenu.querySelector('.search-query-menu__label');
		const searchClear = document.querySelector('[data-search-clear]');
		const searchAllBtn = searchMenu.querySelector('[data-search-all]');

		const optionsList = Array.from(searchList.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function searchMenuOpen() {
			searchMenu.classList.add('active');
			searchQuery.setAttribute('aria-expanded', 'true');
			searchQueryChange()
			window.addEventListener('keydown', supportKeyboardNavigation);
		}

		function searchMenuClose() {
			searchQuery.setAttribute('aria-expanded', 'false');
			searchQuery.blur();
			searchMenu.classList.remove('active');
			searchClear.classList.remove('active');
			searchClear.setAttribute('tabindex', '-1');
			window.removeEventListener('keydown', supportKeyboardNavigation);
		}

		function searchQueryChange() {
			if (searchQuery.value != '') {
				optionsCount = optionsList.length - 1
				searchMenu.setAttribute('data-search-menu', 'queries');
				searchLabel.classList.add('hidden');
				searchClear.setAttribute('tabindex', '0');
				searchClear.classList.add('active');
				searchAllBtn.style.display = 'flex';
				updateSearchOption(optionHoveredIndex);
			} else {
				optionsCount = optionsList.length - 2
				searchQuery.focus()
				searchMenu.setAttribute('data-search-menu', 'recent');
				searchLabel.classList.remove('hidden');
				searchClear.classList.remove('active');
				searchClear.setAttribute('tabindex', '-1');
				searchAllBtn.style.display = 'none';
			}

			if (!searchMenu.classList.contains('active')) {
				searchMenuOpen()
			}
		}

		function updateSearchOption(newIndex) {
			const prevOption = searchList.children[optionHoveredIndex];
			const option = searchList.children[newIndex];

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

		function supportKeyboardNavigation(e) {
			// перемещние вниз по списку результов
			if (e.key == "ArrowDown" && searchMenu.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateSearchOption(optionHoveredIndex + 1);
			} else if (e.key == "ArrowDown" && searchMenu.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				optionHoveredIndex = 0;
				updateSearchOption(optionHoveredIndex);
			}

			// перемещние вверх по списку результов
			if (e.key == "ArrowUp" && searchMenu.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateSearchOption(optionHoveredIndex - 1);
			} else if (e.key == "ArrowUp" && searchMenu.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateSearchOption(optionsCount);
			}

			// переход по ссылке в списке результатов
			if (e.key == "Enter" && searchMenu.classList.contains('active')) {
				const option = searchList.children[optionHoveredIndex];

				if (!option.hasAttribute('data-search-all')) {
					e.preventDefault();
					const link = option.querySelector('a')
					const href = link.getAttribute('href')
					document.location = href
				}
			}

			// очистка списка результатов
			if (e.key == "Escape" && searchMenu.classList.contains('active')) {
				searchQuery.value = ''
				searchQueryChange()
			}

			// закрытие списка результатов
			if (e.key == "Tab" && searchMenu.classList.contains('active') && e.target.closest('[data-search-clear]')) {
				searchMenuClose()
			} else if (e.key == "Tab" && searchMenu.classList.contains('active') && !searchClear.classList.contains('active')) {
				searchMenuClose()
			} else if (e.shiftKey && e.key == "Tab" && searchMenu.classList.contains('active')) {
				searchMenuClose()
			}
		}

		// открытие списка результатов
    searchQuery.addEventListener('focus', searchMenuOpen);

		// закрытие списка результатов
    window.addEventListener('click', (e) => {
      const target = e.target

			// закрытие списка результатов при клике по ссылке
			if (target.closest('[data-search-item]') && searchMenu.classList.contains('active')) {
				searchMenuClose()
			}

			// закрытие списка результатов при клике вне окна
      if (!target.closest('[data-search-query]') && !target.closest('[data-search-menu]') && !target.closest('[data-search-clear]')) {
				searchMenuClose()
      }
    });

		// очистка списка результатов
		searchClear.addEventListener('click', () => {
			searchQuery.value = ''
			searchQueryChange()
		})

		// смена списка результатов
		searchQuery.addEventListener('keyup', searchQueryChange);
		searchQuery.addEventListener('keydown', searchQueryChange);
  }
})();
