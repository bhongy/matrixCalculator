// took this from Velocity

var transformProperties = [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ];

// take in velocity propertyMap (Object) => { property1: value1, property2: value2, ... }

/*

Simplified Matrix = | a c e | => | 1 0 0 |
                    | b d f |    | 0 1 0 |

Full Matrix       = | a c e | => | 1 0 0 |
                    | b d f |    | 0 1 0 |
                    | 0 0 1 |    | 0 0 1 |
*/

var a = 1,
    b = 0,
    c = 0,
    d = 1,
    e = 0,
    f = 0,
    matrixString = '';

/*
  Assume that the values in the passing propertyMap is processed
  - i.e. converted from "-=20%" to number via Velocity core
*/

var matrixBuilder = {

  // modify value from translateX
  translateX: function(value) {
    e += value;
  },

  // modify value from translateY
  translateY: function(value) {
    f += value;
  },

  /* Should we handle when scale is used with scaleX or scaleY ? */

  // modify value from scale
  scale: function(value) {
    a *= value;
    d *= value;
  },

  // modify value from scaleX
  scaleX: function(value) {
    a *= value;
  },

  // modify value from scaleY
  scaleY: function(value) {
    d *= value;
  },

  /* Assume we pass in normalized angle value - Radian */

  // modify value from skewX
  skewX: function(angle) {
    c *= Math.tan(angle);
  },

  // modify value from skewY
  skewY: function(angle) {
    b *= Math.tan(angle);
  },

  // modify value from rotateZ
  rotateZ: function(angle) {
    a *= MATH.cos(angle);
    b *= MATH.sin(angle);
    c *= -(MATH.sin(angle));
    d *= MATH.cos(angle);
  }

};