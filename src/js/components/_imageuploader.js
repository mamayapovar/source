(function(){
	if (document.querySelector('.imageuploader')) {
		let uploadedImage = ""
		document.addEventListener('click', (e) => {
			const target = e.target
			if (target.classList.contains('imageuploader__input')) {
				const input = target
				const wrapper = target.parentNode
				const placeholder = wrapper.querySelector('.imageuploader__placeholder')
				const delBtn = wrapper.parentNode.querySelector('.imageuploader__btn')

				input.addEventListener('change', () => {
					if (!input.value == "") {
						const reader = new FileReader()
						file = input.files[0] || input.dataTransfer.files[0]

						reader.addEventListener('load', () => {
							uploadedImage = reader.result
							wrapper.style.backgroundImage = `url(${uploadedImage})`
							placeholder.classList.add('hidden')
							delBtn.classList.remove('hidden')
						})
						reader.readAsDataURL(file)
					}
				})
			}

			if (target.classList.contains('imageuploader__btn')) {
				const wrapper = target.parentNode.querySelector('.imageuploader__wrapper')
				const input = wrapper.querySelector('.imageuploader__input')
				const placeholder = wrapper.querySelector('.imageuploader__placeholder')
				const delBtn = target

				e.preventDefault()
				input.value = "";
				uploadedImage = ""
				wrapper.style.backgroundImage = 'none'
				placeholder.classList.remove('hidden')
				delBtn.classList.add('hidden')
			}
		})
	}
})();
