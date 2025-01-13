"use strict";

let colorArrays = {
	packetSwitching2012: [
		"fa7c00",
		"f98c00",
		"d08c00",
		"be9646",
		"a58b6a",
		"818185",
		"777777",
		"fff0c1",
		"768557",
		"e2e900",
		"1574e5",
		"4c6b85",
		"e1eaf2",
		"974542",
		"997749",
		"fb9a00",
		"fef59b",
		"fef59b",
		"5b9058",
		"1574e5",
		"4c6b85",
		"e1eaf2",
		"974542",
		"eeeeee",
		"fdce00",
		"c5c5c5",
		"ca9a5e",
		"fef59b",
		"fef59b",
		"cccccc",
		"dddddd",
		"eeeeee",
		"ffffff",
		"5b9058",
		"fff0c1",
		"fa7c00",
		"f98c00",
		"d08c00",
		"be9646",
		"a58b6a",
	],

	tallyMonsters: [
		"#0078C2",
		"#00A7E5",
		"#078591",
		"#0c9a47",
		"#0E6897",
		"#1DB954",
		"#21753E",
		"#242960",
		"#253785",
		"#5b11db",
		"#636363",
		"#74037f",
		"#7ba2a3",
		"#800245",
		"#86037e",
		"#95a43f",
		"#96023b",
		"#9b0465",
		"#a74762",
		"#be0441",
		"#d43422",
		"#d90623",
		"#ed2820",
		"#f74229",
		"#f8061a",
		"#f9672c",
		"#f9d24c",
		"#fa9a6d",
		"#fc7185",
		"#fc9731",
		"#fd27b0",
	],

	adams: [
		"000000",
		"111111",
		"292929",
		"434343",
		"616161",
		"7f7f7f",
		"a1a1a1",
		"bdbdbd",
		"d9d9d9",
		"f0f0f0",
		"ffffff",
	],

	hokusai: ["7d9ba6", "c0b7a8", "ddd3c4", "10284a", "474b4e"],

	miyazaki: [
		"66748f",
		"766c91",
		"78566f",
		"523b59",
		"813a3c",
		"bc5e52",
		"ee8a78",
		"fac885",
		"eba15c",
		"9b5235",
	],

	// Wes Anderson
	anderson: [
		"3a1302",
		"611305",
		"8a2b0e",
		"c75f24",
		"c89f59",
		"a4956b",
		"86856a",
		"756f61",
		"596160",
		"627a84",
	],
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

function displayPalette() {
	try {
		let colorsOut = [], // main array with all the color objects
			colorPaletteHtmlOut = "", // html of color palette
			hexColorStr = "", // str of just hex, rgb, hsv
			rgbColorStr = "",
			hsvColorStr = "";

		// get params from form
		let colorValues = $("#orgColorValues").val(),
			colorMode = $("#colorMode").val(),
			colorSort = $("#colorSort").val();

		// array with all matching hexidecimal values from the string
		let colors = colorValues.match(/[a-fA-F0-9]{6,6}/g);

		// console.log("colorMode =", colorMode, ", colorSort =", colorSort, ", colors =", colors);

		// if there are colors
		if (colors.length > 0) {
			// store colors
			for (let i = 0; i < colors.length; i++) {
				// create an object for each color
				let c = {
					str: String(colors[i]),
					hex: "#" + colors[i],
					rgb: {
						rgb: "rgb(" + hex2rgb(colors[i]) + ")",
						r: hexToR(colors[i]),
						g: hexToG(colors[i]),
						b: hexToB(colors[i]),
					},
				};
				c.hsv = rgb2hsv(c.rgb.r, c.rgb.g, c.rgb.b);
				colorsOut[i] = c;
			}

			// console.log("colorsOut", colorsOut);
			// console.log("before", getHexValues(colorsOut));

			// HUE
			if (colorSort == "h_asc") {
				// sort saturation, value, then hue
				colorsOut = sortSasc(colorsOut);
				colorsOut = sortVasc(colorsOut);
				colorsOut = sortHasc(colorsOut);
			} else if (colorSort == "h_desc") {
				// sort saturation, value, then hue, reversing each
				colorsOut = sortSasc(colorsOut).reverse();
				colorsOut = sortVasc(colorsOut).reverse();
				colorsOut = sortHasc(colorsOut).reverse();
			}
			// SATURATION
			else if (colorSort == "s_asc") {
				// sort value, hue, then saturation
				colorsOut = sortVasc(colorsOut);
				colorsOut = sortHasc(colorsOut);
				colorsOut = sortSasc(colorsOut);
			} else if (colorSort == "s_desc") {
				// sort value, hue, then saturation, reversing each
				colorsOut = sortVasc(colorsOut).reverse();
				colorsOut = sortHasc(colorsOut).reverse();
				colorsOut = sortSasc(colorsOut).reverse();
			}
			// VALUE
			else if (colorSort == "v_asc") {
				// sort hue, saturation, then value
				colorsOut = sortHasc(colorsOut);
				colorsOut = sortSasc(colorsOut);
				colorsOut = sortVasc(colorsOut);
			} else if (colorSort == "v_desc") {
				// sort hue, saturation, then value, reversing each
				colorsOut = sortHasc(colorsOut).reverse();
				colorsOut = sortSasc(colorsOut).reverse();
				colorsOut = sortVasc(colorsOut).reverse();
			}
			// ALPHA
			else if (colorSort == "a_asc") {
				// alphabetical sort
				colorsOut = alphaSort(colorsOut, "str");
			} else if (colorSort == "a_desc") {
				// alphabetical sort, then reverse sort
				colorsOut = alphaSort(colorsOut, "str").reverse();
			}

			// console.log("after", getHexValues(colorsOut));

			// write to html
			for (let c in colorsOut) {
				let colorString;

				// user's preference for color display
				if (colorMode == "hex") {
					colorString = colorsOut[c].hex;
				} else if (colorMode == "rgb") {
					colorString = colorsOut[c].rgb.rgb;
				}

				// store palette
				colorPaletteHtmlOut +=
					"<div class='color'>" +
					"<span class='swatch' style='background-color:" +
					colorString +
					"'></span>" +
					"<span class='smalltext'>" +
					colorString +
					"</span></div>";

				// store lists
				hexColorStr += colorsOut[c].hex + ",";
				rgbColorStr += colorsOut[c].rgb.rgb + ",";
				hsvColorStr +=
					colorsOut[c].hsv[0].h +
					"," +
					colorsOut[c].hsv[0].s +
					"," +
					colorsOut[c].hsv[0].v +
					"\n";
			}
			$("#orgColorValues").val(getHexValues(colorsOut));
			document.getElementById("palette").innerHTML = colorPaletteHtmlOut;
			document.getElementById("hexColorValues").innerHTML = hexColorStr;
			document.getElementById("rgbColorValues").innerHTML = rgbColorStr;
			document.getElementById("hsvColorValues").innerHTML = hsvColorStr;
		}
	} catch (err) {
		console.error(err);
	}
}
// return random key from obj
var randomObjKey = function (obj) {
	var keys = Object.keys(obj);
	return keys[(keys.length * Math.random()) << 0];
};

// return string of hex values only
function getHexValues(obj) {
	return obj
		.map(function (index) {
			return index.hex;
		})
		.join(", ");
}

// insert and display random palette
function insertRandomPalette() {
	// get name of random color palette
	let name = randomObjKey(colorArrays);
	$("#orgColorValues").val(colorArrays[name].join(","));
	$("#paletteName").html(capitalizeFirstLetter(name));

	getRandomSelectOption("#colorSort");
	displayPalette();
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

// on load
insertRandomPalette();

// on change
$("#colorSort,#colorMode").on("change", function () {
	displayPalette();
});

function getRandomSelectOption(id) {
	// get options
	let colorSortOptions = $(id + " option");

	let values = $.map(colorSortOptions, function (option) {
		return option.value;
	});
	return values;
}
