"use strict";

/**
 *	Color conversion functions
 *
 *  Copyright (c) 1999-2011 Alexei Kourbatov. All Rights Reserved.
 *
 *	http://www.javascripter.net/faq/hextorgb.htm
 *	http://www.javascripter.net/faq/rgbtohex.htm
 *	http://www.javascripter.net/faq/rgb2hsv.htm
 *
 */

function hexToR(h) {
	return parseInt((cutHex(h)).substring(0, 2), 16);
}

function hexToG(h) {
	return parseInt((cutHex(h)).substring(2, 4), 16);
}

function hexToB(h) {
	return parseInt((cutHex(h)).substring(4, 6), 16);
}

function cutHex(h) {
	return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
}

function hex2rgb(hex) {
	let r = hexToR(hex);
	let g = hexToG(hex);
	let b = hexToB(hex);
	return r + "," + g + "," + b;
}

function rgbToHex(R, G, B) {
	return toHex(R) + toHex(G) + toHex(B);
}

function toHex(n) {
	n = parseInt(n, 10);
	if (isNaN(n)) return "00";
	n = Math.max(0, Math.min(n, 255));
	return "0123456789ABCDEF".charAt((n - n % 16) / 16) +
		"0123456789ABCDEF".charAt(n % 16);
}

function rgb2hsv(r, g, b) {
	let computedH = 0;
	let computedS = 0;
	let computedV = 0;
	let hsv;

	//remove spaces from input RGB values, convert to int
	r = parseInt(('' + r).replace(/\s/g, ''), 10);
	g = parseInt(('' + g).replace(/\s/g, ''), 10);
	b = parseInt(('' + b).replace(/\s/g, ''), 10);

	if (r == null || g == null || b == null ||
		isNaN(r) || isNaN(g) || isNaN(b)) {
		alert('Please enter numeric RGB values!');
		return;
	}
	if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
		alert('RGB values must be in the range 0 to 255.');
		return;
	}
	r = r / 255;
	g = g / 255;
	b = b / 255;
	let minRGB = Math.min(r, Math.min(g, b));
	let maxRGB = Math.max(r, Math.max(g, b));

	// Black-gray-white
	if (minRGB == maxRGB) {
		computedV = minRGB;
		hsv = {
			h: 0,
			s: 0,
			v: roundToHundredth(computedV)
		};
		return [hsv];
	}

	// Colors other than black-gray-white:
	let d = (r == minRGB) ? g - b : ((b == minRGB) ? r - g : b - r);
	let h = (r == minRGB) ? 3 : ((b == minRGB) ? 1 : 5);

	hsv = {
		h: roundToHundredth(60 * (h - d / (maxRGB - minRGB))),
		s: roundToHundredth((maxRGB - minRGB) / maxRGB),
		v: roundToHundredth(maxRGB)
	};
	return [hsv];
}

const roundToHundredth = (value) => {
  return Number(value.toFixed(2));
};

function hsvToH(h) {
	h.split(',');
	return h[0];
}

function hsvToS(h) {
	h.split(',');
	return h[1];
}

function hsvToV(h) {
	h.split(',');
	return h[2];
}
