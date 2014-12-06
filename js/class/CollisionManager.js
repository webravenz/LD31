LD.CollisionManager = function(player, enemiesManager, bulletsManager) {
    PIXI.EventTarget.call( this );
    
    this.player = player;
    this.enemiesManager = enemiesManager;
    this.bulletsManager = bulletsManager;
};
 
LD.CollisionManager.constructor = LD.CollisionManager;

LD.CollisionManager.prototype.checkCollision= function() {
    var eM =this.enemiesManager.enemies,
        bM =this.bulletsManager.bullets,
        i = eM.length;
    while(i--) {
        if(eM[i].active) {
            var a = bM.length;
            while(a--) { //test with bullet
                if(bM[a].visible) {
                    if(eM[i].hitArea && !eM[i].cantTouch && eM[i].hitArea.contain(bM[a].position)) {
                        eM[i].touched(bM[a]);
                        bM[a].canRealloc();
                        this.dispatchEvent('ENEMY_TOUCHED');
                        LD.Sounds.play('bullet');
                        //console.log('ENEMY TOUCHED');
                    }
                }
            }
            if(eM[i].hitArea && this.player.visible && this.player.alpha == 1 && eM[i].hitArea.intersectWith(this.player.hitArea)) {
                eM[i].canRealloc();
                this.player.hitEnnemy();
                LD.Sounds.play('aie');
                this.dispatchEvent('TOUCH_ENEMY');
            }
            
            
        }
    }
};