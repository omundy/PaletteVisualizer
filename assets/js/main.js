"use strict";

let orgColorValuesEle = document.querySelector("#orgColorValues");
let colorModeEle = document.querySelector("#colorMode");
let colorSortEle = document.querySelector("#colorSort");
let paletteNameEle = document.querySelector("#paletteName");
let paletteGradientEle = document.querySelector(".paletteGradient");

function convertPalette(colorValues, colorSort) {
	let colorsOut = []; // main array with all the color objects
	try {
		// array with all matching hexidecimal values from the string
		let colors = colorValues.match(/[a-fA-F0-9]{6,6}/g);

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
						a: hexToA(colors[i]),
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
		}
	} catch (err) {
		console.error(err);
	}
	return colorsOut;
}

function displayPalette() {
	try {
		let colorPaletteHtmlOut = "", // html of color palette
			hexColorStr = "", // str of just hex, rgb, hsv
			rgbColorStr = "",
			hsvColorStr = "",
			paletteGradient = "linear-gradient(to right, ";

		// get params from form
		let colorValues = orgColorValuesEle.value,
			colorMode = colorModeEle.value,
			colorSort = colorSortEle.value;

		// console.log("colorMode =", colorMode, ", colorSort =", colorSort, ", colors =", colors);

		let colorsOut = convertPalette(colorValues, colorSort);

		let i = 0;

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
				"<small>" +
				colorString +
				"</small></div>";

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

			if (i > 0) paletteGradient += ", ";
			paletteGradient += colorsOut[c].hex;

			i++;
		}

		// add the first color to the gradient so it can tile
		paletteGradient += ","+colorsOut[0].hex;

		orgColorValuesEle.value = getHexValues(colorsOut);
		document.getElementById("palette").innerHTML = colorPaletteHtmlOut;
		document.getElementById("hexColorValues").innerHTML = hexColorStr;
		document.getElementById("rgbColorValues").innerHTML = rgbColorStr;
		document.getElementById("hsvColorValues").innerHTML = hsvColorStr;

		paletteGradientEle.style.background = paletteGradient + ")";

		// }
	} catch (err) {
		console.error(err);
	}
}
colorModeEle.addEventListener("change", displayPalette);
colorSortEle.addEventListener("change", displayPalette);

// return string of hex values only
function getHexValues(obj) {
	return obj
		.map(function (index) {
			return index.hex;
		})
		.join(", ");
}

// insert and display random palette
function updatePalette(name) {
	// get name of random color palette
	if (!name) name = randomObjKey(colorArrays);

	orgColorValuesEle.value = colorArrays[name].join(",");
	paletteNameEle.innerHTML = convertSlugToTitle(name);

	displayPalette();
}

function convertSlugToTitle(slug) {
	return capitalizeFirstLetter(slug.replaceAll("-", " "));
}

function addPaletteButtons() {
	let paletteButtonsParent = document.querySelector(".paletteButtonsParent");
	let str = "";
	for (const key in colorArrays) {
		if (colorArrays.hasOwnProperty(key)) {
			// console.log(key, colorArrays[key]);

			let palette = "background: linear-gradient(to right, ";
			let max = Math.min(4, colorArrays[key].length);
			// get darkest

			let tempArr = colorArrays[key];
			for (let i = 0; i < max; i++) {
				if (i > 0) palette += ",";
				palette += "#" + tempArr[i];
			}
			// palette += "#f69d3c, #3f87a6";
			palette += ") !important;";

			str += `<button class="btn btn-light paletteButton" data-palette="${key}" style="${palette}">${convertSlugToTitle(
				key
			)}</button>`;
		}
	}
	paletteButtonsParent.insertAdjacentHTML("beforeend", str);

	const paletteButtons = document.querySelectorAll(".paletteButton");
	paletteButtons.forEach((item, i) => {
		item.addEventListener("click", (e) => {
			let name = e.target.dataset.palette;
			updatePalette(name);
			e.preventDefault();
		});
	});
}
addPaletteButtons();

// on load
updatePalette();

