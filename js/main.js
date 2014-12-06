
(function() {
  var stage = new PIXI.Stage(0x000000);
  LD.Config = {
    width: 1200,
    height: 676,
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
      },
      {
        up: LD.Controls.I,
        down: LD.Controls.K,
        left: LD.Controls.J,
        right: LD.Controls.L,
        shoot: LD.Controls.M
      },
      {
        up: LD.Controls.N8,
        down: LD.Controls.N5,
        left: LD.Controls.N4,
        right: LD.Controls.N6,
        shoot: LD.Controls.PLUS
      }
    ]
  };

  LD.Config.playersPos = [
    [LD.Config.width * 0.25, LD.Config.height * 0.25],
    [LD.Config.width * 0.75, LD.Config.height * 0.7],
    [LD.Config.width * 0.25, LD.Config.height * 0.7],
    [LD.Config.width * 0.75, LD.Config.height * 0.25]
  ];

  var paused = false,
          playerNumber = 4,
          players = [],
          timeStart,
          home = document.getElementById('home'),
          playBtn = document.querySelectorAll('#home .play')[0];

  LD.Sounds.init();

  // create a renderer instance and append the view 
  var renderer = PIXI.autoDetectRenderer(LD.Config.width, LD.Config.height, {transparent: true});
  document.getElementById('game').appendChild(renderer.view);

  var background, bulletsManager, enemiesManager, collisionManager, playersContainer;

  // load all needed assets
  var loader = new PIXI.AssetLoader([
    'img/background.png',
    'img/p1_1.png', 'img/p1_2.png', 'img/p1_3.png', 'img/p1_4.png', 'img/p1_5.png', 'img/p1_6.png', 'img/p1_7.png', 'img/p1_8.png',
    'img/p2_1.png', 'img/p2_2.png', 'img/p2_3.png', 'img/p2_4.png', 'img/p2_5.png', 'img/p2_6.png', 'img/p2_7.png', 'img/p2_8.png',
    'img/p3_1.png', 'img/p3_2.png', 'img/p3_3.png', 'img/p3_4.png', 'img/p3_5.png', 'img/p3_6.png', 'img/p3_7.png', 'img/p3_8.png',
    'img/p4_1.png', 'img/p4_2.png', 'img/p4_3.png', 'img/p4_4.png', 'img/p4_5.png', 'img/p4_6.png', 'img/p4_7.png', 'img/p4_8.png',
    'img/bullet.png'
  ]);
  loader.onComplete = onAssetsLoaded;
  loader.load();
  
  // player number chose
  $('.players-num input').on('change', updatePlayerNumber);
  
  function updatePlayerNumber() {
    playerNumber = $('.players-num input:checked').val();
    $('.controls-info .p3').css('visibility', playerNumber >= 3 ? 'visible' : 'hidden');
    $('.controls-info .p4').css('visibility', playerNumber >= 4 ? 'visible' : 'hidden');
  }
  
  updatePlayerNumber();

  function onAssetsLoaded() {

    background = PIXI.Sprite.fromImage('img/background.png');
    background.width = LD.Config.width;
    background.height = LD.Config.height;
    stage.addChild(background);

    playersContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(playersContainer);

    // ennemies
//    enemiesManager = new LD.EnemiesManager(player, gameComplete);
//    LD.enemiesManager = enemiesManager;
//    stage.addChild(enemiesManager);

//    enemiesManager.init();

    //create the bullet Manager
    bulletsManager = new LD.BulletsManager();
    stage.addChild(bulletsManager);

    collisionManager = new LD.CollisionManager(players, enemiesManager, bulletsManager);

    requestAnimFrame(animate);

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
    for (var i = 0; i < playerNumber; i++) {
      players[i] = new LD.Player(i, playerShoot);
      playersContainer.addChild(players[i]);
      players[i].init();
    }
    collisionManager.players = players;

    //enemiesManager.init();
  }

  function animate() {
    requestAnimFrame(animate);
    if (paused)
      return;
    // render the stage   
    renderer.render(stage);
    collisionManager.checkCollision();

    // players zindex
    var base = players.slice(0),
            ordered = [];
    while (base.length > 0) {
      var next = null,
              index = null;
      for (var i = 0; i < base.length; i++) {
        if (next === null || next.y > base[i].y) {
          next = base[i];
          index = i;
        }
      }
      ordered.push(next);
      base.splice(index, 1);
    }
    
    var i = ordered.length;
    while(i--) {
      playersContainer.setChildIndex(ordered[i], i);
    }
  }
  
  function playerShoot(player) {
    bulletsManager.shoot(player.x, player.y, player.currentFrame);
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