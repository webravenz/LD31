
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
    Q: [81, 65],
    D: 68,
    Z: [90, 87],
    F: 70,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: [77, 186],
    N8: 104,
    N4: 100,
    N5: 101,
    N6: 102,
    PLUS: 107,
    CTRL: 17,
    
    keysPressed: [],
    
    /**
     * init listeners
     */
    start: function() {
        var scope = this;
        
        this.keyDownHandler = function(e) {
          if(e.keyCode != 116) { // dont disable F5 or there will be some problem for the dev !
            e.preventDefault();
            scope.keyDown(e);
          }
        };
        document.addEventListener('keydown', this.keyDownHandler);
        
        this.keyUpHandler = function(e) {
          console.log(e.keyCode);
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
      if(keyCode.length !== undefined) {
        var pressed = false;
        for(var i in keyCode) {
          if(this.keysPressed[keyCode[i]]) pressed = true;
        }
        return pressed;
      } else {
        return this.keysPressed[keyCode];
      }
    }
    
}
