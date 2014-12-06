
LD.BossUI = {
  
  init: function() {
    this.el = document.getElementById('boss-ui');
    this.bar = document.querySelectorAll('#boss-ui .bar > div')[0];
    this.name = document.querySelectorAll('#boss-ui .name')[0];
    this.bubble = document.querySelectorAll('#boss-ui .bubble')[0];
  },

  show: function() {
    this.el.classList.add('show');
  },

  hide: function() {
    this.el.classList.remove('show');
  },

  setName: function(name) {
    this.name.innerHTML = name;
  },

  showBubble: function(text) {
    this.bubble.innerHTML = text;
    this.bubble.classList.add('show');
  },

  hideBubble: function() {
    this.bubble.classList.remove('show');
  },

  majBar: function(percent) {
    this.bar.style.width = percent+'%';
  }

};
