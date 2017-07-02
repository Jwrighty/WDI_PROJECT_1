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

  const $daggerArray = ['dagger1', 'dagger2', 'dagger3'];
  // [throwDagger1, throwDagger2, throwDagger3];

  function randomFrom($daggerArray) {
    return $daggerArray[Math.floor(Math.random() * 3)];
  }

  // CREATE A NEW DAGGER
  // create a function assign to varialbe newDagger
  // insert a new div into arena
  // insert image into div
  // apply class of either .dagger1 / .dagger2 / .dagger3
  // create an array of .dagger1 / .dagger2 / .dagger3
  // add the math.random of this array as the class of the newly created div
  // pass this new dagger into the animate function

  // creates a dagger by inserting div and applying a random class from $daggerArray
  function createDagger() {
    const $arrayValue = randomFrom($daggerArray);
    if ($arrayValue === 'dagger1') {
      // var newDagger1 = document.createElement('div');
      // $(newDagger1).attr('class', 'dagger1');
      // throwDagger1(newDagger1);
      $('dagger1path').append('<div class="dagger1"><img src="/Users/Jason/Development/WDI_PROJECT_1/images/Shuriken.png" alt=""></div>');
      throwDagger1();
    } else if ($arrayValue === 'dagger2') {
      $('dagger2path').append('<div class="dagger2"><img src="/Users/Jason/Development/WDI_PROJECT_1/images/Shuriken.png" alt=""></div>');
      throwDagger2();
    } else {
      $('dagger3path').append('<div class="dagger3"><img src="/Users/Jason/Development/WDI_PROJECT_1/images/Shuriken.png" alt=""></div>');
      throwDagger3();
    }
  }

  function startGame () {
    let speed = 3000;
    let interval = setInterval(runI, speed);

    function runI() {
      $playerState = 'alive';
      createDagger();
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



  // THROW EACH DAGGER FUNCTIONS
  function throwDagger1() {
    $dagger1.animate({right: '700px'}, 2000, function() {
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
    $dagger2.animate({right: '700px'}, 2000, function() {
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
    $dagger3.animate({right: '700px'}, 2000, function() {
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

// function throwDagger() {
//   $dagger1.animate({right: '695px'}, 1500, function() {
//     $dagger1.removeAttr('style');
//     if ($topDiv.hasClass('selected')) {
//       $score++;
//       console.log($score);
//       $playerState = 'alive';
//     } else {
//       $playerState = 'dead';
//       console.log($score);
//       console.log($playerState);
//       $score = 0;
//     }
//   });
// }
