(function(){
  if (document.querySelector('[data-search-query]')) {
		const searchQuery = document.querySelector('[data-search-query]');
		const searchMenu = document.querySelector('[data-search-menu]');
		const searchList = document.querySelector('[data-search-list]')
		const searchClear = document.querySelector('[data-search-clear]');

		let optionsList = Array.from(searchList.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function searchMenuOpen() {
			searchMenu.classList.add('active');
			searchQuery.setAttribute('aria-expanded', 'true');
			searchQueryChange()

			window.addEventListener('click', watchClickOutside);
			window.addEventListener('keydown', supportKeyboardNavigation);
		}

		function searchMenuClose() {
			searchMenu.classList.remove('active');
			searchQuery.setAttribute('aria-expanded', 'false');
			searchQuery.blur();
			updateSearchOption(-1);

			window.removeEventListener('click', watchClickOutside);
			window.removeEventListener('keydown', supportKeyboardNavigation);
		}

		function searchQueryClear() {
			searchQuery.value = ''
			searchQueryChange()
		}

		function searchQueryChange() {
			const searchAllBtn = document.querySelector('[data-search-all]');
			const searchLabel = searchMenu.querySelector('.search-query-menu__label');

			if (searchQuery.value != '') {
				searchMenu.setAttribute('data-search-menu', 'queries');
				searchLabel.classList.add('hidden');
				searchClear.setAttribute('tabindex', '0');
				searchClear.classList.add('active');
				updateSearchOption(optionHoveredIndex);

				if (!searchAllBtn) {
					addSearchAllBtn()
				}

			} else {
				searchQuery.focus()
				searchMenu.setAttribute('data-search-menu', 'recent');
				searchLabel.classList.remove('hidden');
				searchClear.classList.remove('active');
				searchClear.setAttribute('tabindex', '-1');
				updateSearchOption(optionHoveredIndex);

				if (searchAllBtn) {
					searchAllBtn.remove()
				}
			}

			if (!searchMenu.classList.contains('active')) {
				searchMenuOpen()
			}
		}

		function addSearchAllBtn() {
			const searchAllBtn = document.createElement('li')
			searchAllBtn.classList.add('search-query-menu__item')
			searchAllBtn.setAttribute('data-search-all', '')
			searchAllBtn.innerHTML = `
				<button type="submit" form="search-form" class="btn-reset  search-query-menu__link" tabindex="-1">
					<svg class="icon" aria-hidden="true" focusable="false">
						<use href="${svgArrowDownLeft}"/>
					</svg>
					<span>Перейти к запросам</span>
				</button>
			`

			searchList.append(searchAllBtn)
		}

		function updateSearchOption(newIndex) {
			optionsList = Array.from(searchList.children)
			optionsCount = optionsList.length - 1
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

		function watchClickOutside(e) {
			const target = e.target
      if (target !== searchQuery && target !== searchMenu && target !== searchClear) {
				searchMenuClose()
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
          const option = searchList.children[optionHoveredIndex];

          if (option.hasAttribute('data-search-link')) {
            e.preventDefault();
            const link = option.querySelector('a');
            const href = link.getAttribute('href');
            document.location = href;
            searchMenuClose();
          }
        }
			}

			// очистка списка результатов
			if (e.key === "Escape" && searchMenu.classList.contains('active')) {
				searchQueryClear()
			}

			// закрытие списка результатов
			if (e.key === "Tab" && searchMenu.classList.contains('active') && e.target.closest('[data-search-clear]')) {
				searchMenuClose()
			} else if (e.key === "Tab" && searchMenu.classList.contains('active') && !searchClear.classList.contains('active')) {
				searchMenuClose()
			} else if (e.shiftKey && e.key === "Tab" && searchMenu.classList.contains('active')) {
				searchMenuClose()
			}
		}

    searchQuery.addEventListener('focus', searchMenuOpen);
		searchClear.addEventListener('focusin', searchMenuClose)

    window.addEventListener('click', (e) => {
      const target = e.target

			if (target.closest('[data-search-link]') || target.closest('[data-search-all]') && searchMenu.classList.contains('active')) {
				searchMenuClose()
			}
    });

		// очистка списка результатов
		searchClear.addEventListener('click', searchQueryClear)

		// смена списка результатов
		searchQuery.addEventListener('keyup', searchQueryChange);
		searchQuery.addEventListener('keydown', searchQueryChange);
  }
})();
