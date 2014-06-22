;(function() {

/*
  The objective of this module is to create a 6x1 array
    that is equivalent to the transfrom values in the propertyMap.
    The array represents how the transform should be done.

  The array represents the aggregate effect from all transform properties in the propertyMap.
    Meaning, you can pass in multiple properties in the same time.
  
  It is not written to modify an existing matrix array using the current matrix.
  It returns the final state of the transform and do not handle animation.
    Hence, we cannot use different duration in one propertyMap (consistent with Velocity API)
*/

/*
  Assume that the values in the passing propertyMap is processed
  - i.e. converted from "-=20%" to number via Velocity core
*/

// take in velocity propertyMap (Object) => { property1: value1, property2: value2, ... }

var matrixBuilder = function(propertyMap) {

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
      f = 0;

  // define functions to calculate the modified values
  var calculate = {

    // modify value from translateX
    translateX: function(value) {
      e += value;
    },

    // modify value from translateY
    translateY: function(value) {
      f += value;
    },

    /* Should we handle when scale is used with scaleX or scaleY ? */

    /*
      Did not account for when scale(value, cx, cy) is passed in
       - this is to keep consisten with Velocity API
    */

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
      c += Math.tan(angle);
    },

    // modify value from skewY
    skewY: function(angle) {
      b += Math.tan(angle);
    },

    // modify value from rotateZ
    rotateZ: function(angle) {
      a *= Math.cos(angle);
      b *= Math.sin(angle);
      c *= -(Math.sin(angle));
      d *= Math.cos(angle);
    }

  }; // END: calculate - Obj

  /*
    Run calculations for all transformProperties that are found in the current propertyMap
    - this will change the values of a, b, c, d, e, and f from 1, 0, 0, 1, 0, 0
  */
  var transformProperties = [ "translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ" ];

  for (var i = 0, len = transformProperties.length; i < len; i++) {
    var lookUpKey = transformProperties[i];
    if( propertyMap[ lookUpKey ] ) {
      calculate[ lookUpKey ]( propertyMap[ lookUpKey ] );
    }
  }

  // if we have previous matrix, it should return [ a0+=a, b0+=b, ... ]
  // alternatively: return [ [a, c, e], [b, d, f] ];
  return [a, b, c, d, e, f];

}; // END: matrixBuilder - Fn

}());