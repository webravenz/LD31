
LD.PlayerUI = {
  
  init: function() {
    this.el = document.getElementById('player-ui');
    this.bar = document.querySelectorAll('#player-ui .bar > div')[0];
  },

  show: function() {
    this.el.classList.add('show');
  },

  hide: function() {
    this.el.classList.remove('show');
  },

  majBar: function(percent) {
    this.bar.style.width = percent+'%';
  }

};
