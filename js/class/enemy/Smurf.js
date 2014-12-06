
LD.Smurf = function() {
    
    var textures = LD.SpriteSheetTextures.getArray('smurf', '.png', 4);
    LD.Enemy.call( this, textures );
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 60, 100);
    this.hitOffset = {x: 25, y: 30};
    this.animationSpeed = 0.1;
    this.poolName = 'smurf';
};

LD.Smurf.constructor = LD.Smurf;
LD.Smurf.prototype = Object.create( LD.Enemy.prototype );

LD.Smurf.prototype.alloc = function() {
    this.life = 2;
    this.position.x = LD.Config.width + 100 + LD.Utils.randomBetween(0, 200);
    this.speedX = LD.Utils.randomBetween(-3, -5);
    this.speedY = 0;

    this.gotoAndPlay(LD.Utils.randomBetween(1,4));

    LD.Enemy.prototype.alloc.call(this);
};

LD.Smurf.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < -50) {
            this.canRealloc();
        }
    }

    LD.Enemy.prototype.updateTransform.call( this );
};
