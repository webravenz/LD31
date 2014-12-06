
LD.PapaSmurf = function() {
    
    var textures = LD.SpriteSheetTextures.getArray('papasmurf', '.png', 4);
    LD.Enemy.call( this, textures );
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 150, 250);
    this.animationSpeed = 0.1;

    this.hitOffset = {x: 90, y: 90};
};

LD.PapaSmurf.constructor = LD.PapaSmurf;
// PapaSmurf object extend PIXI Movieclip object
LD.PapaSmurf.prototype = Object.create( LD.Enemy.prototype );

LD.PapaSmurf.prototype.alloc = function() {

    this.stop();

    LD.Enemy.prototype.alloc.call(this);

    this.life = 100;
    this.position.x = LD.Config.width + this.width / 2;
    this.position.y = LD.Config.height / 2;
    this.speedX = -10.5;
    this.speedY = 0;
    this.newGoal();
    this.canMove = false;

    LD.BossUI.majBar(100);
};

LD.PapaSmurf.prototype.updateTransform = function() {

    if(this.speedX < -0.1) {
        this.speedX *= 0.96;
    } else {
        this.speedX = 0;
    }

    if(Math.abs(this.goal - this.position.y) < 10) {
        this.newGoal();
    }

    if(!this.canMove) {
        this.speedY = 0;
    } else {
        this.play();
        this.speedY += this.goal < this.position.y ? -0.1 : 0.1;
        this.speedY = LD.Utils.boundary(this.speedY, -2, 2);
    }

    LD.Enemy.prototype.updateTransform.call( this );
};


LD.PapaSmurf.prototype.touched = function(bullet) {
    LD.Enemy.prototype.touched.call(this, bullet);
    LD.BossUI.majBar(this.life);
};

LD.PapaSmurf.prototype.newGoal = function() {
    this.goal = LD.Utils.randomBetween(this.height / 2, LD.Config.height - this.height / 2);
}