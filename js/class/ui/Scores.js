
LD.ScoresUI = {
  
  init: function() {
    this.$el = $('#scores');
    this.$p1 = this.$el.find('.p1');
    this.$p2 = this.$el.find('.p2');
    this.$p3 = this.$el.find('.p3');
    this.$p4 = this.$el.find('.p4');
    
    this.initScores();
    this.update();
  },
  
  initScores: function() {
    this.scores = [
      {p: 1, score: 0},
      {p: 2, score: 0},
      {p: 3, score: 0},
      {p: 4, score: 0}
    ];
  },
  
  pointWin: function(pNum) {
    this.scores[pNum].score++;
    this.update();
  },
  
  majPlayersNum: function(num) {
    num > 2 ? this.$p3.removeClass('hidden') : this.$p3.addClass('hidden');
    num > 3 ? this.$p4.removeClass('hidden') : this.$p4.addClass('hidden');
  },
  
  update: function() {
    // maj display
    for(var i = 0; i < 4; i++) {
      this['$p'+(i+1)].text(this.scores[i].score);
    }
    
    // sort
    var scoresT = this.scores.slice(0),
        order = [];

    while (scoresT.length > 0) {
      var best = null,
          player = null,
          index = null;
        
      for (var i = 0; i < scoresT.length; i++) {
        if (best === null || best < scoresT[i].score) {
          best = scoresT[i].score;
          player = scoresT[i].p;
          index = i;
        }
      }
      order.push(player);
      scoresT.splice(index, 1);
    }
    
    var offset = 0;
    for(var i = 0; i < order.length; i++) {
      this['$p'+order[i]].css('left', offset);
      offset += 120;
    }
  }

};
