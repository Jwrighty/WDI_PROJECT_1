var kungfu = kungfu || {};

// Keyboard arrows to move the character div class and animation
kungfu.selectTop = function selectTop() {
  this.$character.children().removeClass();
  this.$topDiv.attr('class', 'selected');
  this.$character.css('background', 'url("./images/karate_char_high.png") no-repeat');
};

kungfu.selectMidRight = function selectMidRight() {
  this.$character.children().removeClass();
  this.$midDiv.attr('class', 'selected');
  this.$character.css('background', 'url("./images/karate_char_mid.png") no-repeat');
};

kungfu.selectMidLeft = function selectMidLeft() {
  this.$character.children().removeClass();
  this.$midDiv.attr('class', 'selected');
  this.$character.css('background', 'url("./images/karate_char_left.png") no-repeat');
};

kungfu.selectBottom = function selectBottom() {
  this.$character.children().removeClass();
  this.$botDiv.attr('class', 'selected');
  this.$character.css('background', 'url("./images/karate_char_low.png") no-repeat');
};

kungfu.returnStance = function returnStance() {
  this.$character.css('background', 'url("./images/karate_char_stand.png") no-repeat');
  this.$character.children().removeClass();
};

// TRIGGERS THE MOVE CLASS FUNCTIONS ON KEY PRESS
kungfu.selectSwitch = function(e) {
  switch(e.which) {
    case 37: if (this.$playerState === 'alive') {
      this.selectMidLeft();
      // const punch = new Audio('Sounds/punch.wav');
      // punch.loop = false;
      // punch.play();
    }
      break;
    case 38: if (this.$playerState === 'alive') {
      this.selectTop();
      // new Audio('Sounds/punch.wav').play();
    }
      break;
    case 39: if (this.$playerState === 'alive') {
      this.selectMidRight();
      // new Audio('Sounds/punch.wav').play();
    }
      break;
    case 40: if (this.$playerState === 'alive') {
      this.selectBottom();
      // new Audio('Sounds/Realistic_Punch-Mark_DiAngelo-1609462330.wav').play();
    }
      break;
    default: return;
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
};
$(document).keydown(kungfu.selectSwitch.bind(kungfu));
// RESETS THE CHARACTER STANCE ON KEYUP

kungfu.returnSwitch = function(e) {
  switch(e.which) {
    case 37: if (this.$playerState === 'alive') {
      this.returnStance();
    }
      break;
    case 38: if (this.$playerState === 'alive') {
      this.returnStance();
    }
      break;
    case 39: if (this.$playerState === 'alive') {
      this.returnStance();
    }
      break;
    case 40: if (this.$playerState === 'alive') {
      this.returnStance();
    }
      break;
    default: return;
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
};

$(document).keyup(kungfu.returnSwitch.bind(kungfu));

// SELECT A RANDOM PATH
kungfu.reset = function reset() {
  this.$playerState = 'alive';
  this.$score = 0;
  this.returnStance();
};

kungfu.setHighScore = function setHighScore() {
  if (this.$score > this.highScore) {
    this.highScore = parseInt(this.$score);
    localStorage.setItem('highScore', this.highScore);
  }
  this.$hsInput.text(this.highScore);
};

kungfu.gameOver = function gameOver() {
  clearInterval(this.gameInterval);
  this.setHighScore();
  this.$overlay.delay(200).fadeIn(1000);
  this.$character.css('background', 'url("./images/karate_char_dead.png")');
  this.$button.html('You scored: ' + this.$score +  ' </br>Go again?');
  this.$button.animate({ opacity: 1 }, function(){
    $(this.$button).css('visibility', 'visible');
  });
  new Audio('./Sounds/Pain-SoundBible.com-1883168362.wav').play();
};

// CHECK IF PLAYER SELECTED THE CORRECT LANE
kungfu.checkCollision = function checkCollision($lane) {
  if ($lane === '.pathTop') {
    if (this.$topDiv.hasClass('selected') && this.$playerState === 'alive') {
      this.$score++;
      this.$scoreInput.text(this.$score);
      this.$playerState = 'alive';
      new Audio('./Sounds/Explosion+1.wav').play();
    } else {
      this.$playerState = 'dead';
      this.gameOver();
    }
  } else if ($lane === '.pathMid') {
    if (this.$midDiv.hasClass('selected') && this.$playerState === 'alive'){
      this.$score++;
      this.$scoreInput.text(this.$score);
      this.$playerState = 'alive';
      new Audio('./Sounds/Explosion+1.wav').play();
    } else {
      this.$playerState = 'dead';
      this.gameOver();
    }
  } else {
    if (this.$botDiv.hasClass('selected') && this.$playerState === 'alive'){
      this.$score++;
      this.$scoreInput.text(this.$score);
      this.$playerState = 'alive';
      new Audio('./Sounds/Explosion+1.wav').play();
    } else {
      this.$playerState = 'dead';
      this.gameOver();
    }
  }
};

// ANIMATION
kungfu.moveObject = function moveObject($lane, $bomb, deadDirection, direction) {
  const $flyTime = Math.floor(Math.random() * ((2000-1500)+1) + 1500);
  $bomb.animate(direction, {
    duration: $flyTime,
    step: function() {
      if (this.$playerState === 'dead') {
        $bomb.stop().animate(deadDirection, 4000);
      }
    },
    easing: 'linear',
    done: function() {
      $(this).css('background-image', 'url("./images/explosion.gif")');
      kungfu.checkCollision($lane);
      setTimeout(function() {
        $bomb.remove();
      }, 300);
    }
  });
};

kungfu.randomFrom = function randomFrom(array) {
  return array[Math.floor(Math.random() * (array.length))];
};

// CLONES A NEW ELEMENT AND INSERTS INTO RANDOM LANE, FIRES ANIMATION
kungfu.createObject = function createObject() {
  const $lane = this.randomFrom(this.$laneArray);
  const $styleChoice = this.randomFrom(this.$styleArray);
  const $bomb = $('.bomb').clone().attr('class', $styleChoice).appendTo($lane);
  if ($bomb.hasClass('bombRight')) {
    this.moveObject($lane, $bomb, {right: '980px'}, {right: '360px'});
  } else {
    this.moveObject($lane, $bomb, {left: '980px'}, {left: '340px'});
  }
};

kungfu.startGame = function startGame () {
  this.$overlay.delay(200).fadeOut(1000);
  this.reset();
  this.$button.animate({ opacity: 0 }, 1000, function(){
    $(this.$button).css('visibility', 'hidden');
  });
  this.$instructions.animate({ opacity: 0 }, 1500, function(){
    $(this.$instructions).css('visibility', 'hidden');
  });
  this.$scoreInput.text(this.$score);
  this.$hsInput.text(this.highScore);
  this.$button.text('Go!');
  this.gameInterval = setInterval(kungfu.runI, kungfu.speed);
  this.getSpeed = function getSpeed() {
    if (this.$score <=5 ){
      return this.speed =  1800;
    } else if (this.$score <=15){
      return this.speed = 1400;
    } else if (this.$score <= 25) {
      return this.speed = 1000;
    } else if (this.$score <= 35) {
      return this.speed = 800;
    } else if (this.$score <= 50) {
      return this.speed = 650;
    } else if (this.$score <= 60) {
      return this.speed = 500;
    }
  };
  this.getSpeed();
  this.runI = function runI() {
    kungfu.createObject();
    kungfu.getSpeed();
    clearInterval(kungfu.gameInterval);
    kungfu.gameInterval = setInterval(kungfu.runI, kungfu.speed);
  };
  this.runI();
};

kungfu.setup = function setup(){
  this.$topDiv = $('#topDiv');
  this.$midDiv = $('#midDiv');
  this.$botDiv = $('#botDiv');
  this.$laneArray = ['.pathTop', '.pathMid', '.pathBot'];
  this.$styleArray = ['bombRight', 'bombLeft'];
  this.$overlay = $('.overlay');
  this.$character = $('.character');
  this.$hsInput = $('.highScore span');
  this.$scoreInput = $('.score span');
  this.$instructions = $('.instructions');
  this.$button = $('button');
  this.highScore = localStorage.getItem('highScore') || 0;
  this.speed = 2000;
  this.gameInterval = null;
  this.$playerState =  'alive';
  this.$score = 0;
  this.$hsInput.text(this.highscore);


  // START THE GAME
  this.$button.on('click', this.startGame.bind(kungfu));
};

$(kungfu.setup.bind(kungfu));
