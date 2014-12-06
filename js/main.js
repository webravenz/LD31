
(function() {
	var stage = new PIXI.Stage(0x000000);
	LD.Config = {
    width : 1100,
    height : 800
  };
  
  var paused = false,
      playerNumber = 2,
      players = [];

  var timeStart;
  
  LD.Sounds.init();
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(LD.Config.width, LD.Config.height);
  document.getElementById('game').appendChild(renderer.view);
    
	var background, bulletsManager, enemiesManager, collisionManager;
    
  // load all needed assets
  var loader = new PIXI.AssetLoader(['img/candy1.png', 'img/candy2.png', 'img/candy3.png', 'img/candy4.png', 'img/candy5.png', 'img/candy6.png', 'img/king.png', 'img/player.json', 'img/background.png', 'img/papasmurf.json', 'img/smurf.json', 'img/apple.png', 'img/skittle1.png', 'img/skittle2.png', 'img/skittle3.png', 'img/skittle4.png', 'img/candy-shadow.png', 'img/bolt.json']);
  loader.onComplete = onAssetsLoaded;
	loader.load();
    
  function onAssetsLoaded() {

    background = PIXI.Sprite.fromImage('img/background.png');
    stage.addChild(background);

    // ennemies
//    enemiesManager = new LD.EnemiesManager(player, gameComplete);
//    LD.enemiesManager = enemiesManager;
//    stage.addChild(enemiesManager);

//    stage.addChild(player);
//    player.init();
    
//    enemiesManager.init();

    //create the bullet Manager
//    bulletsManager = new LD.BulletsManager(players);
//    stage.addChild(bulletsManager);

//    collisionManager = new LD.CollisionManager(players, enemiesManager, bulletsManager);

    requestAnimFrame( animate );
    
    home.classList.add('show');
    
    playBtn.addEventListener('click', clickPlayHome);
    
  }

  function clickPlayHome() {
    playBtn.removeEventListener('click', clickPlayHome);
    home.classList.remove('show');
    setTimeout(function() {
      initGame();
    }, 1000);
    return false;
  }
  
  function initGame() {
    // init controls
    LD.Controls.start();
    
    enemiesManager.init();
  }
    
	function animate() {
    requestAnimFrame( animate );
    if(paused) return;
    // render the stage   
    renderer.render(stage);
    collisionManager.checkCollision();

	}
  
  // game over
  LD.showGameOver = function() {
    paused = true;
    LD.Controls.stop();
    gameOver.classList.add('show');
    
    setTimeout(function() {
      enemiesManager.removeAll();
      paused = false;
      retryBtn.addEventListener('click', clickRetry);
    }, 2000);
  };

  function clickRetry() {
    retryBtn.removeEventListener('click', clickRetry);
    initGame();
    gameOver.classList.remove('show');
    return false;
  }
  
})();