(function(){
	if (document.querySelector('#edit-recipe-form')) {
		document.addEventListener('DOMContentLoaded', () => {
			const imageuploader = document.querySelectorAll('.imageuploader')

			imageuploader.forEach(uploader => {
				(async function() {
					if (uploader.getAttribute('data-image-url') != '' && uploader.getAttribute('data-image-url') != null) {
						const url = uploader.getAttribute('data-image-url')
						const nameFile = uploader.getAttribute('data-image-name');
						const wrapper = uploader.querySelector('.imageuploader__wrapper')
						const input = uploader.querySelector('.imageuploader__input')
						const placeholder = wrapper.querySelector('.imageuploader__placeholder')
						const delBtn = wrapper.parentNode.querySelector('.imageuploader__btn')

						const fetchImage = async (url) => {
							const data = await fetch(url);
							const buffer = await data.arrayBuffer();
							const blob = new Blob([buffer], { type: "image/jpg"});
							return blob;
						}

						const blob = await fetchImage(url);
						const file = new File([blob], nameFile)
						const dT = new ClipboardEvent('').clipboardData || new DataTransfer();

						dT.items.add(file);
						input.files = dT.files;
						wrapper.style.backgroundImage = `url(${url})`
						placeholder.classList.add('hidden')
						delBtn.classList.remove('hidden')
					}
				})();
			})
		})
	}
})();
