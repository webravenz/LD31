LD.EnemiesManager = function() {
  PIXI.DisplayObjectContainer.call(this);
  
  this.enemies = [];
  var totalEnemies = 100;
  var tmpEnemies = [];
  while(totalEnemies--) {
      var b = new LD.Enemy();
      this.addChild(b);
      this.enemies.push(b);
      tmpEnemies.push(b);
  }
  this.pool = new LD.Pool(tmpEnemies);
};

LD.EnemiesManager.constructor = LD.EnemiesManager;
LD.EnemiesManager.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);


LD.EnemiesManager.prototype.init = function() {
  this.timerAppear = 150;
  this.active = true;
};

LD.EnemiesManager.prototype.stop = function() {
  this.active = false;
};

LD.EnemiesManager.prototype.updateTransform = function() {
  
  if(this.active) {
    // enemy appear
    if (this.timerAppear <= 0) {
      this.enemyAppear();
      this.timerAppear = LD.Utils.randomBetween(100, 200);
    }

    this.timerAppear--;
  }

  PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};

LD.EnemiesManager.prototype.enemyAppear = function() {
  var scope = this;
  this.pool.act(function(e, pool) {
    // pick a side
    var rand = Math.random(),
        posX, posY;
    if(rand < 0.25) {
      // left
      posX = 0;
      posY = LD.Utils.randomBetween(0, LD.Config.height);
    } else if(rand < 0.5) {
      // top
      posX = LD.Utils.randomBetween(0, LD.Config.width);
      posY = 0;
    } else if(rand < 0.75) {
      // right
      posX = LD.Config.width;
      posY = LD.Utils.randomBetween(0, LD.Config.height);
    } else {
      // bottom
      posX = LD.Utils.randomBetween(0, LD.Config.width);
      posY = LD.Config.height;
    }
    e.alloc(posX, posY, Math.random() < 0.75);
  });
};

// enemy die, spit big in small parts
LD.EnemiesManager.prototype.ennemyDie = function(enemy) {
  var scope = this;
  if(enemy.isBig) {
    var numParts = LD.Utils.randomBetween(2, 3);
    for(var i = 0; i < numParts; i++) {
      scope.pool.act(function(e, pool) {
        // pick a side
        var posX = enemy.x,
            posY = enemy.y;
        e.alloc(posX, posY, false, true);
      });
    }
  }
};

LD.EnemiesManager.prototype.removeAll = function() {
  this.currentLevel = false;
  for (var i = 0; i < this.enemies.length; i++) {
    if (this.enemies[i].active)
      this.enemies[i].touched({damage: 999});
  }
};