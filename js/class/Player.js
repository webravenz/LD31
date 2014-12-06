
LD.Player = function() {
    
  var textures = LD.SpriteSheetTextures.getArray('player', '.png', 4);

  PIXI.MovieClip.call( this, textures );

  //this.anchor.x = this.anchor.y = 0.5;

  // moving vars
  this.ACCELERATION = 0.4;
  this.MAX_SPEED = 6;
  this.MIN_X = 0;
  this.MIN_Y = 0;
  this.MAX_X = (LD.Config.width - this.width) * 0.6;
  this.MAX_Y = LD.Config.height - this.height;

  this.animationSpeed = 0.1;
  this.hitArea = new LD.Rectangle(0, 0, 85, 85);
  this.hitOffset = {x: 50, y: 70};
  
};

LD.Player.constructor = LD.Player;
LD.Player.prototype = Object.create( PIXI.MovieClip.prototype );


LD.Player.prototype.init = function() {
  
  this.position.x = 100;
  this.position.y = 340;
  this.speedX = this.speedY = 0;
  this.canShoot = false;
  
  // life
  this.life = this.maxLife = 10;
  this.hitTimer = 0;
  
  this.visible = true;
  LD.PlayerUI.majBar(100);
  
};

/**
 * hit an ennemy, decrease life
 */
LD.Player.prototype.hitEnnemy = function() {
  if(this.hitTimer > 0) return;
  this.life--;
  LD.PlayerUI.majBar((this.life / this.maxLife) * 100);
  if(this.life === 0) {
    this.die();
  } else {
    this.alpha = 0.5;
    this.hitTimer = 60;
    this.speedX -= 20;
  }
};

/**
 * life is over
 */
LD.Player.prototype.die = function() {
  this.visible = false;
  LD.Controls.stop();
  LD.showGameOver();
};

/**
 * override updateTransform method, called each frame
 */
LD.Player.prototype.updateTransform = function() {
    
  // keyboard controls
  if(LD.Controls.pressed(LD.Controls.UP)) {
      this.speedY -= this.ACCELERATION;
  } else if(LD.Controls.pressed(LD.Controls.DOWN)) {
      this.speedY += this.ACCELERATION;
  } else {
      this.speedY /= 1.3;
  }

  if(LD.Controls.pressed(LD.Controls.LEFT)) {
      this.speedX -= this.ACCELERATION;
  } else if(LD.Controls.pressed(LD.Controls.RIGHT)) {
      this.speedX += this.ACCELERATION;
  } else {
      this.speedX /= 1.3;
  }
  
  this.hitTimer--;
  if(this.hitTimer <= 0) this.alpha = 1;

  // update speed and position
  this.speedY = LD.Utils.boundary(this.speedY, -this.MAX_SPEED, this.MAX_SPEED);
  if(Math.abs(this.speedY) < 0.3) this.speedY = 0;
  this.position.y += this.speedY;
  this.speedX = LD.Utils.boundary(this.speedX, -this.MAX_SPEED, this.MAX_SPEED);
  if(Math.abs(this.speedX) < 0.3) this.speedX = 0;
  this.position.x += this.speedX;

  // update anim
  if(this.speedY != 0 || this.speedX != 0) {
      this.play();
  } else {
      this.gotoAndStop(0);
  }

  // prevent ship to leave game screen
  this.position.y = LD.Utils.boundary(this.position.y, this.MIN_Y, this.MAX_Y);
  this.position.x = LD.Utils.boundary(this.position.x, this.MIN_X, this.MAX_X);

  //we update the hitArea
  this.hitArea.x = this.position.x + this.hitOffset.x;
  this.hitArea.y = this.position.y + this.hitOffset.y;

  PIXI.MovieClip.prototype.updateTransform.call( this ); 
};