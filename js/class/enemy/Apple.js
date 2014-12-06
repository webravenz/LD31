
LD.Apple = function() {
    
    //var textures = LD.SpriteSheetTextures.getArray('e_f', '.png', 6);
    
    //PIXI.MovieClip.call( this, textures );

    LD.Enemy.call(this, [PIXI.Texture.fromImage('img/apple.png')]);
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 220, 210);
    this.animationSpeed = 0.2;
    this.hitOffset = {x: 40, y: 80};
};

LD.Apple.constructor = LD.Apple;
// Apple object extend PIXI Movieclip object
LD.Apple.prototype = Object.create( LD.Enemy.prototype );

LD.Apple.prototype.alloc = function() {

    LD.Enemy.prototype.alloc.call(this);

    this.life = 125;
    this.position.x = LD.Config.width + this.width / 2;
    this.position.y = LD.Config.height / 2;
    this.speedX = -10;
    this.speedY = 0;
    this.accel = false;
    this.decel = false;
    this.jumpComplete = false;

    LD.BossUI.majBar(100);
};

LD.Apple.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    if(this.accel) {
        this.speedY += 0.4 * this.direction;
        if(Math.abs(this.speedY) >= 10) {
            this.accel = false;
            this.decel = true;
        }
    } else if(this.decel) {
        this.speedY -= 0.5 * this.direction;
        if(Math.abs(this.speedY) < 0.5) {
            this.speedY = 0;
            this.decel = false;
            if(this.active) this.jumpComplete = true;
        }
    }

    this.scale.x = this.scale.y = 1 + (Math.abs(this.speedY) / 40);

    LD.Enemy.prototype.updateTransform.call( this );
};


LD.Apple.prototype.touched = function(bullet) {
    LD.Enemy.prototype.touched.call(this, bullet);
    LD.BossUI.majBar(this.life / 125 * 100);
};

LD.Apple.prototype.jump = function() {
    LD.Sounds.play('jump');
    this.direction = Math.random() < 0.5 ? -1 : 1;
    if(this.position.y < 200) this.direction = 1;
    else if (this.position.y > 600) this.direction = -1;
    this.accel = true;
};