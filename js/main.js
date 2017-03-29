window.addEventListener('load', function () {

  // set browser icon
  setBrowserIcon('./images/icon.png');

  let $smurfImg = $('#smurfImg')
    .css({
      "display": "block",
      "margin": "auto",
      'width': '50%',
      'border': '3px solid green',
      'padding': '10px'
    });

  let $startGameButton = $('<input type="button" value="Play game" />');

  $startGameButton.css({
    'margin': 50,
    'font-size': 35,
    'color': 'white',
    'border-radius': 10,
    '-webkit-transition-duration': '0.4s',
    'transition-duration': '0.4s',
    'background-color': '#ab4242'
  }).hover(function () {
    $startGameButton.css('background-color', '#3c151e')
  }, function () {
    $startGameButton.css('background-color', '#ab4242')
  }).on('click', function () {
    $(this).css('display', 'none');
    $smurfImg.css('display', 'none');
    startGame();
  }).insertAfter($smurfImg);
});
