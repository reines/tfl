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
		.attr("stroke-width", (percent * 3) + 5)
		.attr("opacity", "1");
	
	highlightStation(map, percent, line, stops[0]);
	highlightStation(map, percent, line, stops[stops.length-1]);
}

function highlightStation(map, percent, line, stationName) {
	map.station(line, stationName)
		.attr("r", (percent * 5) + 5)
		.attr("opacity", "1");

    map.label(stationName)
        .attr("opacity", "1");
}

(function($) {
    $.fn.drawLondonUnderground = function(lines, stations, connections, options) {
        options = $.extend({}, {
            lineWidth: 5,
            lineOpacity: 0.3,

            stationSize: 20,
            stationOpacity: 0,

            textSize: 12.5,
            textColour: "#1c3f94",
            textOpacity: 0
        }, options);

        return this.each(function() {
            $(this).svg(function(map) {
                // TODO: Window resize

                // For each set of connections belonging to a line
                _.each(connections, function(lineConnections, lineId) {
                    var line = lines[lineId];
                    var $svgLineGroup = $(map.group())
                        .attr("id", line.getId());

                    // For each connection in this line
                    _.each(lineConnections, function(connection) {
                        var line = connection.stationA.line;
                        var stationA = connection.stationA;
                        var stationB = connection.stationB;

                        var $svgConnection;
                        if (connection.joinSvg === undefined) {
                            $svgConnection = $(map.line($svgLineGroup, stationA.x, stationA.y, stationB.x, stationB.y));
                        }
                        else {
                            $svgConnection = $(map.path($svgLineGroup, "M " + stationA.getCoords() + " L " + connection.joinSvg + " L " + stationB.getCoords()));
                        }

                        $svgConnection
                            .addClass("segment")
                            .addClass("line-" + stationA.line.getId())
                            .addClass("station-" + stationA.getId())
                            .addClass("station-" + stationB.getId())
                            .attr("fill", "none")
                            .attr("stroke", line.colour)
                            .attr("opacity", options.lineOpacity)
                            .attr("stroke-width", options.lineWidth);
                    });
                });

                // For each station draw a dot
                    _.each(stations, function(station) {
                        var $svgLineGroup = $("#" + station.line.getId());

                        $(map.circle($svgLineGroup, station.x, station.y, options.stationSize))
                            .addClass("station")
                            .addClass("line-" + station.line.getId())
                            .addClass("station-" + station.getId())
                            .attr("fill", station.line.colour)
                            .attr("opacity", options.stationOpacity);
                    });

                var $svgLabelGroup = $(map.group())
                    .attr("id", "labels");

                // For each label write the text
                _.each(stationLabels, function(label) {
                    $(map.text($svgLabelGroup, label.getX(), label.getY(), label.text))
                        .addClass("label")
                        .addClass("label-" + label.getId())
                        .attr("text-anchor", label.getAnchor())
                        .attr("font", "Myriad")
                        .attr("font-size", options.textSize)
                        .attr("fill", options.textColour)
                        .attr("opacity", options.textOpacity);
                });
            });
        });
    };

    $.fn.station = function(line, name) {
        return this.find(".station.station-" + getStationId(line, name));
    };

    $.fn.label = function(name) {
        return this.find(".label.label-" + getJustStationId(name));
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
    	var $element = $(this);
    	var segments = [];

        _.each(stationNames, function(stationAName, index) {
    		if (index + 1 == stationNames.length) return;

            segments.push($element.segment(line, stationAName, stationNames[index + 1]));
    	});

    	return $(segments);
    };
}(jQuery));

///////////////////////

//document.onmousemove = function(e) {
//    console.clear();
//    console.log(e.pageX + ", " + e.pageY);
//};
