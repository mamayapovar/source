(function(){
	if (document.querySelector('[data-button-bookmark]')) {
		const buttonBookmark = document.querySelector('[data-button-bookmark]');

		document.addEventListener('click', (e) => {
			const target = e.target

			if (target.classList.contains('content-footer__btn--bookmark')) {
				const buttonIcon = target.querySelector('use')
				target.classList.toggle('active');

				if (target.classList.contains('active')) {
					target.setAttribute('aria-label', 'Убрать из закладок');
					buttonIcon.setAttribute('href', `${svgBookmarkFilled}`)
				} else {
					target.setAttribute('aria-label', 'Добавить в закладки');
					buttonIcon.setAttribute('href', `${svgBookmark}`)
				}
			}
		})
  }
})();
