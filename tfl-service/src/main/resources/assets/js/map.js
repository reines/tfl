$(document).ready(function() {
    addLines();
    addStations();
    addConnections();

	var map = $('#map')
        .drawLondonUnderground(lines, stations, connections, {
            lineWidth: 3,
            lineOpacity: 0.2,

            stationSize: 3,
            stationOpacity: 0,

            textOpacity: 0
        });

    $.ajax('http://localhost:8080/api/journey', {
        headers: {
            'Authorization': 'Token test'
        },
        success: function(journeys) {
            _.each(journeys, function(journey) {
                var stops = journey.path.stops;

                // Highlight the start station
                var start = journey.path.stops[0];
                highlightStation(map, start.line.name, start.name);

                for (var i = 0;i < stops.length - 1; i++) {
                    var stationA = stops[i];
                    var stationB = stops[i+1];
                    var line = stationB.line;

                    // Highlight any changes
                    if (stationA.line.name != stationB.line.name) {
                        highlightStation(map, stationA.line.name, stationA.name);
                    }

                    // Highlight each line segment
                    highlightSegment(map, line.name, stationA.name, stationB.name);
                }

                // Highlight the end station
                var end = journey.path.stops[journey.path.stops.length - 1];
                highlightStation(map, end.line.name, end.name);
            });
        }
    });
});

function highlightSegment(map, line, stationNameA, stationNameB) {
    var segment = map.segment(line, stationNameA, stationNameB)
        .attr("opacity", 1);

    var strokeWidth = (parseFloat(segment.attr("stroke-width")) || 0) + 0.5;
    segment.attr("stroke-width", strokeWidth);
}

function highlightStation(map, line, stationName) {
	var station = map.station(line, stationName)
        .attr("opacity", 1);

    var r = (parseFloat(station.attr("r")) || 0) + 0.5;
    station.attr("r", r);

    map.label(stationName)
        .attr("opacity", 1);
}

(function($) {
    $.fn.drawLondonUnderground = function(lines, stations, connections, options) {
        options = $.extend({}, {
            lineWidth: 5,
            lineOpacity: 1,

            stationSize: 5,
            stationOpacity: 1,

            textSize: 12,
            textColour: "#1c3f94",
            textOpacity: 1
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
                            .addClass("line-" + line.getId())
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
        return this.find(".station.station-" + getLineAndStationId(line, name));
    };

    $.fn.label = function(name) {
        return this.find(".label.label-" + getStationId(name));
    };

    $.fn.route = function(name) {
        return this.find(".segment.line-" + getLineId(name));
    };

    $.fn.segment = function(line, stationNameA, stationNameB) {
        var stationA = getLineAndStationId(line, stationNameA);
        var stationB = getLineAndStationId(line, stationNameB);
        return this.route(line).filter(".station-" + stationA + ".station-" + stationB);
    };
}(jQuery));
