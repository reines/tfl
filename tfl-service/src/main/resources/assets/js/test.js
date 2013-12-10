function convertToAbsolute(path, xOffset, yOffset, decimalPlaces) {
    var newPath = [];

    function roundCoordinates(v) {
        return +v.toFixed(decimalPlaces);
    }

    var x0,y0,x1,y1,x2,y2;
    var segs = path.pathSegList;
    for (var x=xOffset,y=yOffset,i=0,len=segs.numberOfItems;i<len;++i) {
        var seg = segs.getItem(i);
        var c=seg.pathSegTypeAsLetter;

        if (/[MLHVCSQTAZ]/.test(c)) {
            if ('x1' in seg) x1=roundCoordinates(seg.x1+xOffset);
            if ('x2' in seg) x2=roundCoordinates(seg.x2+xOffset);
            if ('y1' in seg) y1=roundCoordinates(seg.y1+yOffset);
            if ('y2' in seg) y2=roundCoordinates(seg.y2+yOffset);
            if ('x'  in seg) x=roundCoordinates(seg.x+xOffset);
            if ('y'  in seg) y=roundCoordinates(seg.y+yOffset);
        }
        else {
            if ('x1' in seg) x1=roundCoordinates(x+seg.x1);
            if ('x2' in seg) x2=roundCoordinates(x+seg.x2);
            if ('y1' in seg) y1=roundCoordinates(y+seg.y1);
            if ('y2' in seg) y2=roundCoordinates(y+seg.y2);
            if ('x'  in seg) x=roundCoordinates(x+seg.x);
            if ('y'  in seg) y=roundCoordinates(y+seg.y);
        }

        switch(c.toLowerCase()) {
            case 'm': {
                seg = path.createSVGPathSegMovetoAbs(x,y);
                break;
            }
            case 'l': {
                seg = path.createSVGPathSegLinetoAbs(x,y);
                break;
            }
            case 'h': {
//                seg = path.createSVGPathSegLinetoHorizontalAbs(x);
                seg = path.createSVGPathSegLinetoAbs(x,y);
                break;
            }
            case 'v': {
//                seg = path.createSVGPathSegLinetoVerticalAbs(y);
                seg = path.createSVGPathSegLinetoAbs(x,y);
                break;
            }
            case 'c': {
                seg = path.createSVGPathSegCurvetoCubicAbs(x,y,x1,y1,x2,y2);
                break;
            }
            case 's': {
                seg = path.createSVGPathSegCurvetoCubicSmoothAbs(x,y,x2,y2);
                break;
            }
            case 'q': {
                seg = path.createSVGPathSegCurvetoQuadraticAbs(x,y,x1,y1);
                break;
            }
            case 't': {
                seg = path.createSVGPathSegCurvetoQuadraticSmoothAbs(x,y);
                break;
            }
            case 'a': {
                seg = path.createSVGPathSegArcAbs(x,y,seg.r1,seg.r2,seg.angle,seg.largeArcFlag,seg.sweepFlag);
                break;
            }
            case 'z': {
                x=x0;
                y=y0;
                break;
            }
        }

        newPath.push(seg);

        // Record the start of a subpath
        if (c=='M' || c=='m') {
            x0=x;
            y0=y;
        }
        else if (i < (len - 1)) {
            newPath.push(path.createSVGPathSegMovetoAbs(x,y));
        }
    }

    // Replace the path with the new one
    segs.clear();
    for (var i = 0;i < newPath.length;i++) {
        segs.appendItem(newPath[i]);
    }

    return path;
}

var decimalPlaces = 2;

$(document).ready(function() {
    $("path").each(function() {
        var name = $(this).data("name").trim();
        var xOffset = $(this).data("x") || 0;
        var yOffset = $(this).data("y") || 0;

        console.log("bb.tl.lines['" + name + "'] = { strings: [], color: '#009CDB', paths: [], stations: [] };");

        convertToAbsolute($(this)[0], xOffset, yOffset, decimalPlaces);
        var segList = $(this).attr("d").replace(/([a-zA-Z])/g, "\n$1").replace(/\n([^M])/g, "$1").trim().split("\n");
        for (var i = 0;i < segList.length;i++) {
            var seg = segList[i];
            console.log("bb.tl.lines['" + name + "'].strings.push('" + seg.trim() + "');");
        }

        console.log("");
    });
});
