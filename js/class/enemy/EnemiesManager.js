LD.EnemiesManager = function(player, callbackEnd) {
    PIXI.DisplayObjectContainer.call( this );

    this.player = player;
    this.callbackEnd = callbackEnd;
    
    this.enemies = [];


    this.currentLevel = false;
};

LD.EnemiesManager.constructor = LD.EnemiesManager;
LD.EnemiesManager.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );


LD.EnemiesManager.prototype.init = function() {
  this.createPool('Magic', 'magic', 30);
  this.createPool('Smurf', 'smurf', 20);
  this.createPool('Skittle', 'skittle', 30);
  this.createPool('CandyShadow', 'candyShadow', 30);
  this.createPool('Candy', 'candy', 30);

  this.papaSmurf = new LD.PapaSmurf();
  this.enemies.push(this.papaSmurf);

  this.apple = new LD.Apple();
  this.enemies.push(this.apple);

  this.king = new LD.King();
  this.enemies.push(this.king);
};

LD.EnemiesManager.prototype.createPool = function(className, varName, number) {
    var tmpEnemies = [];
    this[varName] = [];
    while(number--) {
        var e = new LD[className]();
        if(className == 'Candy') {
          this.stage.addChild(e);
        } else {
          this.addChild(e);
        }
        this[varName].push(e);
        tmpEnemies.push(e);
        this.enemies.push(e);
    }
    this[varName+'Pool'] = new LD.Pool(tmpEnemies);
};

LD.EnemiesManager.prototype.updateTransform = function() {
    var scope = this;
    
    switch(this.currentLevel) {
        case 1 :
            // --------------------- level 1 actions ----------------------

            // attack
            if(this.timerAttack <= 0) {
                this.papaSmurfAttack();
                this.timerAttack = LD.Utils.randomBetween(90, 180);
            }

            // smurfs
            if(this.timerAppear <= 0) {
                this.smurfWave();
                this.timerAppear = LD.Utils.randomBetween(240, 300);
            }

            // check death
            if(this.papaSmurf.dying) {
                this.currentLevel = false;
                LD.BossUI.hide();
                // destroy smurfs
                for(var i = 0; i < this.smurf.length; i++) {
                    if(this.smurf[i].active) this.smurf[i].touched({damage: 100});
                }

                this.player.canShoot = false;

                setTimeout(function() {
                    scope.initLevel2();
                }, 5000);
            }
            break;

        case 2 :
            // --------------------- level 2 actions ----------------------

            // attack
            if(this.timerAttack <= 0) {
                this.apple.jump();
                this.timerAttack = LD.Utils.randomBetween(150, 250);
            }

            // wave
            if(this.apple.jumpComplete) {
                this.skittleWave();
                this.apple.jumpComplete = false;
            }

            // check death
            if(this.apple.dying) {
                this.currentLevel = false;
                LD.BossUI.hide();
                // destroy skittles
                for(var i = 0; i < this.skittle.length; i++) {
                    if(this.skittle[i].active) this.skittle[i].touched({damage: 100});
                }

                this.player.canShoot = false;

                setTimeout(function() {
                    scope.initLevel3();
                }, 5000);
            }

            break;

        case 3 :
            // --------------------- level 3 actions ----------------------

            // attack
            if(this.timerAttack <= 0) {
                this.candyDrop();
                this.timerAttack = LD.Utils.randomBetween(10, 30);
            }

            // check death
            if(this.king.dying) {
                this.currentLevel = false;
                LD.BossUI.hide();
                // destroy candies
                for(var i = 0; i < this.candyShadow.length; i++) {
                    if(this.candyShadow[i].active) this.candyShadow[i].canRealloc();
                }
                for(var i = 0; i < this.candy.length; i++) {
                    if(this.candy[i].active) this.candy[i].canRealloc();
                }

                this.callbackEnd();
            }

            break;
    }

    this.timerAttack--;
    this.timerAppear--;
    
    PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
};

LD.EnemiesManager.prototype.initLevel1 = function() {
    var scope = this;

    scope.player.canShoot = false;

    this.addChild(this.papaSmurf);
    this.papaSmurf.alloc();

    this.timerAttack = 420;
    this.timerAppear = 460;
    this.currentLevel = 1;

    // show boss UI
    setTimeout(function() {
        LD.BossUI.setName('Papa Smurf');
        LD.BossUI.show();
    }, 2000);

    
    // show bubble
    setTimeout(function() {
        LD.BossUI.showBubble('You shall not scroll !');
        LD.Sounds.play('smurf');
    }, 3000);

    // hide bubble
    setTimeout(function() {
        LD.BossUI.hideBubble();
        scope.papaSmurf.canMove = true;
        scope.player.canShoot = true;
    }, 6000);
};

LD.EnemiesManager.prototype.papaSmurfAttack = function() {
    LD.Sounds.play('fire');
    var nbEnemies = LD.Utils.randomBetween(2, 3);
    while(nbEnemies--) {
        this.magicPool.act(function(e, pool) {
            e.alloc();
        });
    }
};

LD.EnemiesManager.prototype.smurfWave = function() {
    var scope = this;
    var nbEnemies = LD.Utils.randomBetween(4, 6);
    var n = nbEnemies;
    var i = 0;
    while(nbEnemies--) {
        this.smurfPool.act(function(e, pool) {
            e.alloc();
            var ratio = LD.Utils.randomBetween(0, 1, true);
            var part = (LD.Config.height - 160) / n;
            e.position.y = (part * i) + (part * ratio) + 80;
            scope.addChild(e);
            i++;
        });
    }
    scope.addChild(scope.papaSmurf);
};

LD.EnemiesManager.prototype.initLevel2 = function() {
    var scope = this;

    scope.player.canShoot = false;

    this.addChild(this.apple);
    this.apple.alloc();

    this.timerAttack = 420;
    this.currentLevel = 2;

    // show boss UI
    setTimeout(function() {
        LD.BossUI.setName('Big Chomped Apple');
        LD.BossUI.show();
    }, 2000);

    
    // show bubble
    setTimeout(function() {
        LD.BossUI.showBubble('My revolutionnary Skittles 5S will destroy you !');
        LD.Sounds.play('apple');
    }, 3000);

    // hide bubble
    setTimeout(function() {
        LD.BossUI.hideBubble();
        scope.player.canShoot = true;
    }, 6000);
};

LD.EnemiesManager.prototype.skittleWave = function() {
    var nbEnemies = LD.Utils.randomBetween(3, 5);
    while(nbEnemies--) {
        this.skittlePool.act(function(e, pool) {
            e.alloc();
        });
    }
};

LD.EnemiesManager.prototype.initLevel3 = function() {
    var scope = this;

    scope.player.canShoot = false;

    this.addChild(this.king);
    this.king.alloc();

    this.timerAttack = 420;
    this.currentLevel = 3;

    // show boss UI
    setTimeout(function() {
        LD.BossUI.setName('The King');
        LD.BossUI.show();
    }, 2000);

    
    // show bubble
    setTimeout(function() {
        LD.BossUI.showBubble('Candies ... Candies ... CANDIES everywhere !');
        LD.Sounds.play('king');
    }, 3000);

    // hide bubble
    setTimeout(function() {
        LD.BossUI.hideBubble();
        scope.player.canShoot = true;
    }, 6000);
};

LD.EnemiesManager.prototype.candyDrop = function() {
  var scope = this;
  this.candyShadowPool.act(function(e, pool) {
    e.alloc(scope.player.position);
    scope.candyPool.act(function(e2, pool2) {
      e2.alloc(e);
    });
  });
};

LD.EnemiesManager.prototype.removeAll = function() {
  this.currentLevel = false;
  for(var i = 0; i < this.enemies.length; i++) {
    if(this.enemies[i].active) this.enemies[i].canRealloc();
  }
};