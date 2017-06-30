$(init);

function init(){

  const $currentSelected = $('.selected');
  const $topDiv = $('#topDiv');
  const $midDiv = $('#midDiv');
  const $botDiv = $('#botDiv');
  const $dagger = $('.dagger')

  // $('button').on('click', function() {
  //   // $('.selected').attr('class', '');
  //   $currentSelected.next().attr('class', 'selected');
  //   $currentSelected.attr('class', '');
  // });

  // function nextMove() {
  //   // $('.selected').attr('class', '');
  //   $currentSelected.next().attr('class', 'selected');
  //   $currentSelected.attr('class', '');
  // }
  //
  // function priorMove() {
  //   $currentSelected.prev().attr('class', 'selected');
  //   $currentSelected.attr('class', '');
  // }
  //
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

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  });


  $('button').on('click', startGame);

  function startGame() {
    $('.dagger').animate({right: '700px'});
  }


}
