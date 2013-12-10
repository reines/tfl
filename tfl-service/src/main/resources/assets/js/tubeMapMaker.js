var stations = {};
var lines = {};

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

joinStation(VICTORIA, BRIXTON, STOCKWELL, "L");
joinStation(VICTORIA, STOCKWELL, VAUXHALL, "L");
joinStation(VICTORIA, VAUXHALL, PIMLICO, "L1049.24,1217.55C1045.8,1214.110,1042.98,1207.31,1042.98,1202.441L");
joinStation(VICTORIA, PIMLICO, VICTORIA, "L");
joinStation(VICTORIA, VICTORIA, GREEN_PARK, "L");
joinStation(VICTORIA, GREEN_PARK, OXFORD_CIRCUS, "L1042.98,860.995C1042.98,856.124,1045.8,849.321,1049.24,845.886L");
joinStation(VICTORIA, OXFORD_CIRCUS, WARREN_STREET, "L");
joinStation(VICTORIA, WARREN_STREET, EUSTON, "L");
joinStation(VICTORIA, EUSTON, KINGS_CROSS, "C");
joinStation(VICTORIA, KINGS_CROSS, HIGHBURY, "L1514.36,603.063C1519.2298,603.063,1526.03,600.247,1529.4798,596.805M1529.4798,596.805L1565.7298,560.559M1565.7298,560.559C1569.1689,557.12,1571.9798,550.3209,1571.9798,545.4459L");
joinStation(VICTORIA, HIGHBURY, FINSBURY, "L1571.9798,430.3989C1571.9798,425.52986,1574.7989999999998,418.7309,1578.2398,415.289L");
joinStation(VICTORIA, FINSBURY, SEVEN_SISTERS, "L1645.9198,347.6259C1649.36,344.1789,1656.1599,341.3599,1661.0297,341.3599L");
joinStation(VICTORIA, SEVEN_SISTERS, TOTTENHAM_HALE, "L");
joinStation(VICTORIA, TOTTENHAM_HALE, BLACKHORSE_ROAD, "L");
joinStation(VICTORIA, BLACKHORSE_ROAD, WALTHAMSTOW_CENTRAL, "L");


function addStation(lineName, stationName, x, y) {
	var id = getStationId(lineName, stationName);
	stations[id] = new Station(id, stationName, lineName, x, y);
}

function joinStation(lineName, stationNameA, stationNameB, joinSvg) {
	if (lines[lineName] === undefined) {
		lines[lineName] = [];
	}
	
	var stationA = stations[getStationId(lineName, stationNameA)];
	var stationB = stations[getStationId(lineName, stationNameB)];
	lines[lineName].push(new Line(stationA, stationB, joinSvg));
}

function getStationId(lineName, stationName) {
	return lineName.replace(/\W/g, '') + "_" + stationName.replace(/\W/g, '');
}

function Station(id, name, lineName, x, y) {
    this.id = id;
    this.name = name;
    this.lineName = lineName;
    this.x = x;
    this.y = y;
    
    this.getCoords = function() {
        return this.x + "," + this.y;
    };
}

function Line(stationA, stationB, joinSvg) {
	this.stationA = stationA;
	this.stationB = stationB;
	this.joinSvg = joinSvg;
}


//Add each line to the SVG
bb.tl.lines[VICTORIA] = { strings: [], color: "#009CDB", paths: [], stations: [], classes: []};

_.each(lines, function(value, key) {
	console.log(value);
	for (i in value) {
		var line = value[i];
		console.log(line);
		
		bb.tl.lines[key].strings.push("M" + line.stationA.getCoords() + line.joinSvg + line.stationB.getCoords());
		bb.tl.lines[key].classes.push(line.stationA.id + " " + line.stationB.id);
	}
});