
/**
 * handle keyboard keys pressed and touch inputs
 */

LD.Controls = {
    
    // define key codes we need
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    S: 83,
    
    keysPressed: [],
    
    /**
     * init listeners
     */
    start: function() {
        var scope = this;
        
        this.keyDownHandler = function(e) {
            e.preventDefault();
            scope.keyDown(e);
        };
        document.addEventListener('keydown', this.keyDownHandler);
        
        this.keyUpHandler = function(e) {
            e.preventDefault();
            scope.keyUp(e);
        };
        document.addEventListener('keyup', this.keyUpHandler);
        
    },
    
    stop: function() {
        
        document.removeEventListener('keydown', this.keyDownHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
        this.keysPressed = [];
        
    },
    
    keyDown: function(e) {
        this.keysPressed[e.keyCode] = true;
    },
    
    keyUp: function(e) {
        this.keysPressed[e.keyCode] = false;
    },
    
    /**
     * check if a key is currently pressed
     * @var int keyCode
     */
    pressed: function(keyCode) {
        return this.keysPressed[keyCode];
    }
    
}
