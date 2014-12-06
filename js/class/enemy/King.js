
LD.King = function() {
    
    //var textures = LD.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    //PIXI.MovieClip.call( this, textures );

    LD.Enemy.call(this, [PIXI.Texture.fromImage('img/king.png')]);
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 250, 520);
    this.hitOffset = {x: 160, y: 0};
    this.animationSpeed = 0.2;
};

LD.King.constructor = LD.King;
// King object extend PIXI Movieclip object
LD.King.prototype = Object.create( LD.Enemy.prototype );

LD.King.prototype.alloc = function() {

    LD.Enemy.prototype.alloc.call(this);

    this.life = 150;
    this.position.x = LD.Config.width + this.width / 2;
    this.position.y = LD.Config.height / 2;
    this.speedX = -18;
    this.speedY = 0;

    LD.BossUI.majBar(100);
};

LD.King.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    LD.Enemy.prototype.updateTransform.call( this );
};


LD.King.prototype.touched = function(bullet) {
    LD.Enemy.prototype.touched.call(this, bullet);
    LD.BossUI.majBar(this.life / 150 * 100);
};