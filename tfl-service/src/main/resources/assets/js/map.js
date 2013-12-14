$(document).ready(function() {
    addLines();
    addStations();
    addConnections();

	var map = $('#map')
        .drawLondonUnderground(lines, stations, connections);

//    map.route(VICTORIA)
//        .attr("stroke", "red");

//    map.segment(VICTORIA, FINSBURY_PARK, HIGHBURY_AND_ISLINGTON)
//        .attr("stroke-width", "21px");
});

(function($) {
    $.fn.drawLondonUnderground = function(lines, stations, connections, options) {
        options = $.extend({}, {
            lineWidth: 5
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
                            .attr("stroke-width", options.lineWidth + "px");
                    });

                    // For each station draw a dot
                    _.each(stations, function(station) {
                        var svgStation = map.circle(station.x, station.y, 5, { fill: station.line.colour });
                        $(svgStation)
                            .addClass("station")
                            .addClass("line-" + station.line.getId())
                            .addClass("station-" + station.getId());
                    });
                }
            });
        });
    };

    $.fn.route = function(name) {
        return this.find(".segment.line-" + getLineId(name));
    };

    $.fn.segment = function(line, stationNameA, stationNameB) {
        var stationA = getStationId(line, stationNameA);
        var stationB = getStationId(line, stationNameB);
        return this.route(line).filter(".station-" + stationA + ".station-" + stationB);
    };
}(jQuery));

///////////////////////

document.onmousemove = function(e)
{
    var x = e.pageX;
    var y = e.pageY;
//    console.clear();
    console.log(x +", " + y);
    // do what you want with x and y
};
