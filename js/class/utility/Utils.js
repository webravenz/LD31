
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
    randomBetween : function(min, max, floatVal) {
        var val = Math.random()*(max-min)+min;
        return floatVal ? val : Math.floor(val);
    }
}
