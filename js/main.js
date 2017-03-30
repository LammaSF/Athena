window.addEventListener('load', function () {
	setBrowserIcon('./images/icon.png');
	themeSong.play();

	let $smurfImg = $('#smurfImg')
		.css({
			"display": "block",
			"margin": "auto",
			'width': '30%',
			'padding': '10px'
		});

	let $startGameButton = $('<input />')
		.attr('type', 'button')
		.attr('value', 'Play the Game');

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
		themeSong.pause();
		inTheForet.play();
		startGame();
	}).insertAfter($smurfImg);
});
