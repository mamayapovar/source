(function(){
	function menuMorePreInit(menuMoreWrapper) {
		const menuMoreToggle = menuMoreWrapper.querySelector('[data-menu-more-toggle]');
		const menuMoreList = menuMoreWrapper.querySelector('[data-menu-more-list]');
		const menuMoreItem = menuMoreList.querySelectorAll('[data-menu-more-item]');

		let optionsList = Array.from(menuMoreList.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function openMenu() {
			menuMoreToggle.classList.toggle('active')
			menuMoreList.classList.toggle('active')

			if (menuMoreList.classList.contains('active')) {
				menuMoreToggle.setAttribute('aria-expanded', 'true');
				menuMoreToggle.setAttribute('aria-label', 'Закрыть меню действий');
				updateOption(optionHoveredIndex);

				// добавляем прослушки действий
				document.addEventListener('click', watchClickOutside)
				document.addEventListener('keydown', supportKeyboardNavigation)
			} else {
				menuMoreToggle.setAttribute('aria-expanded', 'false');
				menuMoreToggle.setAttribute('aria-label', 'Открыть меню действий');
				updateOption(-1);

				// удаляем прослушки действий
				document.removeEventListener('click', watchClickOutside)
				document.removeEventListener('keydown', supportKeyboardNavigation)
			}
		}

		function closeMenu() {
			menuMoreToggle.classList.remove('active')
			menuMoreList.classList.remove('active')
			menuMoreToggle.setAttribute('aria-expanded', 'false');
			menuMoreToggle.setAttribute('aria-label', 'Открыть меню действий');
			updateOption(-1);

			// удаляем прослушки действий
			document.removeEventListener('click', watchClickOutside)
			document.removeEventListener('keydown', supportKeyboardNavigation)
		}

		function updateOption(newIndex) {
			optionsList = Array.from(menuMoreList.children)
			optionsCount = optionsList.length - 1
			const prevOption = menuMoreList.children[optionHoveredIndex];
			const option = menuMoreList.children[newIndex];

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
			if (target !== menuMoreToggle && target !== menuMoreList) {
				closeMenu()
			}
		}

		function supportKeyboardNavigation(e) {
			if (e.key === "ArrowDown" && menuMoreList.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateOption(optionHoveredIndex + 1);
			} else if (e.key === "ArrowDown" && menuMoreList.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				updateOption(0);
			}

			if (e.key === "ArrowUp" && menuMoreList.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateOption(optionHoveredIndex - 1);
			} else if (e.key === "ArrowUp" && menuMoreList.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateOption(optionsCount);
			}

			if (e.key === "Enter" && menuMoreList.classList.contains('active')) {
				e.preventDefault();
				closeMenu()
			}

			if (e.key === "Escape" || e.key === "Tab" && menuMoreList.classList.contains('active')) {
				closeMenu()
			}
		}

		menuMoreToggle.addEventListener('click', () => {
			openMenu()
		})

		menuMoreItem.forEach(item => {
			item.addEventListener('click', () => {
				closeMenu()
			})
		})
	}

	function menuMoreInit() {
		const allMenuMoreInPage = document.querySelectorAll('[data-menu-more]');
		allMenuMoreInPage.forEach(menuMoreWrapper => {
			menuMorePreInit(menuMoreWrapper);
		})
	}

	menuMoreInit()
})();
