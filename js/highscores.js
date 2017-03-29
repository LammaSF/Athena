
function highScores(wrapper, points) {
    let $gameOverText = $('<p>GAME OVER</p>')
        .css({
            'font-size': 50,
            'color': 'red'
        })
        .appendTo($('body'));
    let $restartButton = $('<input type="button" value="Restart" />');

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
        $gameOverText.css('display', 'none');
        $drunkSmurfImg.css('display','none');
        startGame();
    }).appendTo($('body'));
}