
(function() {
	var stage = new PIXI.Stage(0x000000);
	LD.Config = {
    width : 1200,
    height : 676,
    playerControls: [
      {
        up: LD.Controls.UP,
        down: LD.Controls.DOWN,
        left: LD.Controls.LEFT,
        right: LD.Controls.RIGHT,
        shoot: LD.Controls.CTRL
      },
      {
        up: LD.Controls.Z,
        down: LD.Controls.S,
        left: LD.Controls.Q,
        right: LD.Controls.D,
        shoot: LD.Controls.F
      }
    ]
  };
  
  LD.Config.playersPos = [
    [LD.Config.width * 0.25,LD.Config.height * 0.25],
    [LD.Config.width * 0.75, LD.Config.height * 0.7],
    [200, 500],
    [500, 200]
  ];
  
  var paused = false,
      playerNumber = 2,
      players = [],
      timeStart,
      home = document.getElementById('home'),
      playBtn = document.querySelectorAll('#home .play')[0];
  
  LD.Sounds.init();
    
	// create a renderer instance and append the view 
	var renderer = PIXI.autoDetectRenderer(LD.Config.width, LD.Config.height);
  document.getElementById('game').appendChild(renderer.view);
    
	var background, bulletsManager, enemiesManager, collisionManager;
    
  // load all needed assets
  var loader = new PIXI.AssetLoader([
    'img/background.jpg',
    'img/p1_1.png', 'img/p1_2.png', 'img/p1_3.png', 'img/p1_4.png', 'img/p1_5.png', 'img/p1_6.png', 'img/p1_7.png', 'img/p1_8.png',
    'img/p2_1.png', 'img/p2_2.png', 'img/p2_3.png', 'img/p2_4.png', 'img/p2_5.png', 'img/p2_6.png', 'img/p2_7.png', 'img/p2_8.png',
    'img/p3_1.png', 'img/p3_2.png', 'img/p3_3.png', 'img/p3_4.png', 'img/p3_5.png', 'img/p3_6.png', 'img/p3_7.png', 'img/p3_8.png',
    'img/p4_1.png', 'img/p4_2.png', 'img/p4_3.png', 'img/p4_4.png', 'img/p4_5.png', 'img/p4_6.png', 'img/p4_7.png', 'img/p4_8.png'
  ]);
  loader.onComplete = onAssetsLoaded;
	loader.load();
    
  function onAssetsLoaded() {

    background = PIXI.Sprite.fromImage('img/background.jpg');
    background.width = LD.Config.width;
    background.height = LD.Config.height;
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

    collisionManager = new LD.CollisionManager(players, enemiesManager, bulletsManager);

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
    
    players = [];
    for(var i = 0; i < playerNumber; i++) {
      players[i] = new LD.Player(i);
      stage.addChild(players[i]);
      players[i].init();
    }
    collisionManager.players = players;
    
    //enemiesManager.init();
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