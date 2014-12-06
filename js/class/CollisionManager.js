LD.CollisionManager = function(players, enemiesManager, bulletsManager) {
  PIXI.EventTarget.call(this);

  this.players = players;
  this.enemiesManager = enemiesManager;
  this.bulletsManager = bulletsManager;
  
  this.pC = {
    
  };
};

LD.CollisionManager.constructor = LD.CollisionManager;

LD.CollisionManager.prototype.checkCollision = function() {
  var bM = this.bulletsManager.bullets;
//  var eM = this.enemiesManager.enemies,
//      bM = this.bulletsManager.bullets,
//      i = eM.length;
//  while (i--) {
//    if (eM[i].active) {
//      var a = bM.length;
//      while (a--) { //test with bullet
//        if (bM[a].visible) {
//          if (eM[i].hitArea && !eM[i].cantTouch && eM[i].hitArea.contain(bM[a].position)) {
//            eM[i].touched(bM[a]);
//            bM[a].canRealloc();
//            this.dispatchEvent('ENEMY_TOUCHED');
//            LD.Sounds.play('bullet');
//            //console.log('ENEMY TOUCHED');
//          }
//        }
//      }
//      if (eM[i].hitArea && this.player.visible && this.player.alpha == 1 && eM[i].hitArea.intersectWith(this.player.hitArea)) {
//        eM[i].canRealloc();
//        this.player.hitEnnemy();
//        LD.Sounds.play('aie');
//        this.dispatchEvent('TOUCH_ENEMY');
//      }
//
//
//    }
//  }

  var i = this.players.length,
      j,
      p1,
      p2;
      
  while(i--) {
    // collisions between players
    j = i;
    p1 = this.players[i];
    while(j--) {
      p2 = this.players[j];
      if(p1.num !== p2.num && !p1.dead && !p2.dead) {
        var s = p1.num+'-'+p2.num;
        if(LD.Utils.circlesCollide(p1.hitArea, p2.hitArea)) {
          if(!this.pC[s]) {
            this.pC[s] = 10;
            var p1Angle = LD.Utils.angleBetween(p2.hitArea, p1.hitArea),
                p2Angle = LD.Utils.angleBetween(p1.hitArea, p2.hitArea),
                strength = 5;

            // applique xDiff + yDiff aux vitesses selon l'angle
            p1.speedX += Math.cos(p1Angle) * strength;
            p1.speedY += Math.sin(p1Angle) * strength;
            p2.speedX += Math.cos(p2Angle) * strength;
            p2.speedY += Math.sin(p2Angle) * strength;
          }
        } else {
          this.pC[s] && this.pC[s]--;
        }
      }
    }
    
    // collision with bullets
    if(!p1.dead) {
      var a = bM.length;
      while(a--) {
        if(bM[a].visible && LD.Utils.getDistance(p1.hitArea, bM[a]) <= p1.hitArea.radius) {
          p1.bulletHit(bM[a]);
          bM[a].canRealloc();
        }
      }
    }
  }
};