"use strict";

let orgColorValues = ['fa7c00','f98c00','d08c00','be9646','a58b6a','818185','777777','fff0c1','768557','e2e900','1574e5','4c6b85','e1eaf2','974542','997749','fb9a00','fef59b','fef59b','5b9058','1574e5','4c6b85','e1eaf2','974542','eeeeee','fdce00','c5c5c5','ca9a5e','fef59b','fef59b','cccccc','dddddd','eeeeee','ffffff','5b9058','fff0c1','fa7c00','f98c00','d08c00','be9646','a58b6a'];



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

		function sortHasc() {
			return colorsOut.sort(function(a, b) {
				return a.hsv[0].h - b.hsv[0].h
			});
		}

		function sortSasc() {
			return colorsOut.sort(function(a, b) {
				return a.hsv[0].s - b.hsv[0].s
			});
		}

		function sortVasc() {
			return colorsOut.sort(function(a, b) {
				return a.hsv[0].v - b.hsv[0].v
			});
		}

		// comparison functions for sorting palette
		if (colorSort == 'h_asc') {
			sortSasc();
			sortVasc();
			sortHasc();
		} else if (colorSort == 'h_desc') {
			colorsOut.reverse(sortSasc());
			colorsOut.reverse(sortVasc());
			colorsOut.reverse(sortHasc());
		} else if (colorSort == 's_asc') {
			sortVasc();
			sortHasc();
			sortSasc();
		} else if (colorSort == 's_desc') {
			colorsOut.reverse(sortVasc());
			colorsOut.reverse(sortHasc());
			colorsOut.reverse(sortSasc());
		} else if (colorSort == 'v_asc') {
			sortHasc();
			sortSasc();
			sortVasc();
		} else if (colorSort == 'v_desc') {
			colorsOut.reverse(sortHasc());
			colorsOut.reverse(sortSasc());
			colorsOut.reverse(sortVasc());
		}

		// show color object
		//console.log(colorsOut);

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

$("#orgColorValues").html(orgColorValues.join(","));
displayPalette();
