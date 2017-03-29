function gameOver(isDead, wrapper) {
    let $wrapper = $('#wrapper');
    $wrapper.css('display', 'none');
    let $gameOverText = $('<p>GAME OVER</p>')
        .css({
            'font-size': 50,
            'color': 'red'
        });
    let $drunkSmurfImg = $('#gameOver')
        .css({
            'display': 'block',
            'margin': 'auto'
        });
    let $winSmurfImg = $('#win')
        .css({
            'display': 'block',
            'margin': 'auto'
        });
    let $winText = $('<p>Поздравления! Подобри рекорда!</p>')
        .css({
            'font-size': 50,
            'color': 'red'
        });
    if (isDead) {

            $winText.css('display', 'none');
            $winSmurfImg.css('display','none');
            $gameOverText.appendTo($('body'));
            $drunkSmurfImg.insertAfter($gameOverText);



    }
    else{
        $gameOverText.css('display', 'none');
        $drunkSmurfImg.css('display','none');
        $winText.appendTo($('body'));
        $winSmurfImg.insertAfter($winText);
    }


  let $restartButton = $('<input type="button" value="Restart" />');
    let $resetHighscore = $('<input type="button" id = "reset-btn" value="Reset High score" />');
  $restartButton.css({
    'margin': 50,
    'font-size': 35,
    'color': 'white',
    'border-radius': 10,
    '-webkit-transition-duration': '0.4s',
    'transition-duration': '0.4s',
    'background-color': '#ab4242'
  }).hover(function () {
    $restartButton.css('background-color', '#3c151e')
  }, function () {
    $restartButton.css('background-color', '#ab4242')
  }).on('click', function () {
    $(this).css('display', 'none');
      $resetHighscore.css('display', 'none');
    $gameOverText.css('display', 'none');
    $winText.css('display', 'none');
    $drunkSmurfImg.css('display','none');
    $winSmurfImg.css('display','none');
    startGame();
  }).appendTo($('body'));

    $resetHighscore.css({
        'margin': 0,
        'font-size': 35,
        'color': 'white',
        'border-radius': 10,
        '-webkit-transition-duration': '0.4s',
        'transition-duration': '0.4s',
        'background-color': '#ab4242'
    }).hover(function () {
        $resetHighscore.css('background-color', '#3c151e')
    }, function () {
        $resetHighscore.css('background-color', '#ab4242')
    }).on('click', function () {
            localStorage.clear();
    }).appendTo($('body'));
}