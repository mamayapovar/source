if (document.querySelector('.notifications')) {
	const notifications = document.querySelector('.notifications')
	let count = 0

	const toastDetails = {
		timer: 5000,
		success: {
			icon: "check",
			text: "Вы успешно зарегистрировались"
		},
		info: {
			icon: "info",
			text: "Рецепт отправлен на проверку"
		},
		warning: {
			icon: "warning",
			text: "Будьте внимательны"
		},
		error: {
			icon: "warning",
			text: "Произошла ошибка сервера"
		}
	}

	const removeToast = (toast) => {
		count--
		toast.classList.add('toast--hide')
		setTimeout(() => toast.remove(), 200)
	}

	const createToast = (id) => {
		const {icon, text} = toastDetails[id]
		const toast = document.createElement('li')
		toast.className = `toast  toast--${id}  toast--show`

		toast.innerHTML = `
			<div class="toast__icon">
				<svg class="icon  icon--16" aria-hidden="true" focusable="false">
					<use href="img/sprite.svg#${icon}"/>
				</svg>
			</div>
			<span class="toast__text">${text}</span>
			<button class="toast__close  btn-reset" aria-label="Закрыть уведомление">
				<svg class="icon  icon--16" aria-hidden="true" focusable="false">
					<use href="img/sprite.svg#cross"/>
				</svg>
			</button>
		`
		notifications.appendChild(toast)

		count++
		if (count > 4) {
			let topToast = document.querySelector('.toast')
			removeToast(topToast)
		}

		setTimeout(() => removeToast(toast), toastDetails.timer)
	}

	document.addEventListener('click', (e) => {
		const target = e.target
		if (target.classList.contains('toast__close')) {
			removeToast(target.parentElement)
		}
	})
}
