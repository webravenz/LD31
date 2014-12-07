
LD.Enemy = function() {
    
    PIXI.DisplayObjectContainer.call( this );
    
    // big shadow
    this.bigShadow = PIXI.Sprite.fromImage('img/enemy-big-shadow.png');
    this.addChild(this.bigShadow);
    this.bigShadow.width = 157;
    this.bigShadow.height = 150;
    this.bigShadow.anchor.x = 0.5;
    this.bigShadow.anchor.y = 0.3;
    
    // big
    this.big = PIXI.Sprite.fromImage('img/enemy-big.png');
    this.addChild(this.big);
    this.big.width = 121;
    this.big.height = 115;
    this.big.anchor.x = this.big.anchor.y = 0.5;
    
    // small shadow
    this.smallShadow = PIXI.Sprite.fromImage('img/enemy-small-shadow.png');
    this.addChild(this.smallShadow);
    this.smallShadow.width = 78;
    this.smallShadow.height = 60;
    this.smallShadow.anchor.x = 0.5;
    this.smallShadow.anchor.y = 0.3;
    
    // small
    this.small = PIXI.Sprite.fromImage('img/enemy-small.png');
    this.addChild(this.small);
    this.small.width = 62;
    this.small.height = 44;
    this.small.anchor.x = this.small.anchor.y = 0.5;
    
    this.visible = false;
    this.active = false;

    if(!this.hitOffset) {
        this.hitOffset = {x: 0, y: 0};
    }
    
    this.MAX_X = LD.Config.width - this.big.width / 2;
    this.MIN_X = this.big.width / 2;
    this.MAX_Y = LD.Config.height - this.big.height / 2;
    this.MIN_Y = this.big.height / 2;
    
    
    this.MIN_SHADOW_X = 152;
    this.MAX_SHADOW_X = 1140;
    this.MIN_SHADOW_Y = 136;
    this.MAX_SHADOW_Y = 626;

    this.LIM_LINES = [
      [{x: 155, y: 528}, {x: 390, y: 630}], // bottom left
      [{x: 900, y: 628}, {x: 1139, y: 526}], // bottom right
      [{x: 393, y: 136}, {x: 153, y: 236}], // top left
      [{x: 1137, y: 236}, {x: 897, y: 136}] // top right
    ];
};

LD.Enemy.constructor = LD.Enemy;
// Enemy object extend PIXI Movieclip object
LD.Enemy.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );

LD.Enemy.prototype.alloc = function(x, y, big, quickAppear) {
  this.quickAppear = quickAppear;
  this.position.x = x;
  this.position.y = y;
  this.alpha = 0;
  this.visible = true;
  this.active = true;
  this.dying = false;
  this.scale.x = this.scale.y = 0;
  this.isBig = big;
  this.appearing = true;
  this.life = 1;
  
  // show good sprite
  if(big) {
    this.big.visible = true;
    this.bigShadow.visible = true;
    this.small.visible = false;
    this.smallShadow.visible = false;
    this.currentShadow = this.bigShadow;
    this.hitArea = new PIXI.Circle(0, 0, 50);
  } else {
    this.big.visible = false;
    this.bigShadow.visible = false;
    this.small.visible = true;
    this.smallShadow.visible = true;
    this.currentShadow = this.smallShadow;
    this.hitArea = new PIXI.Circle(0, 0, 18);
  }
  
  // random speed
  this.speedX = LD.Utils.randomBetween(0.5, 3, true);
  this.speedY = LD.Utils.randomBetween(0.5, 3, true);
  if(Math.random() < 0.5) {
    this.speedX = -this.speedX;
  }
  if(Math.random() < 0.5) {
    this.speedY = -this.speedY;
  }
  
  // random rotation
  this.big.rotation = this.small.rotation = LD.Utils.randomBetween(-Math.PI / 8, Math.PI / 8, true);
  
  // should we show shadow
  this.checkShadowState();
  this.currentShadow.alpha = this.showShadow ? 1 : 0;
};

LD.Enemy.prototype.canRealloc = function() {
    this.visible = false;
    this.active = false;
    if(this.poolName) LD.enemiesManager[this.poolName+'Pool'].add(this);
};

LD.Enemy.prototype.updateTransform = function() {
    //we update the hitArea
    if(this.hitArea) {
        this.hitArea.x = this.x + this.hitOffset.x;
        this.hitArea.y = this.y + this.hitOffset.y;
    }

    this.x += this.speedX;
    this.y += this.speedY;
    
    if((this.speedX > 0 && this.x > this.MAX_X) || (this.speedX < 0 && this.x < this.MIN_X)) {
      this.speedX = -this.speedX;
    }
    if((this.speedY > 0 && this.y > this.MAX_Y) || (this.speedY < 0 && this.y < this.MIN_Y)) {
      this.speedY = -this.speedY;
    }
    
    // appear anim
    if(this.appearing) {
      var up = this.quickAppear ? 0.05 : 0.02;
      this.alpha += up;
      this.scale.x += up;
      this.scale.y += up;
      if(this.alpha >= 1) {
        this.appearing = false;
      }
    }

    // die anim
    if(this.dying) {
        this.alpha -= 0.1;
        this.speedX *= 0.5;
        this.speedY *= 0.5;
        this.scale.x -= 0.08;
        this.scale.y -= 0.08;
        this.rotation += 0.1;

        if(this.alpha <= 0) {
            this.die();
        }
    }
    
    // update shadow
    if(this.currentShadow) {
      this.checkShadowState();
      if(this.showShadow && this.currentShadow.alpha < 1) {
        this.currentShadow.alpha += 0.1;
      } else if(!this.showShadow && this.currentShadow.alpha > 0) {
        this.currentShadow.alpha -= 0.1;
      }
    }

    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
};

// check if we should see shadow
LD.Enemy.prototype.checkShadowState = function() {
  
  this.showShadow = false;
  
  if(this.position.x < this.MAX_SHADOW_X & this.position.x > this.MIN_SHADOW_X && this.position.y < this.MAX_SHADOW_Y && this.position.y > this.MIN_SHADOW_Y) {
    var outDiagonales = false,
      i = this.LIM_LINES.length;
    while(i--) {
      if((this.LIM_LINES[i][1].x-this.LIM_LINES[i][0].x)*(this.position.y-this.LIM_LINES[i][0].y) - (this.LIM_LINES[i][1].y-this.LIM_LINES[i][0].y)*(this.position.x-this.LIM_LINES[i][0].x) > 0) {
        outDiagonales = true;
        break;
      }
    }
    this.showShadow = !outDiagonales;
  }
};

LD.Enemy.prototype.touched = function(bullet) {
    this.life = this.life - bullet.damage;
    if(this.life <= 0) {
        this.active = false;
        this.dying = true;
        this.appearing = false;
    }
};

LD.Enemy.prototype.die = function() {
    this.dying = false;
    this.canRealloc();
};

