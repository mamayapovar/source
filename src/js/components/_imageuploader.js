if (document.querySelector('.imageuploader')) {
	(function(){
		document.addEventListener('click', (e) => {
			const target = e.target
			if (target.classList.contains('imageuploader__input')) {
				const image = target
				const input = image.querySelector('input[type="file"]')
				const placeholder = image.querySelector('.imageuploader__placeholder')
				const delBtn = target.parentNode.querySelector('.imageuploader__btn')
				let uploadedImage = ""

				input.addEventListener('change', () => {
					if (!input.value == "") {
						const reader = new FileReader()
						file = input.files[0] || input.dataTransfer.files[0]

						reader.addEventListener('load', () => {
							uploadedImage = reader.result
							image.style.backgroundImage = `url(${uploadedImage})`
							placeholder.classList.add('hidden')
							delBtn.classList.remove('hidden')
						})
						reader.readAsDataURL(file)
					}
				})
			}

			if (target.classList.contains('imageuploader__btn')) {
				const image = target.parentNode.querySelector('.imageuploader__input')
				const input = image.querySelector('input[type="file"]')
				const placeholder = image.querySelector('.imageuploader__placeholder')
				const delBtn = target

				e.preventDefault()
				input.value = "";
				uploadedImage = ""
				image.style.backgroundImage = 'none'
				placeholder.classList.remove('hidden')
				delBtn.classList.add('hidden')
			}
		})
	})();
}
