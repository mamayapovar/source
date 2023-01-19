(function(){
	if (document.querySelector('.comments__input')) {
		const textArea = document.querySelector('.comments__input');

		textArea.setAttribute('style', 'height:' + (textArea.scrollHeight) + 'px');

		textArea.addEventListener("input", () => {
			textArea.style.height = 'auto';
			textArea.style.height = (textArea.scrollHeight) + 'px';
		});
	}
})();

