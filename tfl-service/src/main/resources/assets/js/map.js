// Strip out non alphanumeric characters.
String.prototype.toAlphanumeric = function() {
    return this.replace(/\W/g, '');
};

Array.prototype.getFirst = function() {
    return this[0];
};

Array.prototype.getLast = function() {
    return this[this.length - 1];
};

$(document).ready(function() {
    $.ajax('/connections.json', {
        dataType: 'json',
        success: function(connections) {
            var map = $('#map').drawLondonUnderground(connections, {
                lineWidth: 3,
                lineOpacity: 0.2,

                stationSize: 3,
                stationOpacity: 0,

                textOpacity: 0
            });

            $.ajax('/api/journey', {
                headers: {
                    'Authorization': 'Token test'
                },
                dataType: 'json',
                success: function(journeys) {
                    _.each(journeys, function(journey) {
                        var stops = journey.path.stops;

                        // Highlight the start station
                        var start = stops.getFirst();
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
                        var end = stops.getLast();
                        highlightStation(map, end.line.name, end.name);
                    });
                }
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

function getLineAndStationId(line, station) {
    return getId(line) + '-' + getId(station);
}

function getId(item) {
    var name = (typeof item == 'object') ? item.name : item;
    return name.toAlphanumeric().toLowerCase();
}

(function($) {
    $.fn.drawLondonUnderground = function(connections, options) {
        options = $.extend({}, {
            lineWidth: 5,
            lineOpacity: 1,

            stationSize: 5,
            stationOpacity: 1,

            textSize: 12,
            textColour: "#1c3f94",
            textOpacity: 1
        }, options);

        var stations = {};
        var stationLabels = {};

        _.each(connections, function(lineConnections) {
            _.each(lineConnections, function(connection) {
                var stationA = connection.stationA;
                var stationIdA = getLineAndStationId(stationA.line.name, stationA.name);
                stations[stationIdA] = stationA;

                var stationB = connection.stationB;
                var stationIdB = getLineAndStationId(stationB.line.name, stationB.name);
                stations[stationIdB] = stationB;
            });
        });

        _.each(stations, function(station) {
            var gravity = "east";

            var id = getId(station);
            var x = station.x;
            var y = station.y;

            if (id in stationLabels) {
                var label = stationLabels[id];
                switch (gravity) {
                    case "east": { label.x = Math.max(label.x, x); break; }
                    case "north": { label.y = Math.min(label.y, y); break; }
                    case "south": { label.y = Math.max(label.y, y); break; }
                    case "west": { label.x = Math.min(label.x, x); break; }
                }
            }
            else {
                stationLabels[id] = new Label(station.name, gravity, x, y);
            }
        });

        return this.each(function() {
            $(this).svg(function(map) {
                // TODO: Window resize

                // For each set of connections belonging to a line
                _.each(connections, function(lineConnections, lineId) {
                    var $svgLineGroup = $(map.group())
                        .attr("id", lineId);

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
                            $svgConnection = $(map.path($svgLineGroup, "M " + stationA.x + " " + stationA.y + " L " + connection.joinSvg + " L " + stationB.x + " " + stationB.y));
                        }

                        $svgConnection
                            .addClass("segment")
                            .addClass("line-" + getId(line))
                            .addClass("station-" + getId(line) + "-" + getId(stationA))
                            .addClass("station-" + getId(line) + "-" + getId(stationB))
                            .attr("fill", "none")
                            .attr("stroke", line.colour)
                            .attr("opacity", options.lineOpacity)
                            .attr("stroke-width", options.lineWidth);
                    });
                });

                // For each station draw a dot
                _.each(stations, function(station) {
                    var line = station.line;
                    var $svgLineGroup = $("#" + getId(line));

                    $(map.circle($svgLineGroup, station.x, station.y, options.stationSize))
                        .addClass("station")
                        .addClass("line-" + getId(line))
                        .addClass("station-" + getId(line) + "-" + getId(station))
                        .attr("fill", line.colour)
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

    $.fn.station = function(line, station) {
        return this.find(".station.station-" + getLineAndStationId(line, station));
    };

    $.fn.label = function(station) {
        return this.find(".label.label-" + getId(station));
    };

    $.fn.route = function(line) {
        return this.find(".segment.line-" + getId(line));
    };

    $.fn.segment = function(line, stationNameA, stationNameB) {
        var stationA = getLineAndStationId(line, stationNameA);
        var stationB = getLineAndStationId(line, stationNameB);
        return this.route(line).filter(".station-" + stationA + ".station-" + stationB);
    };
}(jQuery));

function Label(text, gravity, x, y) {
    this.text = text;
    this.gravity = gravity;
    this.x = x;
    this.y = y;

    this.getAnchor = function() {
        switch (this.gravity) {
            case "north": return "middle";
            case "south": return "middle";
            case "west": return "end";
        }
        return "start";
    };

    this.getX = function() {
        switch(this.gravity) {
            case "east": return this.x + 10;
            case "west": return this.x - 10;
        }
        return this.x;
    };

    this.getY = function() {
        switch (this.gravity) {
            case "east": return this.y - 6;
            case "north": return this.y - 12;
            case "south": return this.y + 20;
            case "west": return this.y + 14;
        }
        return this.y;
    };

    this.getId = function() {
        return getId(this.text);
    };
}
