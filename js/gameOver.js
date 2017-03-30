let deadSound = document.getElementById("dead");
let winOne = document.getElementById("winOne");
 inTheForet = document.getElementById("inTheForest");

function gameOver(isDead, wrapper) {
    let $wrapper = $('#wrapper');
    $wrapper.css('display', 'none');
    let $gameOverText = $('<p/>')
        .html('GAME OVER')
        .css({
            'font-size': 50,
            'color': '#61B3FF'
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
    let $winText = $('<p />')
        .html('Поздравления! Подобри рекорда!')
        .css({
            'font-size': 50,
            'color': '#61B3FF'
        });
    if (isDead) {

        $winText.css('display', 'none');
        $winSmurfImg.css('display', 'none');
        $gameOverText.appendTo($('body'));
        $drunkSmurfImg.insertAfter($gameOverText);
        deadSound.play();
    } else {
        $gameOverText.css('display', 'none');
        $drunkSmurfImg.css('display', 'none');
        $winText.appendTo($('body'));
        $winSmurfImg.insertAfter($winText);
        winOne.play();
    }

    let $restartButton = $('<input />')
        .attr('type', 'button')
        .attr('value', 'Restart');


    let $resetHighscore = $('<input />')
        .attr('type', 'button')
        .attr('value', 'Reset High Score')
        .attr('id', 'reset-highscore');


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
        $drunkSmurfImg.css('display', 'none');
        $winSmurfImg.css('display', 'none');
        winOne.pause();
        inTheForet.play();
        startGame();
    }).appendTo($('body'));

    $resetHighscore.css({
        'margin': 50,
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
    }).on('click', function (e) {
        window.localStorage.clear();
        let target = e.target;
            target.setAttribute('data-toggle', 'modal');
            target.setAttribute('data-target', '#myModal');
    }).appendTo($('body'));
}