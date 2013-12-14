$(document).ready(function() {
    addLines();
    addStations();
    addConnections();

	$('#map').svg({
        onLoad: drawMap
    });
});

function drawMap(map) {
	// For each set of connections belonging to a line
	_.each(connections, function(lineConnections, lineId) {
		var line = lines[lineId];
		var lineSvgGroup = map.group({ id: line.getId(), stroke: line.colour, "stroke-width": "5px" });

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

//	setRouteColor(VICTORIA, "red");
//	setRouteThickness(VICTORIA, "15");
}

function getRoute(name) {
    return $('#' + name.toAlphanumeric());
}

function setRouteColor(route, colour) {
	getRoute(route).attr("stroke", colour);
}

function setRouteThickness(route, thickness) {
    getRoute(route).attr("stroke-width", thickness);
}


///////////////////////

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    console.log(x +", " + y);
    // do what you want with x and y
};
