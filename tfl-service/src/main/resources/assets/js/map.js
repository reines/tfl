$(document).ready(function() {
    addLines();
    addStations();
    addConnections();

	var map = $('#map')
        .drawLondonUnderground(lines, stations, connections);

	highlightRoute(map, 0.05, LINE_CENTRAL, [HOLBORN, TOTTENHAM_COURT_ROAD, OXFORD_CIRCUS]);
	highlightRoute(map, 0.05, LINE_PICADILLY, [KINGS_CROSS, RUSSELL_SQUARE, HOLBORN]);
	highlightRoute(map, 0.1, LINE_PICADILLY, [ARSENAL, HOLLOWAY_ROAD, CALEDONIAN_ROAD, KINGS_CROSS]);
	highlightRoute(map, 0.8, LINE_VICTORIA, [FINSBURY_PARK, HIGHBURY_AND_ISLINGTON, KINGS_CROSS, EUSTON_2, WARREN_STREET, OXFORD_CIRCUS, GREEN_PARK, VICTORIA]);
});

function highlightRoute(map, percent, line, stops) {
	map.segments(line, stops)
		.attr("stroke-width", (percent*3)+5 + "px")
		.attr("opacity", "1");
	
	highlightStation(map, percent, line, stops[0]);
	highlightStation(map, percent, line, stops[stops.length-1]);
}

function highlightStation(map, percent, line, stationName) {
	// Add Text
	//console.log(stationNames);
//	var stationLabel = stationNames[getJustStationId(stationName)];
//	console.log(stationLabel);
//	map.svg({
//        onLoad: function(s) {
//        	console.log(s);
//        	s.text(stationLabel.x, stationLabel.y, stationLabel.label, { fill: red});
//        }
//        });

	// Add Circle
	map.station(line, stationName)
		.attr("r", (percent*5)+5 + "px")
		.attr("opacity", "1");
}

(function($) {
    $.fn.drawLondonUnderground = function(lines, stations, connections, options) {
        options = $.extend({}, {
            lineWidth: 5,
            lineOpacity: 0.1,
            stationOpacity: 0,
            stationSize: 5,
            textSize: 12.5,
            textColour: "#1c3f94"
        }, options);

        return this.each(function() {
            var $element = $(this);

            $element.svg({
                onLoad: function(map) {
                    // For each set of connections belonging to a line
                    _.each(connections, function(lineConnections, lineId) {
                        var line = lines[lineId];
                        var svgLineGroup = map.group({ id: line.getId() });

                        // For each connection in this line
                        _.each(lineConnections, function(connection) {
                            var line = connection.stationA.line;
                            var stationA = connection.stationA;
                            var stationB = connection.stationB;

                            var svgConnection;
                            if (connection.joinSvg === undefined) {
                                svgConnection = map.line(svgLineGroup, stationA.x, stationA.y, stationB.x, stationB.y);
                            }
                            else {
                                svgConnection = map.path(svgLineGroup, "M " + stationA.getCoords() + " L " + connection.joinSvg + " L " + stationB.getCoords());
                            }

                            $(svgConnection)
                                .addClass("segment")
                                .addClass("line-" + stationA.line.getId())
                                .addClass("station-" + stationA.getId())
                                .addClass("station-" + stationB.getId())
                                .attr("stroke", line.colour)
                                .attr("opacity", options.lineOpacity)
                                .attr("stroke-width", options.lineWidth);
                        });
                    });

                    // For each station draw a dot
                    _.each(stations, function(station) {
                        var svgLineGroup = $("#" + station.line.getId())[0];

                        var svgStation = map.circle(svgLineGroup, station.x, station.y, options.stationSize);
                        $(svgStation)
                            .addClass("station")
                            .addClass("line-" + station.line.getId())
                            .addClass("station-" + station.getId())
                            .attr("fill", station.line.colour)
                            .attr("opacity", options.stationOpacity);

                        var svgLabel = map.text(svgLineGroup, station.x + 10, station.y - 5, station.getName());
                        $(svgLabel)
                            .addClass("label")
                            .attr("font", "Myriad")
                            .attr("font-size", options.textSize)
                            .attr("fill", options.textColour);
                    });
                }
            });
        });
    };

    $.fn.station = function(line, name) {
        return this.find(".station.station-" + getStationId(line, name));
    };

    $.fn.route = function(name) {
        return this.find(".segment.line-" + getLineId(name));
    };

    $.fn.segment = function(line, stationNameA, stationNameB) {
        var stationA = getStationId(line, stationNameA);
        var stationB = getStationId(line, stationNameB);
        return this.route(line).filter(".station-" + stationA + ".station-" + stationB);
    };

    $.fn.segments = function(line, stationNames) {
    	var domElement = this;
    	var segments = [];

        _.each(stationNames, function(stationAName, index) {
    		if (index + 1 == stationNames.length) return;

            segments.push(domElement.segment(line, stationAName, stationNames[index+1]));
    	});

    	return $(segments);
    };
}(jQuery));

///////////////////////

//document.onmousemove = function(e) {
//    console.clear();
//    console.log(e.pageX + ", " + e.pageY);
//};
