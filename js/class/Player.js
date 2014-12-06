
LD.Player = function(num, shootCb) {
  
  this.shootCb = shootCb;
  this.num = num;
  this.controls = LD.Config.playerControls[num];
    
  var images = [];
  for(var i = 1; i < 9; i++) {
    images.push('img/p'+(num+1)+'_'+i+'.png');
  }
  var mc = PIXI.MovieClip.fromImages(images);
  PIXI.MovieClip.call( this, mc.textures );

  //this.anchor.x = this.anchor.y = 0.5;

  // moving vars
  this.ACCELERATION = 0.1;
  this.MAX_SPEED = 4;
  this.MIN_X = LD.Config.width * 0.085;
  this.MAX_X = LD.Config.width * 0.905;
  this.MIN_Y = LD.Config.height * 0.127;
  this.MAX_Y = LD.Config.height * 0.852;

  this.animationSpeed = 0.1;
  this.hitArea = new PIXI.Circle(0, 0, 24);
  this.hitOffset = {x: 0, y: 0};
  this.anchor.x = this.anchor.y = 0.5;
  
  switch(num) {
    case 0 :
      this.gotoAndStop(3);
      break;
    case 1 :
      this.gotoAndStop(7);
      break;
    case 2 :
      this.gotoAndStop(1);
      break;
    case 3 :
      this.gotoAndStop(5);
      break;
  }
  
  this.dirToFrame = {
    n: 0,
    ne: 1,
    e: 2,
    se: 3,
    s: 4,
    sw: 5,
    w: 6,
    nw: 7
  };
  
  this.SHOOT_DELAY = 30;
  this.shootTimer = 0;
  this.hitTimer = 0;
  
};

LD.Player.constructor = LD.Player;
LD.Player.prototype = Object.create( PIXI.MovieClip.prototype );


LD.Player.prototype.init = function() {
  
  this.position.x = LD.Config.playersPos[this.num][0];
  this.position.y = LD.Config.playersPos[this.num][1];
  this.speedX = this.speedY = 0;
  this.dead = false;
  this.alpha = 1;
  this.scale.x = this.scale.y = 1;
  
  this.visible = true;
  
};

LD.Player.prototype.bulletHit = function(bullet) {
  this.speedX += bullet.speedX / 5;
  this.speedY += bullet.speedY / 5;
  this.hitTimer = 15;
  this.alpha = 0.5;
};

/**
 * life is over
 */
LD.Player.prototype.die = function() {
  this.dead = true;
};

/**
 * override updateTransform method, called each frame
 */
LD.Player.prototype.updateTransform = function() {
    
  // check shoot btn
  if(LD.Controls.pressed(this.controls.shoot) && !this.dead && !this.shootTimer) {
    this.shootCb(this);
    this.shootTimer = this.SHOOT_DELAY;
  }
  
  if(this.shootTimer > 0) {
    this.shootTimer--;
  }
    
  var dir = '';
  // keyboard controls
  if(LD.Controls.pressed(this.controls.up) && !this.dead && !this.hitTimer) {
      this.speedY -= this.ACCELERATION;
      dir += 'n';
  } else if(LD.Controls.pressed(this.controls.down) && !this.dead && !this.hitTimer) {
      this.speedY += this.ACCELERATION;
      dir += 's';
  } else {
      this.speedY /= 1.01;
  }

  if(LD.Controls.pressed(this.controls.left) && !this.dead && !this.hitTimer) {
      this.speedX -= this.ACCELERATION;
      dir += 'w';
  } else if(LD.Controls.pressed(this.controls.right) && !this.dead && !this.hitTimer) {
      this.speedX += this.ACCELERATION;
      dir += 'e';
  } else {
      this.speedX /= 1.01;
  }
  
  if(this.hitTimer > 0) {
    this.hitTimer--;
    this.alpha = 0.5;
  } else if(!this.dead) {
    this.alpha = 1;
  }

  // update speed and position
  if(!this.hitTimer) this.speedY = LD.Utils.boundary(this.speedY, -this.MAX_SPEED, this.MAX_SPEED);
  this.position.y += this.speedY;
  if(!this.hitTimer) this.speedX = LD.Utils.boundary(this.speedX, -this.MAX_SPEED, this.MAX_SPEED);
  this.position.x += this.speedX;

  // update anim
  if(dir !== '') {
    this.gotoAndStop(this.dirToFrame[dir]);
  }


  //we update the hitArea
  this.hitArea.x = this.position.x + this.hitOffset.x;
  this.hitArea.y = this.position.y + this.hitOffset.y;
  
  // you leave platform you die
  if(this.position.x > this.MAX_X || this.position.x < this.MIN_X || this.position.y > this.MAX_Y || this.position.y < this.MIN_Y) {
    this.die();
  }
  
  if(this.dead && this.alpha > 0) {
    this.alpha -= 0.05;
    this.scale.x -= 0.02;
    this.scale.y -= 0.02;
  }

  PIXI.MovieClip.prototype.updateTransform.call( this ); 
};