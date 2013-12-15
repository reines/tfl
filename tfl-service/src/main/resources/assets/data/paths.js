var bb = bb || {};
bb.tl = bb.tl || {};
bb.tl.lines = bb.tl.lines || {};

// TUBE PATH DATA
bb.tl.lines['Picadilly'] = { strings: [], color: '#1C3E93', paths: [], stations: [] };

bb.tl.lines['Picadilly'].strings.push('M 397.68 977.31 C 390.18 977.29 382.81 974.48 377.08 968.77');
bb.tl.lines['Picadilly'].strings.push('M 377.08 968.77 L 370.11 961.81');
bb.tl.lines['Picadilly'].strings.push('M 370.11 961.81 C 367.39 959.08 365.73 955.39 365.73 951.23');

bb.tl.lines['Metropolitan'] = { strings: [], color: '#96005E', paths: [], stations: [] };

// Metropolitan - Moor Park to Watford
//moor to croxley curve
bb.tl.lines['Metropolitan'].strings.push('M 325.95 134.83 C 322.5 131.38 319.69 124.58 319.69 119.72');
bb.tl.lines['Metropolitan'].strings.push('M 319.69 119.72 L 319.69 64.47');

// Metropolitan - Chalfont & Latimer to Chesham
//Chalfont & Latimer to Chesham curve
bb.tl.lines['Metropolitan'].strings.push('M 124.99 65.81 C 120.12 65.81 113.32 62.99 109.88 59.55');
bb.tl.lines['Metropolitan'].strings.push('M 109.88 59.55 L 78 27.67');

// Metropolitan - Uxbridge to Harrow-on-the-Hill
bb.tl.lines['Metropolitan'].strings.push('M 25.3 221.2 L 272.25 221.2');
//Ruislip to Ruislip manor curve
bb.tl.lines['Metropolitan'].strings.push('M 272.25 221.2 C 278.22 220.66 285.54 224.12 290.76 228.34');
bb.tl.lines['Metropolitan'].strings.push('M 290.76 228.34 L 369.52 307.1');
//raynors layne to west harrow
bb.tl.lines['Metropolitan'].strings.push('M 369.52 307.1 C 372.96 310.55 379.76 313.36 384.63 313.36');
bb.tl.lines['Metropolitan'].strings.push('M 384.63 313.36 L 539.01 313.36');

// Metropolitan - Amersham to Harrow-on-the-Hill
bb.tl.lines['Metropolitan'].strings.push('M 21.9 65.81 L 248.06 65.81');
// Chalfont &Latimer to Chorleywood
bb.tl.lines['Metropolitan'].strings.push('M 248.06 65.81 C 252.93 65.81 259.73 68.62 263.18 72.07');
bb.tl.lines['Metropolitan'].strings.push('M 263.18 72.07 L 498.11 307.09');
// North Harrow to  Harrow-on-the-Hill
bb.tl.lines['Metropolitan'].strings.push('M 498.11 307.09 C 501.55 310.54 508.35 313.35 513.22 313.35');

// Metropolitan - Harrow-on-the-Hill to ?
bb.tl.lines['Metropolitan'].strings.push('M 513.22 313.35 L 708.42 313.36');
// preston road to wembley park
bb.tl.lines['Metropolitan'].strings.push('M 708.42 313.36 C 713.29 313.36 720.09 316.18 723.54 319.62');
bb.tl.lines['Metropolitan'].strings.push('M 723.54 319.62 L 1053.92 650.01');
//baker street to GreatPortland 
// BAKER = 1050 647
bb.tl.lines['Metropolitan'].strings.push('M 1050 647 C 1053.37 650.45 1060.16 652.28 1065.03 652.5');
bb.tl.lines['Metropolitan'].strings.push('M 1065.03 652.5 L 1370 652.5');
//kings to faringdon
bb.tl.lines['Metropolitan'].strings.push('M 1370 652.5 C 1375.43 652.5 1377.19 653.86 1380.01 656.69');
bb.tl.lines['Metropolitan'].strings.push('M 1380.01 656.69 L 1460.27 736.5');
//baribican to moorgate
bb.tl.lines['Metropolitan'].strings.push('M 1460.27 736.5 C 1465.62 741.78 1472.71 743.5 1480.26 743.5');
bb.tl.lines['Metropolitan'].strings.push('M 1480.26 743.5 L 1630.01 743.5');
// liverpool to aldgate
bb.tl.lines['Metropolitan'].strings.push('M 1630.01 743.5 C 1634 743.5 1637.77 745 1640.59 748 M 1640.59 748 C 1643.41 751 1644.97 755 1644.97 759');
bb.tl.lines['Metropolitan'].strings.push('M 1644.97 762.18 L 1644.97 835.48');


bb.tl.lines['Bakerloo'] = { strings: [], color: '#AF6010', paths: [], stations: [] };
bb.tl.lines['Bakerloo'].strings.push('M 663.12 567.01 C 659.3 563.18 656.86 557.45 656.86 551.89');
bb.tl.lines['Bakerloo'].strings.push('M 656.86 551.89');
bb.tl.lines['Bakerloo'].strings.push('M 1268.69 1235.05 L 1244.88 1211.23');
bb.tl.lines['Bakerloo'].strings.push('M 1244.88 1211.23 C 1241.44 1207.78 1238.62 1200.98 1238.62 1196.11');
bb.tl.lines['Bakerloo'].strings.push('M 1238.62 1196.11 L 1238.62 962.8');
bb.tl.lines['Bakerloo'].strings.push('M 1238.62 962.8 C 1238.62 957.94 1235.8 951.13 1232.35 947.69');
bb.tl.lines['Bakerloo'].strings.push('M 1232.35 947.69 L 1107.59 822.92');
bb.tl.lines['Bakerloo'].strings.push('M 1107.59 822.92 C 1104.15 819.48 1101.33 812.68 1101.33 807.81');
bb.tl.lines['Bakerloo'].strings.push('M 1101.33 807.81 L 1101.33 759.25');
bb.tl.lines['Bakerloo'].strings.push('M 1101.33 759.25 C 1101.33 754.38 1098.52 747.58 1095.07 744.14');
bb.tl.lines['Bakerloo'].strings.push('M 1095.07 744.14 L 979.87 628.94');
bb.tl.lines['Bakerloo'].strings.push('M 979.87 628.94 C 976.43 625.5 969.63 622.68 964.76 622.68');
bb.tl.lines['Bakerloo'].strings.push('M 964.76 622.68 L 727.64 622.67');
bb.tl.lines['Bakerloo'].strings.push('M 727.64 622.67 C 722.77 622.67 715.96 619.85 712.53 616.41');
bb.tl.lines['Bakerloo'].strings.push('M 712.53 616.41 L 663.12 567.01');
bb.tl.lines['Bakerloo'].strings.push('M 663.12 567.01 C 659.3 563.18 656.86 557.45 656.86 551.89');
bb.tl.lines['Bakerloo'].strings.push('M 656.86 551.89 L 656.86 545.38');
bb.tl.lines['Bakerloo'].strings.push('M 656.86 545.38 C 656.86 540.51 656.86 532.54 656.86 527.67');
bb.tl.lines['Bakerloo'].strings.push('M 656.86 527.67 L 656.86 221.34');

bb.tl.lines['Northern'] = { strings: [], color: '#231F20', paths: [], stations: [] };
bb.tl.lines['Northern'].strings.push('M 1340.95 188.45 C 1340.95 183.58 1338.14 176.78 1334.69 173.34');
bb.tl.lines['Northern'].strings.push('M 1334.69 173.34 C 1332.33 170.98 1332.45 171.09 1295.9 134.54');
bb.tl.lines['Northern'].strings.push('M 1278.48 598.66 L 1278.48 535.2');
bb.tl.lines['Northern'].strings.push('M 1278.48 535.2 C 1278.48 530.33 1275.67 523.53 1272.22 520.09');
bb.tl.lines['Northern'].strings.push('M 1272.22 520.09 L 1271.46 519.32');
bb.tl.lines['Northern'].strings.push('M 1271.46 519.32 C 1268.02 515.88 1265.2 509.07 1265.2 504.21');
bb.tl.lines['Northern'].strings.push('M 1265.2 504.21 L 1265.2 485.88');
bb.tl.lines['Northern'].strings.push('M 1265.2 485.88 C 1265.2 481 1268.02 474.2 1271.46 470.76');
bb.tl.lines['Northern'].strings.push('M 1271.46 470.76 L 1334.7 407.51');
bb.tl.lines['Northern'].strings.push('M 1334.7 407.51 C 1338.15 404.07 1340.97 397.27 1340.97 392.4');
bb.tl.lines['Northern'].strings.push('M 1340.97 392.4 L 1340.97 49.42');
bb.tl.lines['Northern'].strings.push('M 1212.79 1285.16 C 1216.23 1281.72 1219.05 1274.91 1219.05 1270.04');
bb.tl.lines['Northern'].strings.push('M 1219.05 1270.04 L 1219.05 653.6');
bb.tl.lines['Northern'].strings.push('M 1219.05 653.6 C 1219.05 648.73 1221.87 641.93 1225.31 638.48');
bb.tl.lines['Northern'].strings.push('M 1225.31 638.48 L 1245.66 618.12');
bb.tl.lines['Northern'].strings.push('M 1245.66 618.12 C 1249.11 614.68 1251.92 608.07 1251.92 603.44');
bb.tl.lines['Northern'].strings.push('M 1251.92 603.44 L 1251.92 535.2');
bb.tl.lines['Northern'].strings.push('M 1251.92 535.2 C 1251.92 530.33 1254.74 523.53 1258.18 520.09');
bb.tl.lines['Northern'].strings.push('M 1258.18 520.09 L 1258.94 519.32');
bb.tl.lines['Northern'].strings.push('M 1258.94 519.32 C 1262.39 515.88 1265.2 509.07 1265.2 504.21');
bb.tl.lines['Northern'].strings.push('M 1265.2 504.21 L 1265.2 485.88');
bb.tl.lines['Northern'].strings.push('M 1265.2 485.88 C 1265.2 481 1262.39 474.2 1258.94 470.76');
bb.tl.lines['Northern'].strings.push('M 1258.94 470.76 C 1255.41 467.24 955.38 167.2 955.38 167.2');
bb.tl.lines['Northern'].strings.push('M 955.38 167.2');
bb.tl.lines['Northern'].strings.push('M 904.33 1593.6 L 1476.75 1021.2');
bb.tl.lines['Northern'].strings.push('M 1476.75 1021.2 C 1480.19 1017.75 1483.01 1010.95 1483.01 1006.08');
bb.tl.lines['Northern'].strings.push('M 1483.01 1006.08 L 1483.01 644.15');
bb.tl.lines['Northern'].strings.push('M 1483.01 644.15 C 1483.01 638.18 1480.59 632.78 1476.68 628.87');
bb.tl.lines['Northern'].strings.push('M 1476.68 628.87 C 1472.77 624.95 1467.35 622.54 1461.39 622.54');
bb.tl.lines['Northern'].strings.push('M 1461.39 622.54 L 1299.77 622.54');
bb.tl.lines['Northern'].strings.push('M 1299.77 622.54 C 1288.02 622.54 1278.48 613.01 1278.48 601.25');
bb.tl.lines['Northern'].strings.push('M 1278.48 601.25 L 1278.48 535.2');
bb.tl.lines['Northern'].strings.push('M 1278.48 535.2 C 1278.48 530.33 1275.67 523.53 1272.22 520.09');
bb.tl.lines['Northern'].strings.push('M 1272.22 520.09 L 1271.46 519.32');
bb.tl.lines['Northern'].strings.push('M 1271.46 519.32 C 1268.02 515.88 1265.2 509.07 1265.2 504.21');
bb.tl.lines['Northern'].strings.push('M 1265.2 504.21 L 1265.2 485.88');
bb.tl.lines['Northern'].strings.push('M 1265.2 485.88 C 1265.2 481 1268.02 474.2 1271.46 470.76');

bb.tl.lines['EastLondon'] = { strings: [], color: '#F7931E', paths: [], stations: [] };
bb.tl.lines['EastLondon'].strings.push('M 663.47 539.51 L 663.47 20.27');
bb.tl.lines['EastLondon'].strings.push('M 663.47 20.27');
bb.tl.lines['EastLondon'].strings.push('M 580.72 531.68 C 577.29 535.13 574.46 541.93 574.46 546.8');
bb.tl.lines['EastLondon'].strings.push('M 574.46 546.8');
bb.tl.lines['EastLondon'].strings.push('M 758.14 1081.09 C 758.14 1085.96 760.96 1092.76 764.41 1096.21');
bb.tl.lines['EastLondon'].strings.push('M 764.41 1096.21 L 962.14 1293.94');
bb.tl.lines['EastLondon'].strings.push('M 962.14 1293.94');
bb.tl.lines['EastLondon'].strings.push('M 1982.16 585.92 L 1807.8 585.92');
bb.tl.lines['EastLondon'].strings.push('M 1807.8 585.92 C 1802.93 585.92 1796.12 583.1 1792.69 579.66');
bb.tl.lines['EastLondon'].strings.push('M 1792.69 579.66 L 1723.78 510.76');
bb.tl.lines['EastLondon'].strings.push('M 1723.78 510.76 C 1720.34 507.32 1713.54 504.5 1708.67 504.5');
bb.tl.lines['EastLondon'].strings.push('M 1708.67 504.5 L 1416.72 504.5');
bb.tl.lines['EastLondon'].strings.push('M 1416.72 504.5 C 1411.85 504.5 1405.05 501.68 1401.6 498.24');
bb.tl.lines['EastLondon'].strings.push('M 1401.6 498.24 L 1298.27 394.9');
bb.tl.lines['EastLondon'].strings.push('M 1298.27 394.9 C 1294.82 391.45 1288.02 388.64 1283.14 388.64');
bb.tl.lines['EastLondon'].strings.push('M 1283.14 388.64 L 1153.21 388.64');
bb.tl.lines['EastLondon'].strings.push('M 1153.21 388.64 C 1148.35 388.64 1141.54 391.46 1138.1 394.9');
bb.tl.lines['EastLondon'].strings.push('M 1138.1 394.9 L 1054.56 478.44');
bb.tl.lines['EastLondon'].strings.push('M 1054.56 478.44 C 1051.12 481.89 1044.32 484.7 1039.45 484.7');
bb.tl.lines['EastLondon'].strings.push('M 1039.45 484.7 L 636.55 484.7');
bb.tl.lines['EastLondon'].strings.push('M 636.55 484.7 C 631.68 484.7 624.88 487.52 621.44 490.97');
bb.tl.lines['EastLondon'].strings.push('M 621.44 490.97');
bb.tl.lines['EastLondon'].strings.push('M 515.38 597.02 C 511.94 600.46 509.12 607.27 509.12 612.14');
bb.tl.lines['EastLondon'].strings.push('M 509.12 612.14 L 509.12 931.18');
bb.tl.lines['EastLondon'].strings.push('M 509.12 931.18 C 509.12 936.05 506.3 942.86 502.85 946.3');
bb.tl.lines['EastLondon'].strings.push('M 502.85 946.3 L 451.28 997.91');
bb.tl.lines['EastLondon'].strings.push('M 451.28 997.91 C 446.18 1002.99 443 1010.1 443 1017.89');
bb.tl.lines['EastLondon'].strings.push('M 443 1017.89 C 443 1026.3 443 1177.98 443 1177.98');
bb.tl.lines['EastLondon'].strings.push('M 443 1177.98');
bb.tl.lines['EastLondon'].strings.push('M 2164.63 601.29 L 2164.63 544.53');
bb.tl.lines['EastLondon'].strings.push('M 2164.63 544.53 C 2164.63 539.66 2161.82 532.86 2158.37 529.42');
bb.tl.lines['EastLondon'].strings.push('M 2158.37 529.42 L 2141.21 512.26');
bb.tl.lines['EastLondon'].strings.push('M 2141.21 512.26 C 2137.77 508.81 2130.96 505.99 2126.1 505.99');
bb.tl.lines['EastLondon'].strings.push('M 2126.1 505.99 L 1908.86 505.99');
bb.tl.lines['EastLondon'].strings.push('M 1908.86 505.99 C 1904 505.99 1897.19 503.17 1893.75 499.73');
bb.tl.lines['EastLondon'].strings.push('M 1893.75 499.73 L 1854 459.98');
bb.tl.lines['EastLondon'].strings.push('M 1854 459.98 C 1850.55 456.54 1847.73 449.73 1847.73 444.86');
bb.tl.lines['EastLondon'].strings.push('M 1847.73 444.86 L 1847.73 372.39');
bb.tl.lines['EastLondon'].strings.push('M 1847.73 372.39 C 1847.73 367.52 1844.92 360.72 1841.47 357.27');
bb.tl.lines['EastLondon'].strings.push('M 1841.47 357.27 L 1776.37 292.17');
bb.tl.lines['EastLondon'].strings.push('M 1776.37 292.17 C 1772.94 288.73 1766.13 285.91 1761.26 285.91');
bb.tl.lines['EastLondon'].strings.push('M 1761.26 285.91 L 1531.3 285.91');
bb.tl.lines['EastLondon'].strings.push('M 1531.3 285.91 C 1526.42 285.91 1519.62 288.73 1516.18 292.17');
bb.tl.lines['EastLondon'].strings.push('M 1516.18 292.17 L 1444.59 363.76');
bb.tl.lines['EastLondon'].strings.push('M 1444.59 363.76 C 1441.14 367.2 1434.35 370.02 1429.48 370.02');
bb.tl.lines['EastLondon'].strings.push('M 1429.48 370.02 L 1270.6 370.02');
bb.tl.lines['EastLondon'].strings.push('M 580.77 531.69 C 577.33 535.13 574.5 541.93 574.49 546.8');
bb.tl.lines['EastLondon'].strings.push('M 574.49 546.8 L 574.33 667.68');
bb.tl.lines['EastLondon'].strings.push('M 574.33 667.68 C 574.33 672.54 577.14 679.35 580.58 682.79');
bb.tl.lines['EastLondon'].strings.push('M 580.58 682.79 L 751.91 854.12');
bb.tl.lines['EastLondon'].strings.push('M 751.91 854.12 C 755.34 857.56 758.17 864.37 758.17 869.24');
bb.tl.lines['EastLondon'].strings.push('M 758.17 869.24 L 758.17 1081.08');
bb.tl.lines['EastLondon'].strings.push('M 758.17 1081.08 C 758.17 1085.95 760.99 1092.75 764.43 1096.19');
bb.tl.lines['EastLondon'].strings.push('M 764.43 1096.19 L 962.16 1293.93');
bb.tl.lines['EastLondon'].strings.push('M 962.16 1293.93');
bb.tl.lines['EastLondon'].strings.push('M 1982.14 585.93 L 1807.79 585.93');
bb.tl.lines['EastLondon'].strings.push('M 1807.79 585.93 C 1802.92 585.93 1796.12 583.11 1792.69 579.67');
bb.tl.lines['EastLondon'].strings.push('M 1792.69 579.67 L 1723.78 510.77');
bb.tl.lines['EastLondon'].strings.push('M 1723.78 510.77 C 1720.34 507.33 1713.54 504.51 1708.67 504.51');
bb.tl.lines['EastLondon'].strings.push('M 1708.67 504.51 L 1416.72 504.51');
bb.tl.lines['EastLondon'].strings.push('M 1416.72 504.51 C 1411.86 504.51 1405.06 501.69 1401.61 498.25');
bb.tl.lines['EastLondon'].strings.push('M 1401.61 498.25 L 1298.28 394.91');
bb.tl.lines['EastLondon'].strings.push('M 1298.28 394.91 C 1294.83 391.47 1288.03 388.65 1283.16 388.65');
bb.tl.lines['EastLondon'].strings.push('M 1283.16 388.65 L 1153.24 388.65');
bb.tl.lines['EastLondon'].strings.push('M 1153.24 388.65 C 1148.37 388.65 1141.57 391.47 1138.12 394.91');
bb.tl.lines['EastLondon'].strings.push('M 1138.12 394.91 L 1054.58 478.45');
bb.tl.lines['EastLondon'].strings.push('M 1054.58 478.45 C 1051.14 481.89 1044.34 484.71 1039.47 484.71');
bb.tl.lines['EastLondon'].strings.push('M 1039.47 484.71 L 636.59 484.71');
bb.tl.lines['EastLondon'].strings.push('M 636.59 484.71 C 631.71 484.71 624.91 487.53 621.47 490.97');
bb.tl.lines['EastLondon'].strings.push('M 621.47 490.97 L 515.43 597.02');
bb.tl.lines['EastLondon'].strings.push('M 515.43 597.02 C 511.99 600.46 509.16 607.27 509.16 612.14');
bb.tl.lines['EastLondon'].strings.push('M 509.16 612.14 L 509.16 931.18');
bb.tl.lines['EastLondon'].strings.push('M 509.16 931.18 C 509.16 936.04 506.35 942.84 502.9 946.29');
bb.tl.lines['EastLondon'].strings.push('M 502.9 946.29 L 451.33 997.89');
bb.tl.lines['EastLondon'].strings.push('M 451.33 997.89 C 446.23 1002.98 443.05 1010.1 443.05 1017.87');
bb.tl.lines['EastLondon'].strings.push('M 443.05 1017.87 C 443.05 1026.29 443.05 1178.72 443.05 1178.72');
bb.tl.lines['EastLondon'].strings.push('M 1632.51 1477.4 C 1632.51 1482.94 1630.4 1488.47 1626.17 1492.69');
bb.tl.lines['EastLondon'].strings.push('M 1626.17 1492.69 C 1605.06 1513.8 1567.9 1550.95 1567.9 1550.95');
bb.tl.lines['EastLondon'].strings.push('M 1567.9 1550.95');
bb.tl.lines['EastLondon'].strings.push('M 1734.56 1117.45 C 1734.56 1122.98 1732.44 1128.51 1728.22 1132.74');
bb.tl.lines['EastLondon'].strings.push('M 1728.22 1132.74 C 1720.56 1140.4 1638.84 1222.12 1638.84 1222.12');
bb.tl.lines['EastLondon'].strings.push('M 1638.84 1222.12 C 1634.62 1226.34 1632.51 1230.22 1632.51 1236.08');
bb.tl.lines['EastLondon'].strings.push('M 1632.51 1236.08 L 1632.51 1592.25');
bb.tl.lines['EastLondon'].strings.push('M 1632.51 1592.25');
bb.tl.lines['EastLondon'].strings.push('M 1734.56 1260.3 C 1734.56 1246.48 1734.56 1224.99 1734.56 547.35');
bb.tl.lines['EastLondon'].strings.push('M 1232.85 616.56 L 1190.34 574.05');
bb.tl.lines['EastLondon'].strings.push('M 1190.34 574.05 C 1186.89 570.6 1180.09 567.79 1175.22 567.79');
bb.tl.lines['EastLondon'].strings.push('M 1175.22 567.79 L 678.24 567.79');
bb.tl.lines['EastLondon'].strings.push('M 678.24 567.79 C 674.72 567.84 670.35 566.08 667.82 563.47');
bb.tl.lines['EastLondon'].strings.push('M 667.82 563.47 C 665.3 561.02 663.45 556.68 663.51 553.05');
bb.tl.lines['EastLondon'].strings.push('M 663.51 553.05 L 663.51 20.31');

bb.tl.lines['DLR'] = { strings: [], color: '#00A99D', paths: [], stations: [] };
bb.tl.lines['DLR'].strings.push('M 1985.08 588.48 L 1985.08 602.61');
bb.tl.lines['DLR'].strings.push('M 1985.08 602.61 C 1985.08 607.48 1982.26 614.28 1978.82 617.72');
bb.tl.lines['DLR'].strings.push('M 1978.82 617.72 L 1897.05 699.48');
bb.tl.lines['DLR'].strings.push('M 1897.05 699.48 C 1893.6 702.92 1890.79 708.07 1890.79 713');
bb.tl.lines['DLR'].strings.push('M 1890.79 713 L 1890.79 1355.53');
bb.tl.lines['DLR'].strings.push('M 1682.36 882.69 C 1677.49 882.69 1670.69 885.5 1667.25 888.95');
bb.tl.lines['DLR'].strings.push('M 1667.25 888.95 C 1662.55 893.64 1639.89 916.3 1639.89 916.3');
bb.tl.lines['DLR'].strings.push('M 1639.89 916.3');
bb.tl.lines['DLR'].strings.push('M 1487.84 857.71 L 1640.34 857.71');
bb.tl.lines['DLR'].strings.push('M 1640.34 857.71 C 1645.21 857.71 1652.02 860.54 1655.46 863.97');
bb.tl.lines['DLR'].strings.push('M 1655.46 863.97 L 1667.91 876.42');
bb.tl.lines['DLR'].strings.push('M 1667.91 876.42 C 1671.35 879.86 1678.16 882.68 1683.03 882.68');
bb.tl.lines['DLR'].strings.push('M 1683.03 882.68 L 2148.79 882.68');
bb.tl.lines['DLR'].strings.push('M 2148.79 882.68 C 2153.66 882.68 2160.46 885.49 2163.9 888.94');
bb.tl.lines['DLR'].strings.push('M 2163.9 888.94 L 2351.57 1076.62');
bb.tl.lines['DLR'].strings.push('M 2351.57 1076.62');
bb.tl.lines['DLR'].strings.push('M 1860.84 882.69 C 1865.23 882.69 1871.65 885.5 1875.09 888.95');
bb.tl.lines['DLR'].strings.push('M 1875.09 888.95 L 1884.53 898.39');
bb.tl.lines['DLR'].strings.push('M 1884.53 898.39 C 1887.98 901.83 1890.79 908.63 1890.79 913.5');
bb.tl.lines['DLR'].strings.push('M 1890.79 913.5');
bb.tl.lines['DLR'].strings.push('M 2087.49 882.69 C 2092.36 882.69 2099.16 885.5 2102.61 888.94');
bb.tl.lines['DLR'].strings.push('M 2102.61 888.94 L 2417.17 1203.52');
