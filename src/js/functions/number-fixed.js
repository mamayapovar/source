export const numberFixed = (number, fixed) => {
	if ((typeof number === 'number' || typeof number === 'string') && !isNaN(number - parseFloat(number))) {
		number = String(number);
		var split = number.split('.');
		if (split.length > 1) {
			var left = split[0];
			var right = split[1].substr(0, (!fixed ? 1 : fixed));
			return Number(left + (fixed !== 0 ? '.' + right : ''));
		} else {
			return Number(number);
		}
	}
}
