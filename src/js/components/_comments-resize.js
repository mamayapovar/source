(function(){
	if (document.querySelector('.comments__input')) {
		const commentsArea = document.querySelector('.comments__input');
		// commentsArea.setAttribute('style', 'height:' + (commentsArea.scrollHeight) + 'px');

		commentsArea.addEventListener("input", () => {
			commentsArea.style.height = 'auto';
			commentsArea.style.height = (commentsArea.scrollHeight) + 'px';
		});
	}
})();

