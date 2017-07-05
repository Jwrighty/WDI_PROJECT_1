$(init);

function init(){

  const $topDiv = $('#topDiv');
  const $midDiv = $('#midDiv');
  const $botDiv = $('#botDiv');
  let $playerState =  'alive';
  let $score = 0;
  const $laneArray = ['.pathTop', '.pathMid', '.pathBot'];
  const $styleArray = ['daggerStyle', 'daggerStyle2'];
  let speed = 2000;
  let gameInterval = null;
  let counter = 0;
  const $overlay = $('.overlay');



  // Keyboard arrows to move the character div class
  function selectTop() {
    $('.character').children().removeClass();
    $topDiv.attr('class', 'selected');
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_high.png) no-repeat');
  }

  function selectMidRight() {
    $('.character').children().removeClass();
    $midDiv.attr('class', 'selected');
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_mid.png) no-repeat');
  }
  function selectMidLeft() {
    $('.character').children().removeClass();
    $midDiv.attr('class', 'selected');
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_left.png) no-repeat');
  }

  function selectBottom() {
    $('.character').children().removeClass();
    $botDiv.attr('class', 'selected');
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_low.png) no-repeat');
  }

  function returnStance() {
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_stand.png) no-repeat');
    $('.character').children().removeClass();
  }

  function gameOver() {
    clearInterval(gameInterval);
    $overlay.delay(200).fadeIn(1000);
    $('.character').css('background', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/karate_char_dead.png)');
    $('button').html('You scored: ' + $score +  ' </br>Go again?');
    $('button').animate({ opacity: 1 }, function(){
      $('button').css('visibility', 'visible');
    });
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

  // START THE GAME
  $('button').on('click', startGame);

  // SELECT A RANDOM PATH
  function randomFrom(array) {
    return array[Math.floor(Math.random() * (array.length))];
  }

  // CLONES A NEW ELEMENT AND INSERTS INTO RANDOM LANE, FIRES ANIMATION
  function createObject() {
    const $lane = randomFrom($laneArray);
    const $styleChoice = randomFrom($styleArray);
    // console.log($styleChoice);
    const $bomb = $('.dagger').clone().attr('class', $styleChoice).appendTo($lane);
    if ($bomb.hasClass('daggerStyle')) {
      moveObjectRight($lane, $bomb);
    } else {
      moveObjectLeft($lane, $bomb);
    }
  }

  // ANIMATION
  function moveObjectRight($lane, $bomb) {
    const $flyTime = Math.floor(Math.random() * ((2000-1500)+1) + 1500);
    $bomb.animate({right: '370px'}, {
      duration: $flyTime,
      step: function() {
        if ($playerState === 'dead') {
          $bomb.stop().animate({right: '980px'}, 4000);
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

  function moveObjectLeft($lane, $bomb) {
    const $flyTime = Math.floor(Math.random() * ((2000-1500)+1) + 1500);
    $bomb.animate({left: '350px'}, {
      duration: $flyTime,
      step: function() {
        if ($playerState === 'dead') {
          $bomb.stop().animate({left: '980px'}, 4000);
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

  // function blowUpBomb(element, movingObject, lane) {
  //   $(element).css('background-image', 'url(/Users/Jason/Development/WDI_PROJECT_1/images/explosion.gif)');
  //   checkCollision(lane);
  //   setTimeout(function() {
  //     movingObject.remove();
  //   }, 100);
  // }

  // CHECK IF PLAYER SELECTED THE CORRECT LANE
  function checkCollision($lane) {
    console.log('collision');
    if ($lane === '.pathTop') {
      if ($topDiv.hasClass('selected') && $playerState === 'alive') {
        $score++;
        $('p span').text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log('dead top');
        gameOver();
      }
    } else if ($lane === '.pathMid') {
      if ($midDiv.hasClass('selected') && $playerState === 'alive'){
        $score++;
        $('p span').text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log('dead middle');
        gameOver();
      }
    } else {
      if ($botDiv.hasClass('selected') && $playerState === 'alive'){
        $score++;
        $('p span').text($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log('dead bottom');
        gameOver();
      }
    }
  }

  function startGame () {
    $overlay.delay(200).fadeOut(1000);
    reset();
    $('button').animate({ opacity: 0 }, 1000, function(){
      $('button').css('visibility', 'hidden');
    });
    $('.instructions').animate({ opacity: 0 }, 1500, function(){
      $('.instructions').css('visibility', 'hidden');
    });
    $('p span').text($score);
    $('button').text('Go!');
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

    // function checkIValue() {
    //   if ($playerState === 'dead') {
    //     clearInterval(gameInterval);
    //   }
    // }
  }

  function reset() {
    $playerState = 'alive';
    $score = 0;
    returnStance();
  }
}
