(function(){
  if (document.querySelector('[data-menu-more]')) {
		const menuMore = document.querySelector('[data-menu-more]')
		let optionsList = Array.from(menuMore.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function openMenu(menuMoreToggle, menuMore) {
			menuMoreToggle.classList.toggle('active')
			menuMore.classList.toggle('active')

			if (menuMore.classList.contains('active')) {
				menuMoreToggle.setAttribute('aria-expanded', 'true');
				menuMoreToggle.setAttribute('aria-label', 'Закрыть меню действий');
				updateOption(optionHoveredIndex, menuMore)
			} else {
				menuMoreToggle.setAttribute('aria-expanded', 'false');
				menuMoreToggle.setAttribute('aria-label', 'Открыть меню действий');
			}
		}

		function closeMenu(menuMoreToggle, menuMore) {
			menuMoreToggle.forEach((e) => {
				e.setAttribute('aria-expanded', 'false');
				e.setAttribute('aria-label', 'Открыть меню действий');
				e.classList.remove('active')
			})

			menuMore.forEach((e) => {
				e.classList.remove('active');
			})
		}

		function updateOption(newIndex, menuMore) {
			optionsList = Array.from(menuMore.children)
			optionsCount = optionsList.length - 1
			const prevOption = menuMore.children[optionHoveredIndex];
			const option = menuMore.children[newIndex];

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

		function supportKeyboardNavigation(e, menuMoreToggle, menuMore) {
			menuMore.forEach((menu) => {
				if (e.key === "ArrowDown" && menu.classList.contains('active') && optionHoveredIndex < optionsCount) {
					e.preventDefault();
					updateOption(optionHoveredIndex + 1, menu);
				} else if (e.key === "ArrowDown" && menu.classList.contains('active') && optionHoveredIndex >= optionsCount) {
					e.preventDefault();
					optionHoveredIndex = 0;
					updateOption(optionHoveredIndex, menu);
				}

				if (e.key === "ArrowUp" && menu.classList.contains('active') && optionHoveredIndex > 0) {
					e.preventDefault();
					updateOption(optionHoveredIndex - 1, menu);
				} else if (e.key === "ArrowUp" && menu.classList.contains('active') && optionHoveredIndex <= 0) {
					e.preventDefault();
					updateOption(optionsCount, menu);
				}

				if (e.key === "Escape" || e.key === "Tab" && menu.classList.contains('active')) {
					closeMenu(menuMoreToggle, menuMore)
				}
			})

			// if (e.key === "Enter" && menuMore.classList.contains('active')) {
			// 	e.preventDefault();
			// 	const option = menuMore.children[optionHoveredIndex];
			// 	const optionLink = option && option.hasAttribute('data-menu-more-item')

			// 	if (optionLink) {
			// 		const link = option.querySelector('a')
			// 		const href = link.getAttribute('href')
			// 		document.location = href
			// 	}

			// 	closeMenu(menuMoreToggle, menuMore)
			// }
		}

		window.addEventListener('keydown', (e) => {
			const menuMoreToggle = document.querySelectorAll('[data-menu-more-toggle]')
			const menuMore = document.querySelectorAll('[data-menu-more]')
			supportKeyboardNavigation(e, menuMoreToggle, menuMore)
		})

		document.addEventListener('click', (e) => {
			const target = e.target

			if (target.closest('[data-menu-more-toggle]')) {
				const menuMoreToggle = target;
				const menuMore = target.nextElementSibling;

				openMenu(menuMoreToggle, menuMore)
			}

			if (target.closest('[data-menu-more-item]')) {
				const menuMoreToggle = document.querySelectorAll('[data-menu-more-toggle]')
				const menuMore = document.querySelectorAll('[data-menu-more]')

				closeMenu(menuMoreToggle, menuMore)
			}

			if (!target.closest('[data-menu-more-toggle]') && !target.closest('[data-menu-more]')) {
				const menuMoreToggle = document.querySelectorAll('[data-menu-more-toggle]')
				const menuMore = document.querySelectorAll('[data-menu-more]')

				closeMenu(menuMoreToggle, menuMore)
      }
		})
  }
})();
