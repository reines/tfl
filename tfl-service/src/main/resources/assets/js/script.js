var map;

$(document).ready(function() {
	$('#map').svg({onLoad: drawMap});
	bb.tl.init();
});

function drawMap(svg) { 
	map = svg;

	addLines();
	addStations();
	addConnections();

	// For each set of connections belonging to a line
	_.each(connections, function(lineConnections, lineId) {
		var line = lines[lineId];
		var lineSvgGroup = map.group({id: line.getId(), stroke: line.colour, fill: "none", "stroke-width": 5, "stroke-linecap": "round"});

		// For each connection in this line
        _.each(lineConnections, function(connection) {
			var stationA = connection.stationA;
			var stationB = connection.stationB;
			
			if (connection.joinSvg  === undefined) {
				var svgConnection = map.line(lineSvgGroup, stationA.x, stationA.y, stationB.x, stationB.y);
			}
            else {
				var svgConnection = map.path(lineSvgGroup, "M " + stationA.getCoords() + " L " + connection.joinSvg + " L " + stationB.getCoords());
			}

			var classes = stationA.line.getId() + " " + stationA.getId() + " " + stationB.getId();
			$(svgConnection).attr("class", classes);
		});
	});

	//setRouteColor(VICTORIA, "#FFFFFF");
	//setRouteThickness(VICTORIA, "15");
}

function setRouteColor(route, colour) {
	$("#" + route).attr("stroke", colour);
}

function setRouteThickness(route, thickness) {
	$("#" + route).attr("stroke-width", thickness);
}


///////////////////////

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    console.log(x +", " + y);
    // do what you want with x and y
};

var bb = bb || {};
bb.tl = bb.tl || {};
bb.tl.vars = bb.tl.vars || {};

bb.tl.init = function() {
 	bb.tl.vars.paper = Raphael('mapold', 2426, 1615);
	bb.tl.vars.properties = bb.tl.vars.paper.set();
	
	bb.tl.addTubeLines();
	bb.tl.addTubeStations();
	bb.tl.setupListeners();
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
				$(c.node).attr("class", line.classes[i]);
				c.attr({"stroke-width": 5, stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			else {
				c.attr({"stroke-width": 5, stroke: line.color, opacity: 1, 'stroke-linecap':'round'});
			}
			
			c.translate(line.tx, line.ty);
	
			line.paths.push(c);
			bb.tl.vars.tubelines.push(c);
		};
	}
//	<path fill="none" stroke="#009cdb" d="M1773,341L1826,341" class="" stroke-width="1" opacity="1" stroke-linecap="round" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0); stroke-width: 1px; opacity: 1; stroke-linecap: round;"></path>
	$(".Victoria_TottenhamHale.Victoria_BlackhorseRoad").attr("stroke-dasharray", "-");
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


