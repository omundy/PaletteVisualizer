"use strict";



let colorArrays = {
	"packetSwitching2012": ['fa7c00', 'f98c00', 'd08c00', 'be9646', 'a58b6a', '818185', '777777', 'fff0c1', '768557', 'e2e900', '1574e5', '4c6b85', 'e1eaf2', '974542', '997749', 'fb9a00', 'fef59b', 'fef59b', '5b9058', '1574e5', '4c6b85', 'e1eaf2', '974542', 'eeeeee', 'fdce00', 'c5c5c5', 'ca9a5e', 'fef59b', 'fef59b', 'cccccc', 'dddddd', 'eeeeee', 'ffffff', '5b9058', 'fff0c1', 'fa7c00', 'f98c00', 'd08c00', 'be9646', 'a58b6a'],

	"tallyMonsters": ["#006A94", "#078591", "#078591", "#0c9a47", "#0c9a47", "#242960", "#253785", "#5b11db", "#74037f", "#800245", "#86037e", "#86037e", "#86037e", "#86037e", "#96023b", "#a74762", "#d43422", "#ed2820", "#f74229", "#f74229", "#f74229", "#f74229", "#f8061a", "#f8061a", "#f99033", "#fd27b0", "#fd27b0", "#fd27b0", "#fd27b0", "#fd27b0", "#fd27b0"],

	"adams": ["000000", "111111", "292929", "434343", "616161", "7f7f7f", "a1a1a1", "bdbdbd", "d9d9d9", "f0f0f0", "ffffff"],
	"hokusai": ["7d9ba6", "c0b7a8", "ddd3c4", "10284a", "474b4e"],
	"miyazaki": ["66748f", "766c91", "78566f", "523b59", "813a3c", "bc5e52", "ee8a78", "fac885", "eba15c", "9b5235"],
	"anderson": ["3a1302", "611305", "8a2b0e", "c75f24", "c89f59", "a4956b", "86856a", "756f61", "596160", "627a84"],

};


function sortHasc(c) {
	return c.sort(function(a, b) {
		return a.hsv[0].h - b.hsv[0].h;
	});
}

function sortSasc(c) {
	return c.sort(function(a, b) {
		return a.hsv[0].s - b.hsv[0].s;
	});
}

function sortVasc(c) {
	return c.sort(function(a, b) {
		return a.hsv[0].v - b.hsv[0].v;
	});
}

function displayPalette() {

	let colorsOut = []; // all color objects
	let colors = []; // colors returned from the user's string
	let colorPaletteOut = '';
	let hexColorStringList = '';
	let rgbColorStringList = '';
	let hsvColorStringList = '';

	// get colors
	let colorValues = document.forms.colorForm.orgColorValues.value;
	let colorMode = document.forms.colorForm.colorMode.value;
	let colorSort = document.forms.colorForm.colorSort.value;

	// match all hexidecimal values
	colors = colorValues.match(/[a-fA-F0-9]{6,6}/g);

	// if there are colors
	if (colors.length > 0) {

		// store colors
		for (let i = 0; i < colors.length; i++) {

			// an object for each color
			let c = {
				hex: "#" + colors[i],
				rgb: {
					rgb: "rgb(" + hex2rgb(colors[i]) + ")",
					r: hexToR(colors[i]),
					g: hexToG(colors[i]),
					b: hexToB(colors[i])
				}
			};
			c.hsv = rgb2hsv(c.rgb.r, c.rgb.g, c.rgb.b);
			colorsOut[i] = c;
		}



		// show color object
		console.log("before", getHexValues(colorsOut));

		// comparison functions for sorting palette
		if (colorSort == 'h_asc') {
			colorsOut = sortSasc(colorsOut);
			colorsOut = sortVasc(colorsOut);
			colorsOut = sortHasc(colorsOut);
		} else if (colorSort == 'h_desc') {
			colorsOut = colorsOut.reverse(sortSasc(colorsOut));
			colorsOut = colorsOut.reverse(sortVasc(colorsOut));
			colorsOut = colorsOut.reverse(sortHasc(colorsOut));
		} else if (colorSort == 's_asc') {
			colorsOut = sortVasc(colorsOut);
			colorsOut = sortHasc(colorsOut);
			colorsOut = sortSasc(colorsOut);
		} else if (colorSort == 's_desc') {
			colorsOut = colorsOut.reverse(sortVasc(colorsOut));
			colorsOut = colorsOut.reverse(sortHasc(colorsOut));
			colorsOut = colorsOut.reverse(sortSasc(colorsOut));
		} else if (colorSort == 'v_asc') {
			colorsOut = sortHasc(colorsOut);
			colorsOut = sortSasc(colorsOut);
			colorsOut = sortVasc(colorsOut);
		} else if (colorSort == 'v_desc') {
			colorsOut = colorsOut.reverse(sortHasc(colorsOut));
			colorsOut = colorsOut.reverse(sortSasc(colorsOut));
			colorsOut = colorsOut.reverse(sortVasc(colorsOut));
		} else if (colorSort == 'a_asc') {
			colorsOut = colorsOut.sort();
		} else if (colorSort == 'a_desc') {
			colorsOut = colorsOut.reverse();
		}

		// show color object
		console.log("after", getHexValues(colorsOut));

		// write to html
		for (let c in colorsOut) {
			let colorString;

			// user's preference for color display
			if (colorMode == 'hex') {
				colorString = colorsOut[c].hex;
			} else if (colorMode == 'rgb') {
				colorString = colorsOut[c].rgb.rgb;
			}

			// store palette
			colorPaletteOut += "<div class='color'>" +
				"<span class='swatch' style='background-color:" + colorString + "'></span>" +
				"<span class='smalltext'>" + colorString + "</span></div>";

			// store lists
			hexColorStringList += colorsOut[c].hex + ',';
			rgbColorStringList += colorsOut[c].rgb.rgb + ',';
			hsvColorStringList += colorsOut[c].hsv[0].h + ',' + colorsOut[c].hsv[0].s + ',' + colorsOut[c].hsv[0].v + "\n";
		}
		document.getElementById('palette').innerHTML = colorPaletteOut;
		document.getElementById('hexColorValues').innerHTML = hexColorStringList;
		document.getElementById('rgbColorValues').innerHTML = rgbColorStringList;
		document.getElementById('hsvColorValues').innerHTML = hsvColorStringList;
	}
}
// return random key from obj
var randomObjKey = function(obj) {
	var keys = Object.keys(obj);
	return keys[keys.length * Math.random() << 0];
};

// return string of hex values only
function getHexValues(obj) {
	return obj.map(function(elem) {
		return elem.hex;
	}).join(", ");
}

// insert and display random palette
function insertRandomPalette() {
	let name = randomObjKey(colorArrays);
	$("#orgColorValues").html(colorArrays[name].join(","));
	$("#paletteName").html(capitalizeFirstLetter(name));
	displayPalette();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// on load
insertRandomPalette();

// on change
$('#colorSort,#colorMode').on('change', function() {
	displayPalette();
});
