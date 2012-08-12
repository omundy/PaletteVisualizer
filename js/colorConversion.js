
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
 
function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
function hex2rgb (hex) {
	var r = hexToR(hex);
	var g = hexToG(hex);
	var b = hexToB(hex);
	return r+","+g+","+b;
}
function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
function toHex(n) {
	n = parseInt(n,10);
	if (isNaN(n)) return "00";
	n = Math.max(0,Math.min(n,255));
	return "0123456789ABCDEF".charAt((n-n%16)/16)
		+ "0123456789ABCDEF".charAt(n%16);
}
function rgb2hsv (r,g,b) {
	var computedH = 0;
	var computedS = 0;
	var computedV = 0;
	
	//remove spaces from input RGB values, convert to int
	var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
	var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
	var b = parseInt( (''+b).replace(/\s/g,''),10 ); 
	
	if ( r==null || g==null || b==null ||
		isNaN(r) || isNaN(g)|| isNaN(b) ) {
		alert ('Please enter numeric RGB values!');
		return;
	}
	if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
		alert ('RGB values must be in the range 0 to 255.');
		return;
	}
	r=r/255; g=g/255; b=b/255;
	var minRGB = Math.min(r,Math.min(g,b));
	var maxRGB = Math.max(r,Math.max(g,b));
	
	// Black-gray-white
	if (minRGB==maxRGB) {
		computedV = minRGB;
		var hsv = {
			h : 0,
			s : 0,
			v : computedV
		}
		return [hsv];
 	}
	
	// Colors other than black-gray-white:
	var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
	var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
	
	var hsv = {
		h : 60*(h - d/(maxRGB - minRGB)),
		s : (maxRGB - minRGB)/maxRGB,
		v : maxRGB
	}
	return [hsv];
}
function hsvToH(h) {h.split(','); return h[0]}
function hsvToS(h) {h.split(','); return h[1]}
function hsvToV(h) {h.split(','); return h[2]}