
LD.Skittle = function() {
    
    LD.Enemy.call(this, [PIXI.Texture.fromImage('img/skittle'+LD.Utils.randomBetween(1, 4)+'.png')]);
    
    this.hitArea = new LD.Rectangle(this.position.x, this.position.y, 53, 53);
    this.animationSpeed = 0.2;
    this.poolName = 'skittle';
    this.hitOffset = {x: 9, y: 0};
};

LD.Skittle.constructor = LD.Skittle;
LD.Skittle.prototype = Object.create( LD.Enemy.prototype );

LD.Skittle.prototype.alloc = function() {
    this.position.x = this.parent.apple.position.x;
    this.position.y = this.parent.apple.position.y;
    this.life = 1;
    this.speedX = LD.Utils.randomBetween(2, 5);
    if(Math.random() < 0.5) this.speedX *= -1;
    this.speedY = LD.Utils.randomBetween(2, 5);
    if(Math.random() < 0.5) this.speedY *= -1;

    LD.Enemy.prototype.alloc.call(this);

    this.randomRotateSpeed();

    this.rotation = LD.Utils.randomBetween(0, 6);

};

LD.Skittle.prototype.updateTransform = function() {

    if(this.active) {
        if(this.position.x < this.width / 2 || this.position.x > LD.Config.width - this.width / 2) {
            this.speedX *= -1;
            this.randomRotateSpeed();
        }
        if(this.position.y < this.height / 2 || this.position.y > LD.Config.height - this.height / 2) {
            this.speedY *= -1;
            this.randomRotateSpeed();
        }
        this.rotation += this.rotateSpeed;
    }

    LD.Enemy.prototype.updateTransform.call( this );
};

LD.Skittle.prototype.randomRotateSpeed = function() {
    this.rotateSpeed = LD.Utils.randomBetween(0.01, 0.03, true);
    if(Math.random() < 0.5) this.rotateSpeed *= -1;
}