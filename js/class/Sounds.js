
LD.Sounds = {
  
  url: 'sound/',

  init: function() {
    this.create('bullet', 20, {
      formats: ['wav'],
      volume: 60,
      preload: true
    });
    this.create('asteroide', 20, {
      formats: ['wav'],
      volume: 70,
      preload: true
    });
    this.create('start', 5, {
      formats: ['wav'],
      volume: 80,
      preload: true
    });
    this.create('mort', 10, {
      formats: ['wav'],
      volume: 80,
      preload: true
    });
    this.create('ambiance', 1, {
      formats: ['mp3'],
      volume: 30,
      loop: true,
      autoplay: true
    });
  },

  play: function(name) {
    this[name][this[name+'Pointer']].play();
    this[name+'Pointer']++;
    if(this[name+'Pointer'] == this[name].length) this[name+'Pointer'] = 0;
  },

  create: function(name, count, options) {
    this[name] = [];
    for(var i = 0; i < count; i++) {
      this[name].push(new buzz.sound(this.url+name, options));
    }
    this[name+'Pointer'] = 0;
    return ;
  },
  
  mute: function() {
    for(var i in buzz.sounds) {
      buzz.sounds[i].mute();
    }
  },
  
  unMute: function() {
    for(var i in buzz.sounds) {
      buzz.sounds[i].unmute();
    }
  }

};
