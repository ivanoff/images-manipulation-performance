'use strict';

// re-calculate new size for avoid of scratches
exports.correctSize = function (currentX, currentY, newX, newY) {
  const result = {
    width:  newX,
    height: newY,
    dx: 0,
  }

  if( currentX/newX > currentY/newY ) {
    result['width'] = currentX/currentY * newY;
    result['dx'] = ( result['width'] - newX )/2;
  } else {
    result['height'] = currentY/currentX * newX;
  }

  Object.keys(result).map(function(key) {
    result[key] = Math.round( result[key] );
  });

  return result;
}

