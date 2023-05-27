const notifications = document.querySelector('.notifications')
let count = 0

const toastDetails = {
	timer: 5000,
	success: {
		icon: `${svgCheck}`,
	},
	info: {
		icon:  `${svgInfo}`,
	},
	warning: {
		icon:  `${svgWarning}`,
	},
	error: {
		icon: `${svgWarning}`,
	}
}

function removeToast (toast) {
	count--
	toast.classList.add('toast--hide')
	setTimeout(() => toast.remove(), 200)
}

function createToast (id, text) {
	const {icon} = toastDetails[id]
	const toast = document.createElement('li')
	toast.className = `toast  toast--${id}  toast--show`

	toast.innerHTML = `
		<div class="toast__icon">
			<svg class="icon  icon--16" aria-hidden="true" focusable="false">
				<use href="${icon}"/>
			</svg>
		</div>
		<span class="toast__text">${text}</span>
		<button class="toast__close  btn-reset" aria-label="Закрыть уведомление">
			<svg class="icon  icon--16" aria-hidden="true" focusable="false">
				<use href="${svgCross}"/>
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
