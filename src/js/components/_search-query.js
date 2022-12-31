import vars from "../_vars";

(function(){
  if (document.querySelector('[data-search-query]')) {
		const searchQuery = document.querySelector('[data-search-query]');
		const searchMenu = document.querySelector('[data-search-menu]');
		const searchList = document.querySelector('[data-search-list]')
		const searchLabel = searchMenu.querySelector('.search-query-menu__label');
		const searchClear = document.querySelector('[data-search-clear]');
		const searchToQueries = searchMenu.querySelector('.search-query-menu__item--queries');

		const optionsList = Array.from(searchList.children)
		const optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function searchQueryChange() {
			if (searchQuery.value != '') {
				searchMenu.setAttribute('data-search-menu', 'queries');
				searchLabel.classList.add('hidden');
				searchClear.setAttribute('tabindex', '0');
				searchClear.classList.add('active');
				searchToQueries.classList.add('active');
			} else {
				searchQuery.focus()
				searchMenu.setAttribute('data-search-menu', 'recent');
				searchLabel.classList.remove('hidden');
				searchClear.classList.remove('active');
				searchClear.setAttribute('tabindex', '-1');
				searchToQueries.classList.remove('active');
			}
		}

		function searchMenuOpen() {
			searchMenu.classList.add('active');
			searchQuery.setAttribute('aria-expanded', 'true');
			searchQueryChange()
		}

		function searchMenuClose() {
			searchQuery.setAttribute('aria-expanded', 'false');
			searchQuery.blur();
			searchMenu.classList.remove('active');
			searchClear.classList.remove('active');
			searchClear.setAttribute('tabindex', '-1');
		}

		// открытие списка результатов при фокусе на поле поиска
    searchQuery.addEventListener('focus', searchMenuOpen);

		// смена списка результатов при вводе запросов
    searchQuery.addEventListener('keyup', searchQueryChange);
		searchQuery.addEventListener('keydown', searchQueryChange);

		// закрытие списка результатов по клику
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

		function updateCustomSelectHovered(newIndex) {
			const prevOption = searchList.children[optionHoveredIndex];
			const option = searchList.children[newIndex];

			if (prevOption) {
				prevOption.classList.remove("focused");
			}
			if (option) {
				option.classList.add("focused");
			}

			optionHoveredIndex = newIndex;
		}

		// очистка / закрытие списка результатов по нажатию
		window.addEventListener('keydown', (e) => {
      const target = e.target

			// press down -> go next
			if (e.key == "ArrowDown" && searchMenu.classList.contains('active') && searchMenu.getAttribute('data-search-menu') == 'recent' && optionHoveredIndex < optionsCount - 2) {
				e.preventDefault();
				updateCustomSelectHovered(optionHoveredIndex + 1);
			} else if (e.key == "ArrowDown" && searchMenu.classList.contains('active') && searchMenu.getAttribute('data-search-menu') == 'queries' && optionHoveredIndex < optionsCount - 1) {
				e.preventDefault();
				updateCustomSelectHovered(optionHoveredIndex + 1);
			}

			// press up -> go previous
			if (e.key == "ArrowUp" && searchMenu.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateCustomSelectHovered(optionHoveredIndex - 1);
			}

			// очистка списка результатов при нажатие на ESC
			if (e.key == "Escape" && searchMenu.classList.contains('active')) {
				searchQuery.value = ''
				searchQueryChange()
			}

			// закрытие списка результатов при нажатие на Tab
			if (e.key == "Tab" && searchMenu.classList.contains('active') && target.closest('[data-search-clear]')) {
				searchMenuClose()
			} else if (e.key == "Tab" && searchMenu.classList.contains('active') && !searchClear.classList.contains('active')) {
				searchMenuClose()
			} else if (e.shiftKey && e.key == "Tab" && searchMenu.classList.contains('active')) {
				searchMenuClose()
			}
		});

		// очистка списка результатов по клику на кнопку
		searchClear.addEventListener('click', (e) => {
			searchQuery.value = ''
			searchQueryChange()
		})
  }
})();
