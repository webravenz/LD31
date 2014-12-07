
$(function() {
  
  var stage = new PIXI.Stage(0x000000);
  LD.Config = {
    width: 1300,
    height: 776,
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
          playBtn = document.querySelectorAll('#home .play')[0],
          gameOver = document.getElementById('game-over'),
          continueBtn = document.querySelectorAll('#game-over .continue')[0],
          menuBtn = document.querySelectorAll('#game-over .menu')[0],
          winnerText = document.querySelectorAll('#game-over h2')[0],
          gameRunning = false;

  LD.Sounds.init();
  LD.ScoresUI.init();

  // create a renderer instance and append the view 
  var renderer = PIXI.autoDetectRenderer(LD.Config.width, LD.Config.height, {transparent: true});
  document.getElementById('game').appendChild(renderer.view);

  var background, bulletsManager, enemiesManager, collisionManager, playersContainer;

  // load all needed assets
  var imgToLoad = [
    'img/background.png',
    'img/p1_1.png', 'img/p1_2.png', 'img/p1_3.png', 'img/p1_4.png', 'img/p1_5.png', 'img/p1_6.png', 'img/p1_7.png', 'img/p1_8.png',
    'img/p2_1.png', 'img/p2_2.png', 'img/p2_3.png', 'img/p2_4.png', 'img/p2_5.png', 'img/p2_6.png', 'img/p2_7.png', 'img/p2_8.png',
    'img/p3_1.png', 'img/p3_2.png', 'img/p3_3.png', 'img/p3_4.png', 'img/p3_5.png', 'img/p3_6.png', 'img/p3_7.png', 'img/p3_8.png',
    'img/p4_1.png', 'img/p4_2.png', 'img/p4_3.png', 'img/p4_4.png', 'img/p4_5.png', 'img/p4_6.png', 'img/p4_7.png', 'img/p4_8.png',
    'img/bullet.png',
    'img/enemy-big.png', 'img/enemy-big-shadow.png', 'img/enemy-small.png', 'img/enemy-small-shadow.png',
    'img-css/continue_1.png', 'img-css/continue_2.png', 'img-css/fond.jpg', 'img-css/logo.png', 'img-css/menu_1.png', 'img-css/menu_2.png', 'img-css/plateforme1.png', 'img-css/plateforme2.png',  'img-css/plateforme3.png',  'img-css/plateforme4.png',  'img-css/play_1.png',  'img-css/play_2.png',
    //'img-css/overlay.png'
  ];
  var imgLoaded = 0;
  
  var loader = new PIXI.AssetLoader(imgToLoad);
  loader.onComplete = onAssetsLoaded;
  
  loader.onProgress = function() {
    imgLoaded++;
    $('.body-loading .bar span').css('width', ((imgLoaded / imgToLoad.length) * 100)+'%');
  };
  
  loader.load();
  
  // player number chose
  $('.players-num input').on('change', updatePlayerNumber);
  
  function updatePlayerNumber() {
    playerNumber = $('.players-num input:checked').val();
    $('.controls-info .p3').css('visibility', playerNumber >= 3 ? 'visible' : 'hidden');
    $('.controls-info .p4').css('visibility', playerNumber >= 4 ? 'visible' : 'hidden');
    LD.ScoresUI.majPlayersNum(playerNumber);
  }
  
  updatePlayerNumber();

  function onAssetsLoaded() {
    
    $('body').addClass('loaded');

    background = PIXI.Sprite.fromImage('img/background.png');
    background.width = 1200;
    background.height = 676;
    background.position.x = 50;
    background.position.y = 50;
    stage.addChild(background);

    playersContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(playersContainer);

    // ennemies
    enemiesManager = new LD.EnemiesManager();
    LD.enemiesManager = enemiesManager;
    stage.addChild(enemiesManager);

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
    LD.Sounds.play('start');
    
    setTimeout(function() {
      
      // init controls
      LD.Controls.start();

      playersContainer.removeChildren();

      players = [];
      for (var i = 0; i < playerNumber; i++) {
        players[i] = new LD.Player(i, playerShoot);
        playersContainer.addChild(players[i]);
        players[i].init();
      }
      collisionManager.players = players;

      bulletsManager.removeAll();

      gameRunning = true;

      enemiesManager.init();
      
    }, 1000);
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
    
    // check victory
    if(gameRunning) {
      var numLiving = 0,
          pNum = 0;
      for(var i = 0; i < playerNumber; i++) {
        if(!players[i].dead) {
          numLiving++;
          pNum = players[i].num + 1;
        }
      }
      if(numLiving < 2) {
        gameRunning = false;
        enemiesManager.stop();
        LD.showGameOver(pNum);
      }
    }
  }
  
  function playerShoot(player) {
    bulletsManager.shoot(player.x, player.y, player.currentFrame);
  }

  // game over
  LD.showGameOver = function(winner) {
    gameOver.classList.add('show');
    enemiesManager.removeAll();
    
    winnerText.innerHTML = 'Player '+winner+' win !';
    
    LD.ScoresUI.pointWin(winner - 1);
    
    continueBtn.addEventListener('click', clickContinue);
    menuBtn.addEventListener('click', clickMenu);
  };

  function clickContinue() {
    continueBtn.removeEventListener('click', clickContinue);
    menuBtn.removeEventListener('click', clickMenu);
    gameOver.classList.remove('show');
    playersContainer.removeChildren();
    players = [];
    initGame();
    return false;
  }

  function clickMenu() {
    continueBtn.removeEventListener('click', clickContinue);
    menuBtn.removeEventListener('click', clickMenu);
    gameOver.classList.remove('show');
    home.classList.add('show');
    playersContainer.removeChildren();
    players = [];
    playBtn.addEventListener('click', clickPlayHome);
    LD.ScoresUI.initScores();
    LD.ScoresUI.update();
    return false;
  }
  
  
  // son btn
  var $sonBtn = $('#son-btn'),
      sonMuted = localStorage.getItem('muted');
    
  if(sonMuted === 'false') sonMuted = false;
  
  function majSoundState() {
    if(sonMuted) {
      LD.Sounds.mute();
      $('#son-btn').addClass('muted');
    } else {
      LD.Sounds.unMute();
      $('#son-btn').removeClass('muted');
    }
  }
  
  majSoundState();
  
  $sonBtn.on('click', function() {
    sonMuted = !sonMuted;
    localStorage.setItem('muted', sonMuted);
    majSoundState();
  });
  
  // credits
  $('#credits-btn, #credits .close').on('click', function() {
    $('#credits').toggleClass('show');
    return false;
  });
  
});