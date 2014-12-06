
LD.Utils = {
  /**
   * limit a value between min and max
   * @param value
   * @param min
   * @param max
   */
  boundary: function(value, min, max) {
    return value < min ? min : value > max ? max : value;
  },
  randomBetween: function(min, max, floatVal) {
    var val = Math.random() * (max - min) + min;
    return floatVal ? val : Math.floor(val);
  },
  circlesCollide: function(c1, c2) {
    var distance = this.getDistance(c1, c2);
    return distance <= c1.radius + c2.radius;
  },
  getDistance: function (p1, p2) {
    return Math.sqrt(this.sqr(p2.y - p1.y) + this.sqr(p2.x - p1.x));
  },
  angleBetween: function(c1, c2) {
    return Math.atan2(c2.y - c1.y, c2.x - c1.x);
  },
  sqr: function(a) {
    return a*a;
  }
};
