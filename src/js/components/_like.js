(function(){
  if (document.querySelector('[data-button-like]')) {
		document.addEventListener('click', (e) => {
			const target = e.target

			if (target.classList.contains('content-footer__btn--like')) {
				const buttonIcon = target.querySelector('use')
				target.classList.toggle('active');

				if (target.classList.contains('active')) {
					target.setAttribute('aria-label', 'Убрать отметку "Нравится"');
					buttonIcon.setAttribute('href', `${svgHeartFilled}`)
				} else {
					target.setAttribute('aria-label', 'Поставить отметку "Нравится"');
					buttonIcon.setAttribute('href', `${svgHeart}`)
				}
			}
		})
  }
})();
