var lines = {};
var stations = {};
var connections = {};

var VICTORIA = "Victoria";

var BRIXTON = "Brixton";
var STOCKWELL = "Stockwell";
var VAUXHALL = "Vauxhall";
var PIMLICO = "Pimlico";
var GREEN_PARK = "Green Park";
var OXFORD_CIRCUS = "Oxford Circus";
var WARREN_STREET = "Warren Street";
var EUSTON = "Euston";
var KINGS_CROSS = "Kings Cross St. Pancras";
var HIGHBURY = "Highbury and Islington";
var FINSBURY = "Finsbury Park";
var SEVEN_SISTERS = "Seven Sisters";
var TOTTENHAM_HALE = "Tottenham Hale";
var BLACKHORSE_ROAD = "Blackhorse Road";
var WALTHAMSTOW_CENTRAL = "Walthamstow Central";


function addLines() {
	addLine(VICTORIA, "#009cdb");	
}

function addStations() {
	addStation(VICTORIA, BRIXTON, "1220.47", "1388.78");
	addStation(VICTORIA, STOCKWELL, "1164", "1332");
	addStation(VICTORIA, VAUXHALL,  "1069", "1238");
	addStation(VICTORIA, PIMLICO, "1042.98", "1120.44");
	addStation(VICTORIA, VICTORIA, "1042.98", "989");
	addStation(VICTORIA, GREEN_PARK, "1042.98", "870");
	addStation(VICTORIA, OXFORD_CIRCUS, "1100", "792");
	addStation(VICTORIA, WARREN_STREET, "1218", "678");
	addStation(VICTORIA, EUSTON, "1280", "614");
	addStation(VICTORIA, KINGS_CROSS, "1354", "602");
	addStation(VICTORIA, HIGHBURY, "1571.98", "504");
	addStation(VICTORIA, FINSBURY, "1620", "373");
	addStation(VICTORIA, SEVEN_SISTERS, "1716", "341");
	addStation(VICTORIA, TOTTENHAM_HALE, "1773", "341");
	addStation(VICTORIA, BLACKHORSE_ROAD, "1826", "341");
	addStation(VICTORIA, WALTHAMSTOW_CENTRAL, "1918.48", "341");
}

function addConnections() {
	joinStation(VICTORIA, BRIXTON, STOCKWELL);
	joinStation(VICTORIA, STOCKWELL, VAUXHALL);
	joinStation(VICTORIA, VAUXHALL, PIMLICO, "1049.24 1217.55 C 1045.8 1214.11 1042.98 1207.31 1042.98 1202.44");
	joinStation(VICTORIA, PIMLICO, VICTORIA);
	joinStation(VICTORIA, VICTORIA, GREEN_PARK);
	joinStation(VICTORIA, GREEN_PARK, OXFORD_CIRCUS, "1042.98 861 C 1042.98 856.12,1045.8 849.32 1049.24 845.89");
	joinStation(VICTORIA, OXFORD_CIRCUS, WARREN_STREET);
	joinStation(VICTORIA, WARREN_STREET, EUSTON);
	joinStation(VICTORIA, EUSTON, KINGS_CROSS, "1285.8 609.33 C 1289.24 605.89 1296.04 603.06 1300.91 603.06");
	joinStation(VICTORIA, KINGS_CROSS, HIGHBURY, "1514.36 603.06 C 1519.23  603.06 1526.03 600.25 1529.48 596.81 L 1565.73 560.56 M 1565.73 560.56 C 1569.17 557.12 1571.98 550.32 1571.98 545.45");
	joinStation(VICTORIA, HIGHBURY, FINSBURY, "1571.98 430.4 C 1571.98 425.53 1574.8 418.7 1578.24 415.29");
	joinStation(VICTORIA, FINSBURY, SEVEN_SISTERS, "1645.92 347.63 C 1649.36 344.18 1656.16 341.36 1661.03 341.36");
	joinStation(VICTORIA, SEVEN_SISTERS, TOTTENHAM_HALE);
	joinStation(VICTORIA, TOTTENHAM_HALE, BLACKHORSE_ROAD);
	joinStation(VICTORIA, BLACKHORSE_ROAD, WALTHAMSTOW_CENTRAL);
}

function addLine(name, color) {
	lines[name] = new Line(name, color);
}

function addStation(lineName, stationName, x, y) {
	var id = getStationId(lineName, stationName);
	stations[id] = new Station(id, stationName, lineName, x, y);
}

function joinStation(lineName, stationNameA, stationNameB, joinSvg) {
	if (connections[lineName] === undefined) {
		connections[lineName] = [];
	}
	
	var stationA = stations[getStationId(lineName, stationNameA)];
	var stationB = stations[getStationId(lineName, stationNameB)];
	connections[lineName].push(new Connection(stationA, stationB, joinSvg));
}

function getStationId(lineName, stationName) {
	return toAlphanumericOnly(lineName) + "_" + toAlphanumericOnly(stationName);
}

// Strip out non alphanumeric characters.
function toAlphanumericOnly(string) {
	return string.replace(/\W/g, '');
}

function Line(name, colour) {
	this.name = name;
	this.colour = colour;
}

function Station(id, name, lineName, x, y) {
    this.id = id;
    this.name = name;
    this.lineName = lineName;
    this.x = x;
    this.y = y;
    
    this.getCoords = function() {
        return this.x + " " + this.y;
    };
}

function Connection(stationA, stationB, joinSvg) {
	this.stationA = stationA;
	this.stationB = stationB;
	this.joinSvg = joinSvg;
}