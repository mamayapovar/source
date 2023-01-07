(function(){
  if (document.querySelector('[data-menu-profile-toggle]')) {
		const menuProfileToggle = document.querySelector('[data-menu-profile-toggle]');
		const menuProfile = document.querySelector('[data-menu-profile]');
		const menuProfileLinks = document.querySelectorAll('[data-menu-profile-link]');

		let optionsList = Array.from(menuProfile.children)
		let optionsCount = optionsList.length;
		let optionHoveredIndex = -1;

		function closeMenu() {
			menuProfileToggle.setAttribute('aria-expanded', 'false');
			menuProfileToggle.setAttribute('aria-label', 'Открыть меню');
			menuProfileToggle.classList.remove('active')
			menuProfile.classList.remove('active');
		}

		function updateOption(newIndex) {
			optionsList = Array.from(menuProfile.children)
			optionsCount = optionsList.length - 1
			const prevOption = menuProfile.children[optionHoveredIndex];
			const option = menuProfile.children[newIndex];

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
			if (e.key === "ArrowDown" && menuProfile.classList.contains('active') && optionHoveredIndex < optionsCount) {
				e.preventDefault();
				updateOption(optionHoveredIndex + 1);
			} else if (e.key === "ArrowDown" && menuProfile.classList.contains('active') && optionHoveredIndex >= optionsCount) {
				e.preventDefault();
				optionHoveredIndex = 0;
				updateOption(optionHoveredIndex);
			}

			if (e.key === "ArrowUp" && menuProfile.classList.contains('active') && optionHoveredIndex > 0) {
				e.preventDefault();
				updateOption(optionHoveredIndex - 1);
			} else if (e.key === "ArrowUp" && menuProfile.classList.contains('active') && optionHoveredIndex <= 0) {
				e.preventDefault();
				updateOption(optionsCount);
			}

			if (e.key === "Enter" && menuProfile.classList.contains('active')) {
				e.preventDefault();
				const option = menuProfile.children[optionHoveredIndex];
				const optionLink = option && option.hasAttribute('data-menu-profile-link')

				if (optionLink) {
					const link = option.querySelector('a')
					const href = link.getAttribute('href')
					document.location = href
				}

				closeMenu()
			}

			if (e.key === "Escape" || e.key === "Tab" && menuProfile.classList.contains('active')) {
				closeMenu()
			}
		}

    menuProfileToggle.addEventListener('click', () => {
			menuProfileToggle.classList.toggle('active')
      menuProfile.classList.toggle('active');

      if (menuProfile.classList.contains('active')) {
        menuProfileToggle.setAttribute('aria-expanded', 'true');
        menuProfileToggle.setAttribute('aria-label', 'Закрыть меню');
				window.addEventListener('keydown', supportKeyboardNavigation)
				updateOption(optionHoveredIndex);
      } else {
        menuProfileToggle.setAttribute('aria-expanded', 'false');
        menuProfileToggle.setAttribute('aria-label', 'Открыть меню');
				window.removeEventListener('keydown', supportKeyboardNavigation)
      }
    });

    document.addEventListener('click', (e) => {
      const target = e.target
      if (!target.closest('[data-menu-profile-toggle]') && !target.closest('[data-menu-profile]') && menuProfile.classList.contains('active')) {
        closeMenu()
      }
    });

    menuProfileLinks.forEach(el => {
      el.addEventListener('click', closeMenu);
    });
  }
})();
