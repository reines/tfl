var lines = {};
var stations = {};
var connections = {};

var LINE_BAKERLOO = "Bakerloo";
var LINE_CENTRAL = "Central";
var LINE_CICLE = "Circle";
var LINE_DISTRICT = "District";
var LINE_HAMMERSMITH = "Hammersmith & City";
var LINE_JUBILEE = "Jubilee";
var LINE_METROPOLITAN = "Metropolitan";
var LINE_NOTHERN = "Nothern";
var LINE_PICADILLY = "Piccadilly";
var LINE_VICTORIA = "Victoria";
var LINE_WATERLOO = "Waterloo & City";
var LINE_DLR = "DLR";
var LINE_OVERGROUND = "London Overground";

function addLines() {
	addLine(LINE_BAKERLOO, "#b36305");
	addLine(LINE_CENTRAL, "#e32017");
	addLine(LINE_CICLE, "#ffd300");
	addLine(LINE_DISTRICT, "#00782a");
	addLine(LINE_HAMMERSMITH, "#f3a9bb");
	addLine(LINE_JUBILEE, "#a0a5a9");
	addLine(LINE_METROPOLITAN, "#9b0056");
	addLine(LINE_NOTHERN, "#000000");
	addLine(LINE_PICADILLY, "#003688");
	addLine(LINE_VICTORIA, "#0098d4");
	addLine(LINE_WATERLOO, "#95cdba");
	addLine(LINE_DLR, "#00a4a7");
	addLine(LINE_OVERGROUND, "#ee7c0e");
}

function addStations() {
    // Jubilee
    addStation(LINE_JUBILEE, STANMORE, "760.34", "196.08");
    addStation(LINE_JUBILEE, CANNONS_PARK, "760.34", "229");
    addStation(LINE_JUBILEE, QUEENSBURY, "760.34", "263");
    addStation(LINE_JUBILEE, KINGSBURY, "760.34", "294");
    addStation(LINE_JUBILEE, WEMBLEY_PARK, "772", "343");
    addStation(LINE_JUBILEE, NEASDEN, "797", "364");
    addStation(LINE_JUBILEE, DOLLIS_HILL, "825", "392");
    addStation(LINE_JUBILEE, WILLESDEN_GREEN, "855", "422");
    addStation(LINE_JUBILEE, KILBURN, "887", "455");
    addStation(LINE_JUBILEE, WEST_HAMPSTEAD, "912", "482");
    addStation(LINE_JUBILEE, FINCHLEY_ROAD, "942", "512");
    addStation(LINE_JUBILEE, SWISS_COTTAGE, "964", "532");
    addStation(LINE_JUBILEE, ST_JOHNS_WOOD, "988", "556");
    addStation(LINE_JUBILEE, BAKER_STREET, "1027", "675");
    addStation(LINE_JUBILEE, BOND_STREET, "1027", "791");
    addStation(LINE_JUBILEE, GREEN_PARK, "1047", "870");
    addStation(LINE_JUBILEE, WESTMINSTER, "1162", "990");
    addStation(LINE_JUBILEE, WATERLOO, "1201.27", "1058");
    addStation(LINE_JUBILEE, SOUTHWARK, "1297", "1091.34");
    addStation(LINE_JUBILEE, LONDON_BRIDGE, "1482", "1001.37");
    addStation(LINE_JUBILEE, BERMONDSEY, "1616", "1001.37");
    addStation(LINE_JUBILEE, CANADA_WATER, "1735", "1001.37");
    addStation(LINE_JUBILEE, CANARY_WHARF, "1890", "1001.37");
    addStation(LINE_JUBILEE, NORTH_GREENWICH, "1972", "990");
    addStation(LINE_JUBILEE, CANNING_TOWN, "2032.79", "882");
    addStation(LINE_JUBILEE, WEST_HAM, "2032.79", "721");
    addStation(LINE_JUBILEE, STRATFORD, "1981.42", "578.28");

    // Victoria
	addStation(LINE_VICTORIA, BRIXTON, "1220.47", "1388.78");
	addStation(LINE_VICTORIA, STOCKWELL, "1164", "1332");
	addStation(LINE_VICTORIA, VAUXHALL,  "1069", "1238");
	addStation(LINE_VICTORIA, PIMLICO, "1042.98", "1120.44");
	addStation(LINE_VICTORIA, VICTORIA, "1042.98", "989");
	addStation(LINE_VICTORIA, GREEN_PARK, "1042.98", "870");
	addStation(LINE_VICTORIA, OXFORD_CIRCUS, "1100", "792");
	addStation(LINE_VICTORIA, WARREN_STREET, "1218", "678");
	addStation(LINE_VICTORIA, EUSTON, "1280", "614");
	addStation(LINE_VICTORIA, KINGS_CROSS, "1354", "602");
	addStation(LINE_VICTORIA, HIGHBURY_AND_ISLINGTON, "1571.98", "504");
	addStation(LINE_VICTORIA, FINSBURY_PARK, "1620", "373");
	addStation(LINE_VICTORIA, SEVEN_SISTERS, "1716", "341");
	addStation(LINE_VICTORIA, TOTTENHAM_HALE, "1773", "341");
	addStation(LINE_VICTORIA, BLACKHORSE_ROAD, "1826", "341");
	addStation(LINE_VICTORIA, WALTHAMSTOW_CENTRAL, "1918.48", "341");
}

function addConnections() {
    // Jubilee
    joinStation(LINE_JUBILEE, CANNONS_PARK, STANMORE);
    joinStation(LINE_JUBILEE, QUEENSBURY, CANNONS_PARK);
    joinStation(LINE_JUBILEE, KINGSBURY, QUEENSBURY);
    joinStation(LINE_JUBILEE, WEMBLEY_PARK, KINGSBURY, "766.6 334.04 C 763.15 330.6 760.34 323.8 760.34 318.93");
    joinStation(LINE_JUBILEE, NEASDEN, WEMBLEY_PARK);
    joinStation(LINE_JUBILEE, DOLLIS_HILL, NEASDEN);
    joinStation(LINE_JUBILEE, WILLESDEN_GREEN, DOLLIS_HILL);
    joinStation(LINE_JUBILEE, KILBURN, WILLESDEN_GREEN);
    joinStation(LINE_JUBILEE, WEST_HAMPSTEAD, KILBURN);
    joinStation(LINE_JUBILEE, FINCHLEY_ROAD, WEST_HAMPSTEAD);
    joinStation(LINE_JUBILEE, SWISS_COTTAGE, FINCHLEY_ROAD);
    joinStation(LINE_JUBILEE, ST_JOHNS_WOOD, SWISS_COTTAGE);
    joinStation(LINE_JUBILEE, BAKER_STREET, ST_JOHNS_WOOD, "1027.1 603.39 C 1027.1 598.52 1024.28 591.72 1020.84 588.28");
    joinStation(LINE_JUBILEE, BOND_STREET, BAKER_STREET);
    joinStation(LINE_JUBILEE, GREEN_PARK, BOND_STREET, "1033.36 857.58 C 1029.92 854.14 1027.1 847.33 1027.1 842.47");
    joinStation(LINE_JUBILEE, WESTMINSTER, GREEN_PARK);
    joinStation(LINE_JUBILEE, WATERLOO, WESTMINSTER, "1201.24 1033.49 C 1201.24 1028.62 1198.43 1021.82 1194.99 1018.38");
    joinStation(LINE_JUBILEE, SOUTHWARK, WATERLOO, "1222.45 1091.34 C 1210.75 1091.34 1201.27 1081.86 1201.27 1070.16");
    joinStation(LINE_JUBILEE, LONDON_BRIDGE, SOUTHWARK, "1478.45 1001.37 C 1473.59 1001.37 1466.78 1004.18 1463.33 1007.62 L 1385.89 1085.08 C 1382.44 1088.53 1375.64 1091.34 1370.77 1091.34");
    joinStation(LINE_JUBILEE, BERMONDSEY, LONDON_BRIDGE);
    joinStation(LINE_JUBILEE, CANADA_WATER, BERMONDSEY);
    joinStation(LINE_JUBILEE, CANARY_WHARF, CANADA_WATER);
    joinStation(LINE_JUBILEE, NORTH_GREENWICH, CANARY_WHARF, "1967.14 995.11 C 1963.69 998.55 1956.9 1001.37 1952.03 1001.37");
    joinStation(LINE_JUBILEE, CANNING_TOWN, NORTH_GREENWICH, "2032.79 920.6 C 2032.79 925.47 2029.97 932.27 2026.52 935.72");
    joinStation(LINE_JUBILEE, WEST_HAM, CANNING_TOWN);
    joinStation(LINE_JUBILEE, STRATFORD, WEST_HAM, "2026.52 623.39 C 2029.97 626.84 2032.79 633.64 2032.79 638.51");

    // Victoria
	joinStation(LINE_VICTORIA, BRIXTON, STOCKWELL);
	joinStation(LINE_VICTORIA, STOCKWELL, VAUXHALL);
	joinStation(LINE_VICTORIA, VAUXHALL, PIMLICO, "1049.24 1217.55 C 1045.8 1214.11 1042.98 1207.31 1042.98 1202.44");
	joinStation(LINE_VICTORIA, PIMLICO, VICTORIA);
	joinStation(LINE_VICTORIA, VICTORIA, GREEN_PARK);
	joinStation(LINE_VICTORIA, GREEN_PARK, OXFORD_CIRCUS, "1042.98 861 C 1042.98 856.12,1045.8 849.32 1049.24 845.89");
	joinStation(LINE_VICTORIA, OXFORD_CIRCUS, WARREN_STREET);
	joinStation(LINE_VICTORIA, WARREN_STREET, EUSTON);
	joinStation(LINE_VICTORIA, EUSTON, KINGS_CROSS, "1285.8 609.33 C 1289.24 605.89 1296.04 603.06 1300.91 603.06");
	joinStation(LINE_VICTORIA, KINGS_CROSS, HIGHBURY_AND_ISLINGTON, "1514.36 603.06 C 1519.23  603.06 1526.03 600.25 1529.48 596.81 L 1565.73 560.56 M 1565.73 560.56 C 1569.17 557.12 1571.98 550.32 1571.98 545.45");
	joinStation(LINE_VICTORIA, HIGHBURY_AND_ISLINGTON, FINSBURY_PARK, "1571.98 430.4 C 1571.98 425.53 1574.8 418.7 1578.24 415.29");
	joinStation(LINE_VICTORIA, FINSBURY_PARK, SEVEN_SISTERS, "1645.92 347.63 C 1649.36 344.18 1656.16 341.36 1661.03 341.36");
	joinStation(LINE_VICTORIA, SEVEN_SISTERS, TOTTENHAM_HALE);
	joinStation(LINE_VICTORIA, TOTTENHAM_HALE, BLACKHORSE_ROAD);
	joinStation(LINE_VICTORIA, BLACKHORSE_ROAD, WALTHAMSTOW_CENTRAL);
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
	return toAlphanumericOnly(lineName) + '_' + toAlphanumericOnly(stationName);
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