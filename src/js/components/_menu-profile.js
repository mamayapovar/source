(function(){
  if (document.querySelector('[data-menu-profile-toggle]')) {
		const menuProfileToggle = document.querySelector('[data-menu-profile-toggle]');
		const menuProfile = document.querySelector('[data-menu-profile]');
		const menuProfileLinks = document.querySelectorAll('[data-menu-profile-link]');

		let optionsList = Array.from(menuProfile.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function openMenu() {
			menuProfileToggle.classList.toggle('active')
      menuProfile.classList.toggle('active');

      if (menuProfile.classList.contains('active')) {
        menuProfileToggle.setAttribute('aria-expanded', 'true');
        menuProfileToggle.setAttribute('aria-label', 'Закрыть меню');
				updateOption(optionHoveredIndex);

				// добавление прослушек действий
				document.addEventListener('click', watchClickOutside)
				document.addEventListener('keydown', supportKeyboardNavigation)
      } else {
        menuProfileToggle.setAttribute('aria-expanded', 'false');
        menuProfileToggle.setAttribute('aria-label', 'Открыть меню');
				updateOption(-1);

				// удаление прослушек действий
				document.removeEventListener('click', watchClickOutside)
				document.removeEventListener('keydown', supportKeyboardNavigation)
      }
		}

		function closeMenu() {
			menuProfileToggle.classList.remove('active')
			menuProfile.classList.remove('active');
			menuProfileToggle.setAttribute('aria-expanded', 'false');
			menuProfileToggle.setAttribute('aria-label', 'Открыть меню');
			updateOption(-1);

			// удаление прослушек действий
			document.removeEventListener('click', watchClickOutside)
			document.removeEventListener('keydown', supportKeyboardNavigation)
		}

		function updateOption(newIndex) {
			optionsList = Array.from(menuProfile.children)
			optionsCount = optionsList.length - 1
			const prevOption = menuProfile.children[optionHoveredIndex];
			const option = menuProfile.children[newIndex];

			if (prevOption) {
				prevOption.classList.remove("focused");
				prevOption.removeAttribute('aria-selected')
			}

			if (option) {
				option.classList.add("focused");
				option.setAttribute('aria-selected', 'true')
			}

			if (option != optionsList[optionsCount]) {
				optionsList[optionsCount].classList.remove('focused')
				optionsList[optionsCount].removeAttribute('aria-selected');
			}

			optionHoveredIndex = newIndex;
		}

		function watchClickOutside(e) {
			const target = e.target
      if (target !== menuProfileToggle && target !== menuProfile) {
        closeMenu()
      }
		}

		function supportKeyboardNavigation(e) {
			if (e.key === "ArrowDown" && menuProfile.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateOption(optionHoveredIndex + 1);
			} else if (e.key === "ArrowDown" && menuProfile.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				updateOption(0);
			}

			if (e.key === "ArrowUp" && menuProfile.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateOption(optionHoveredIndex - 1);
			} else if (e.key === "ArrowUp" && menuProfile.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateOption(optionsCount);
			}

			if (e.key === "Enter" && menuProfile.classList.contains('active')) {
        if (menuProfile.children[optionHoveredIndex]) {
          e.preventDefault();
          const option = menuProfile.children[optionHoveredIndex];
          option.firstElementChild.click()
          closeMenu();
        }
			}

			if (e.key === "Escape" || e.key === "Tab" && menuProfile.classList.contains('active')) {
				closeMenu()
			}
		}

    menuProfileToggle.addEventListener('click', () => {
			openMenu()
    });

    menuProfileLinks.forEach(el => {
      el.addEventListener('click', closeMenu);
    });
  }
})();
