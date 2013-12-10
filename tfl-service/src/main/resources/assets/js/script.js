//var svg;
//
//function svgloaded() {
//	var svgEmbed = document.querySelector("#routes");
//	svg = svgEmbed.getSVGDocument();
////	setRouteColor("Victoria", "#FFFFFF");
////	setRouteThickness("Victoria", "15");
////	setRouteColor("Picadilly", "#00FFFF");
//}
//
//function setRouteColor(route, colour) {
//	$(svg).find("#" + route).find("path").attr("stroke", colour);
//}
//
//function setRouteThickness(route, thickness) {
//	$(svg).find("#" + route).find("path").attr("stroke-width", thickness);
//}
// 
//
//document.addEventListener("DOMContentLoaded", function(){
//	var svgEmbed = document.querySelector("#routes");
//	svgEmbed.addEventListener("load", svgloaded);
// 
//}, false);


var bb = bb || {};
bb.tl = bb.tl || {};
bb.tl.vars = bb.tl.vars || {};

bb.tl.init = function() {
	$('#mask').width($(window).width()).height($(window).height());
	
 	bb.tl.vars.paper = Raphael('map', 2426, 1615);	
	bb.tl.vars.properties = bb.tl.vars.paper.set();
	
	bb.tl.addTubeLines();
	bb.tl.addTubeStations();
	bb.tl.setupListeners();
	
	console.log(bb.tl.lines["Central"].paths[0].getSubpath(40,80).attr("stroke", "#000000"));
	// bb.tl.vars.map.attr('opacity':0);
};

bb.tl.addTubeLines = function() {
	bb.tl.vars.tubelines = bb.tl.vars.paper.set();
	bb.tl.vars.tubelines.attr({x: 0, y: 0});
	
	for (p in bb.tl.lines) {
		line = bb.tl.lines[p];
		
		for (var i = line.strings.length - 1; i >= 0; i--){
			var c = bb.tl.vars.paper.path(line.strings[i]);
			c.group = p;
			
			if (p == "EastLondon") {
				c.attr({"stroke-width": 3, "stroke-dasharray": "-", stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			else if (p == "Victoria") {
				c.attr({"stroke-width": 10, stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			else {
				c.attr({"stroke-width": 5, stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			
			c.translate(line.tx, line.ty);
	
			line.paths.push(c);
			bb.tl.vars.tubelines.push(c);
		};
	}
	
	bb.tl.vars.map = bb.tl.vars.paper.image("img/map-artifacts.png", 0, 0, 2426, 1615).attr({"cursor": "move", opacity:1});
};

bb.tl.addTubeStations = function() {
	bb.tl.vars.stations = bb.tl.vars.paper.set();
		
		for (p in bb.tl.stations) {
			var station = bb.tl.stations[p];
			var t = bb.tl.vars.paper.text(station.x, station.y, p);
			t.attr({font: 'Myriad', 'font-size': 12.5, fill: '#1C3F94'});
			t.translate(-70, -110);
			
			bb.tl.vars.stations.push(t);
		}
};


bb.tl.setupListeners = function() {
	$(window).resize(function() {
		$('#mask').width($(window).width()).height($(window).height());
	});
};


$(document).ready(function() {
	bb.tl.init();
});