
LD.Sounds = {
  
  url: 'sound/',
  formats: ["mp3"],

  init: function() {
    this.create('bullet', 10);
    this.create('aie', 2);
    this.create('candyfall', 10);
    this.create('jump', 1);
    this.create('fire', 1);
    this.create('king', 1);
    this.create('apple', 1);
    this.create('smurf', 1);
  },

  play: function(name) {
    this[name][this[name+'Pointer']].play();
    this[name+'Pointer']++;
    if(this[name+'Pointer'] == this[name].length) this[name+'Pointer'] = 0;
  },

  create: function(name, count) {
    this[name] = [];
    for(var i = 0; i < count; i++) {
      this[name].push(new buzz.sound(this.url+name, {
        formats: this.formats
      }));
    }
    this[name+'Pointer'] = 0;
    return ;
  }

};
