function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// return random key from obj
var randomObjKey = function (obj) {
	var keys = Object.keys(obj);
	return keys[(keys.length * Math.random()) << 0];
};

/**
 *	Sort an array objects by property values (string)
 */
function alphaSort(arr, key) {
	return arr.sort(function (a, b) {
		// console.log(a[key]);
		return a[key].localeCompare(b[key]);
	});
}
/**
 *	Sort an array objects by property values (number)
 */
function numberSort(arr, key) {
	return arr.sort(function (a, b) {
		// console.log(a[key], a[key] - b[key]);
		return a[key] - b[key];
	});
}

function sortHasc(c) {
	return c.sort(function (a, b) {
		return a.hsv[0].h - b.hsv[0].h;
	});
}

function sortSasc(c) {
	return c.sort(function (a, b) {
		return a.hsv[0].s - b.hsv[0].s;
	});
}

function sortVasc(c) {
	return c.sort(function (a, b) {
		return a.hsv[0].v - b.hsv[0].v;
	});
}
