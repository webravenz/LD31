
LD.Magic = function() {
    
    var textures = LD.SpriteSheetTextures.getArray('bolt', '.png', 2);
    LD.Enemy.call( this, textures );
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 30, this.height);
    this.animationSpeed = 0.2;
    this.poolName = 'magic';
    this.cantTouch = true;
};

LD.Magic.constructor = LD.Magic;
LD.Magic.prototype = Object.create( LD.Enemy.prototype );

LD.Magic.prototype.alloc = function() {
    this.life = 100;
    this.position.x = this.parent.papaSmurf.position.x - 90;
    this.position.y = this.parent.papaSmurf.position.y - 100;
    this.speedX = LD.Utils.randomBetween(-4, -8);
    this.speedY = LD.Utils.randomBetween(-2.5, 2.5);
    this.play();

    LD.Enemy.prototype.alloc.call(this);
};

LD.Magic.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < -50) {
            this.canRealloc();
        }
    }

    LD.Enemy.prototype.updateTransform.call( this );
};
