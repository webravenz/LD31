
LD.Sounds = {
  
  url: 'sound/',
  formats: ["wav"],

  init: function() {
    this.create('bullet', 20);
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
