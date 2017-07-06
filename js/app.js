$(init);
function init(){
  const $topDiv = $('#topDiv');
  const $midDiv = $('#midDiv');
  const $botDiv = $('#botDiv');
  const $laneArray = ['.pathTop', '.pathMid', '.pathBot'];
  const $styleArray = ['bombRight', 'bombLeft'];
  const $overlay = $('.overlay');
  const $character = $('.character');
  const $hsInput = $('.highScore span');
  const $scoreInput = $('.score span');
  const $button = $('button');
  let highScore = localStorage.getItem('highScore') || 0;
  let speed = 2000;
  let gameInterval = null;
  let $playerState =  'alive';
  let $score = 0;
  $hsInput.text(highScore);

  // START THE GAME
  $button.on('click', startGame);

  // Keyboard arrows to move the character div class and animation
  function selectTop() {
    $character.children().removeClass();
    $topDiv.attr('class', 'selected');
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_high.png) no-repeat');
  }

  function selectMidRight() {
    $character.children().removeClass();
    $midDiv.attr('class', 'selected');
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_mid.png) no-repeat');
  }
  function selectMidLeft() {
    $character.children().removeClass();
    $midDiv.attr('class', 'selected');
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_left.png) no-repeat');
  }

  function selectBottom() {
    $character.children().removeClass();
    $botDiv.attr('class', 'selected');
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_low.png) no-repeat');
  }

  function returnStance() {
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_stand.png) no-repeat');
    $character.children().removeClass();
  }

  // TRIGGERS THE MOVE CLASS FUNCTIONS ON KEY PRESS
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: if ($playerState === 'alive') {
        selectMidLeft();
      }
      break;
      case 38: if ($playerState === 'alive') {
        selectTop();
      }
      break;
      case 39: if ($playerState === 'alive') {
        selectMidRight();
      }
      break;
      case 40: if ($playerState === 'alive') {
        selectBottom();
      }
      break;
      default: return;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  // RESETS THE CHARACTER STANCE ON KEYUP
  $(document).keyup(function(e) {
    switch(e.which) {
      case 37: if ($playerState === 'alive') {
        returnStance();
      }
      break;
      case 38: if ($playerState === 'alive') {
        returnStance();
      }
      break;
      case 39: if ($playerState === 'alive') {
        returnStance();
      }
      break;
      case 40: if ($playerState === 'alive') {
        returnStance();
      }
      break;
      default: return;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  function startGame () {
    $overlay.delay(200).fadeOut(1000);
    reset();
    $button.animate({ opacity: 0 }, 1000, function(){
      $button.css('visibility', 'hidden');
    });
    $('.instructions').animate({ opacity: 0 }, 1500, function(){
      $('.instructions').css('visibility', 'hidden');
    });
    $scoreInput.text($score);
    $hsInput.text(highScore);
    $button.text('Go!');
    gameInterval = setInterval(runI, speed);
    function runI() {
      createObject();
      getSpeed();
      clearInterval(gameInterval);
      gameInterval = setInterval(runI, speed);
      // checkIValue();
    }

    function getSpeed() {
      if ($score <=5 ){
        return speed =  1800;
      } else if ($score <=15){
        return speed = 1400;
      } else if ($score <= 25) {
        return speed = 1000;
      } else if ($score <= 35) {
        return speed = 800;
      } else if ($score <= 50) {
        return speed = 650;
      } else if ($score <= 60) {
        return speed = 500;
      }
    }
  }

  // SELECT A RANDOM PATH
  function randomFrom(array) {
    return array[Math.floor(Math.random() * (array.length))];
  }

  // CLONES A NEW ELEMENT AND INSERTS INTO RANDOM LANE, FIRES ANIMATION
  function createObject() {
    const $lane = randomFrom($laneArray);
    const $styleChoice = randomFrom($styleArray);
    const $bomb = $('.bomb').clone().attr('class', $styleChoice).appendTo($lane);
    if ($bomb.hasClass('bombRight')) {
      moveObject($lane, $bomb, {right: '980px'}, {right: '360px'});
    } else {
      moveObject($lane, $bomb, {left: '980px'}, {left: '340px'});
    }
  }

  // ANIMATION
  function moveObject($lane, $bomb, deadDirection, direction) {
    const $flyTime = Math.floor(Math.random() * ((2000-1500)+1) + 1500);
    $bomb.animate(direction, {
      duration: $flyTime,
      step: function() {
        if ($playerState === 'dead') {
          $bomb.stop().animate(deadDirection, 4000);
        }
      },
      easing: 'linear',
      done: function() {
        $(this).css('background-image', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/explosion.gif)');
        checkCollision($lane);
        setTimeout(function() {
          $bomb.remove();
        }, 300);
      }
    });
  }

  // CHECK IF PLAYER SELECTED THE CORRECT LANE
  function checkCollision($lane) {
    if ($lane === '.pathTop') {
      if ($topDiv.hasClass('selected') && $playerState === 'alive') {
        $score++;
        $scoreInput.text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        gameOver();
      }
    } else if ($lane === '.pathMid') {
      if ($midDiv.hasClass('selected') && $playerState === 'alive'){
        $score++;
        $scoreInput.text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        gameOver();
      }
    } else {
      if ($botDiv.hasClass('selected') && $playerState === 'alive'){
        $score++;
        $scoreInput.text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        gameOver();
      }
    }
  }

  function gameOver() {
    clearInterval(gameInterval);
    setHighScore();
    $overlay.delay(200).fadeIn(1000);
    $character.css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_dead.png)');
    $button.html('You scored: ' + $score +  ' </br>Go again?');
    $button.animate({ opacity: 1 }, function(){
      $button.css('visibility', 'visible');
    });
  }

  function setHighScore() {

    if ($score > highScore) {
      highScore = parseInt($score);
      localStorage.setItem('highScore', highScore);
    }
    $hsInput.text(highScore);
  }

  function reset() {
    $playerState = 'alive';
    $score = 0;
    returnStance();
  }

}
