$(document).ready(function() {
    addLines();
    addStations();
    addConnections();

	var map = $('#map')
        .drawLondonUnderground(lines, stations, connections);

	//highlightRoute(map, 0.05, LINE_CENTRAL, [HOLBORN, TOTTENHAM_COURT_ROAD, OXFORD_CIRCUS]);
	//highlightRoute(map, 0.05, LINE_PICADILLY, [KINGS_CROSS, RUSSELL_SQUARE, HOLBORN]);
	//highlightRoute(map, 0.1, LINE_PICADILLY, [ARSENAL, HOLLOWAY_ROAD, CALEDONIAN_ROAD, KINGS_CROSS]);
	highlightRoute(map, 0.8, LINE_VICTORIA, [FINSBURY_PARK, HIGHBURY_AND_ISLINGTON, KINGS_CROSS, EUSTON, WARREN_STREET, OXFORD_CIRCUS, GREEN_PARK, VICTORIA]);
	
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
	var stationLabel = stationNames[getJustStationId(stationName)];
	console.log(stationLabel);
	map.svg({
        onLoad: function(s) {
        	console.log(s);
        	s.text(stationLabel.x, stationLabel.y, stationLabel.label, { fill: red}); 
        }
        });

	// Add Circle
	map.station(line, stationName)
		.attr("r", (percent*5)+5 + "px")
		.attr("opacity", "1");
}

(function($) {
    $.fn.drawLondonUnderground = function(lines, stations, connections, options) {
        options = $.extend({}, {
            lineWidth: 5,
            opacity: 1
        }, options);

        return this.each(function() {
            var $element = $(this);

            $element.svg({
                onLoad: function(map) {
                    // For each set of connections belonging to a line
                    _.each(connections, function(lineConnections, lineId) {
                        var line = lines[lineId];
                        var lineSvgGroup = map.group({ id: line.getId() });

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

                            $(svgConnection)
                                .addClass("segment")
                                .addClass("line-" + stationA.line.getId())
                                .addClass("station-" + stationA.getId())
                                .addClass("station-" + stationB.getId());
                        });
                    });

                    _.each(lines, function(line) {
                        $element.route(line.name)
                            .attr("stroke", line.colour)
                            .attr("opacity", options.opacity)
                            .attr("stroke-width", options.lineWidth + "px");
                    });

                    // For each station draw a dot
                    _.each(stations, function(station) {
                        var svgStation = map.circle(station.x, station.y, 5, { fill: station.line.colour, opacity: 0});
                        $(svgStation)
                            .addClass("station")
                            .addClass("line-" + station.line.getId())
                            .addClass("station-" + station.getId());
                    });
                }
            });
        });
    };

    $.fn.station = function(line, name) {
    	return this.find(".station.line-" + getLineId(line) + ".station-" + getStationId(line, name));
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
    		
    		var stationA = getStationId(line, stationAName);
    		var stationB = getStationId(line, stationNames[index+1]);
    		segments.push(domElement.route(line).filter(".station-" + stationA + ".station-" + stationB));
    	});
    	return $(segments);
    };
}(jQuery));

///////////////////////

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
    //console.clear();
    //console.log(x +", " + y);
    // do what you want with x and y
};
