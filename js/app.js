$(init);

function init(){

  const $currentSelected = $('.selected');
  const $topDiv = $('#topDiv');
  const $midDiv = $('#midDiv');
  const $botDiv = $('#botDiv');
  const $dagger1 = $('.dagger1');
  const $dagger2 = $('.dagger2');
  const $dagger3 = $('.dagger3');
  let $playerState = 'dead';
  let $score = 0;

  // Keyboard arrows to move the character div class
  function selectTop() {
    $('.character').children().removeClass();
    $topDiv.attr('class', 'selected');
  }

  function selectMid() {
    $('.character').children().removeClass();
    $midDiv.attr('class', 'selected');
  }

  function selectBottom() {
    $('.character').children().removeClass();
    $botDiv.attr('class', 'selected');
  }

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: selectMid();
      break;

      case 38: selectTop();
      break;

      case 39: selectMid();
      break;

      case 40: selectBottom();
      break;

      default: return;
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });

  $('button').on('click', startGame);

  const $daggerArray = [throwDagger1, throwDagger2, throwDagger3];

  // at interval (set with a variable that can ge changed) run a random throwDagger function (using math.random and selecting from the dagger array)

  function startGame () {

    $daggerArray[Math.floor((Math.random() * 3))]();
    //insert new element, fire animation, clear


    let speed = 3000;

    let interval = setInterval(runI, speed);

    function runI() {
      $daggerArray[Math.floor((Math.random() * 3))]();
      speed -= 50;
      clearInterval(interval);
      interval = setInterval(runI, speed);
      checkIValue();
    }

    function checkIValue() {
      if ($playerState === 'dead') {
        clearInterval(interval);
        console.log('the end');
        $('p span').text('You are Dead!');
      }
    }


  }
  //
  //   function startGame() {
  //     let i = 0;
  //
  //     const interval = setInterval(function () {
  //       console.log(i);
  //       console.log($score);
  //       $daggerArray[Math.floor((Math.random() * 3))]();
  //       i++;
  //       checkIValue();
  //     }, 2000);
  //
  //
  //     function checkIValue() {
  //       if (i>=10) { // if gameState = dead
  //         clearInterval(interval);
  //         console.log('the end'); // insert html text to say you're dead
  //       }
  //     }
  //   }


  function throwDagger1() {
    $dagger1.animate({right: '695px'}, 1500, function() {
      $dagger1.removeAttr('style');
      if ($topDiv.hasClass('selected')) {
        $score++;
        console.log($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log($score);
        console.log($playerState);
        $score = 0;
      }
    });
  }

  function throwDagger2() {
    $dagger2.animate({right: '700px'}, 1500, function() {
      $dagger2.removeAttr('style');
      if ($midDiv.hasClass('selected')) {
        $score++;
        console.log($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log($score);
        console.log($playerState);
        $score = 0;
      }
    });
  }

  function throwDagger3() {
    $dagger3.animate({right: '700px'}, 1500, function() {
      $dagger3.removeAttr('style');
      if ($botDiv.hasClass('selected')) {
        $score++;
        console.log($score);
        $playerState = 'alive';
      } else {
        $playerState = 'dead';
        console.log($score);
        console.log($playerState);
        $score = 0;
      }
    });
  }
}

// CREATE A NEW DAGGER
// create a function
// insert a new div into arena
// insert image into div
// apply class of either .dagger1 / .dagger2 / .dagger3
  // create an array of .dagger1 / .dagger2 / .dagger3
  // add the math.random of this array as the class of the newly created div
// pass this new dagger into the animate function
