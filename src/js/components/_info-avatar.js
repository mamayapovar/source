(function(){
	if (document.querySelector('.info-avatar--change')) {
		const infoAvatar = document.querySelector('.info-avatar--change')
		const wrapper = infoAvatar.querySelector('.info-avatar__wrapper')
		const input = infoAvatar.querySelector('.info-avatar__input')
		let uploadedImage = ""

		input.addEventListener('change', () => {
			if (!input.value == "") {
				const reader = new FileReader()
				reader.addEventListener('load', () => {
					uploadedImage = reader.result
					wrapper.style.backgroundImage = `url(${uploadedImage})`
				})
				reader.readAsDataURL(input.files[0])
			}
		})
	}
})();

