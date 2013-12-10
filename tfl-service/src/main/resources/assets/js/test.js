function handleMoveTo(seg) {
    console.log(seg);
}

function handleLineTo(seg) {
    console.log(seg);
}

function handleHorizontalTo(seg) {
    console.log(seg);
}

function handleVerticalTo(seg) {
    console.log(seg);
}

function handleCurveTo(seg) {
    console.log(seg);
}

function handleCurveToSmooth(seg) {
    console.log(seg);
}

function handleCurveToQuadratic(seg) {
    console.log(seg);
}

function handleCurveToQuadraticSmooth(seg) {
    console.log(seg);
}

function handleArcTo(seg) {
    console.log(seg);
}

function convertToAbsolute(path) {
    var x0,y0,x1,y1,x2,y2;
    var segs = path.pathSegList;
    for (var x=0,y=0,i=0,len=segs.numberOfItems;i<len;++i) {
        var seg = segs.getItem(i);
        var c=seg.pathSegTypeAsLetter;

        if (/[MLHVCSQTA]/.test(c)) {
            if ('x' in seg) x=seg.x;
            if ('y' in seg) y=seg.y;
            switch(c.toUpperCase()) {
                case 'M': {
                    handleMoveTo(seg);
                    break;
                }
                case 'L': {
                    handleLineTo(seg);
                    break;
                }
                case 'H': {
                    handleHorizontalTo(seg);
                    break;
                }
                case 'V': {
                    handleVerticalTo(seg);
                    break;
                }
                case 'C': {
                    handleCurveTo(seg);
                    break;
                }
                case 'S': {
                    handleCurveToSmooth(seg);
                    break;
                }
                case 'Q': {
                    handleCurveToQuadratic(seg);
                    break;
                }
                case 'T': {
                    handleCurveToQuadraticSmooth(seg);
                    break;
                }
                case 'A': {
                    handleArcTo(seg);
                    break;
                }
            }
        }
        else {
//            console.log(path.createSVGPathSegMovetoAbs(x,y));
            if ('x1' in seg) x1=x+seg.x1;
            if ('x2' in seg) x2=x+seg.x2;
            if ('y1' in seg) y1=y+seg.y1;
            if ('y2' in seg) y2=y+seg.y2;
            if ('x'  in seg) x+=seg.x;
            if ('y'  in seg) y+=seg.y;
            switch(c.toLowerCase()) {
                case 'm': {
                    seg = path.createSVGPathSegMovetoAbs(x,y);
                    handleMoveTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'l': {
                    seg = path.createSVGPathSegLinetoAbs(x,y);
                    handleLineTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'h': {
                    seg = path.createSVGPathSegLinetoHorizontalAbs(x);
                    handleHorizontalTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'v': {
                    seg = path.createSVGPathSegLinetoVerticalAbs(y);
                    handleVerticalTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'c': {
                    seg = path.createSVGPathSegCurvetoCubicAbs(x,y,x1,y1,x2,y2);
                    handleCurveTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 's': {
                    seg = path.createSVGPathSegCurvetoCubicSmoothAbs(x,y,x2,y2);
                    handleCurveToSmooth(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'q': {
                    seg = path.createSVGPathSegCurvetoQuadraticAbs(x,y,x1,y1);
                    handleCurveToQuadratic(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 't': {
                    seg = path.createSVGPathSegCurvetoQuadraticSmoothAbs(x,y);
                    handleCurveToQuadraticSmooth(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'a': {
                    seg = path.createSVGPathSegArcAbs(x,y,seg.r1,seg.r2,seg.angle,seg.largeArcFlag,seg.sweepFlag);
                    handleArcTo(seg);
                    segs.replaceItem(seg,i);
                    break;
                }
                case 'z': {
                    x=x0;
                    y=y0;
                    break;
                }
            }
        }

        // Record the start of a subpath
        if (c=='M' || c=='m') {
            x0=x;
            y0=y;
        }
    }

    return path;
}

$(document).ready(function() {
    var path = convertToAbsolute(document.getElementById("path"));
    console.log(path.getAttribute("d"));
});
