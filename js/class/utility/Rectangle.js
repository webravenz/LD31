LD.Rectangle = function(x, y, width, height) {
    PIXI.Rectangle.call(this,x, y, width, height);
};

LD.Rectangle.constructor = LD.Rectangle;
LD.Rectangle.prototype = Object.create(PIXI.Rectangle.prototype);

LD.Rectangle.prototype.contain = function(point) {
    if(
        (point.x >= this.x && point.x <=this.x + this.width)
       && (point.y >= this.y && point.y <=this.y + this.height)) {
        return true;
       }
    return false;
    
}
LD.Rectangle.prototype.intersectWith = function(rect) {
    if((
            (this.x + this.width > rect.x && this.x < rect.x + rect.width ) 
            ||  (this.x > rect.x && this.x < rect.x + rect.width ) 
        ) && (
            (this.y + this.height > rect.y && this.y < rect.y + rect.height ) 
            ||  (this.y > rect.y && this.y < rect.y + rect.height )         
        )) {
            return true;
        }
    
    return false;
};