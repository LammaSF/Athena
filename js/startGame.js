function startGame() {
    let beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

    let smurfCanvas = document.getElementById('smurfCanvas'),
        smurfContext = smurfCanvas.getContext('2d'),
        smurfSpriteSheet = document.getElementById('smurfWalkingSheet'),
        smurfJumpingSheet = document.getElementById('smurfJumpingSheet');

    let obstacleCanvas = document.getElementById('obstacleCanvas')
    obstacleContext = obstacleCanvas.getContext('2d'),
        obstacleSpriteSheet = document.getElementById('obstacle');

    let $wrapper = $('#wrapper');
    $wrapper.css({
        'display': 'block',
        'background-image': 'url("../images/background.jpg")'
    });

    let beers = [];

    function addBeer() {
        let startingY = getRandomArbitrary(350, 550);

        if (beers.length) {
            let lastBeer = beers[beers.length - 1];

            let startingX = lastBeer.beerBody.coordinates.x + 300;
            let newBeer = createBeer(beerContext, beerSpriteSheet, startingX, startingY);
            beers.push(newBeer);
        } else {
            beers.push(createBeer(beerContext, beerSpriteSheet, 1200, startingY));
        }
    }

    let obstacles = [];

    function addObstacle() {
        let startingX = getRandomArbitrary(300, 500);
        let startingY = 400;

        if (obstacles.length) {
            let lastObstacle = obstacles[obstacles.length - 1];
            startingX += lastObstacle.obstacleBody.coordinates.x;
            let newObstacle = createObstacle(obstacleContext, obstacleSpriteSheet, startingX, startingY);
            obstacles.push(newObstacle);
        } else {
            obstacles.push(createObstacle(obstacleContext, obstacleSpriteSheet, 1200, startingY));
        }
    }

    let $caughtBeers = $('#caughtBeers');
    $caughtBeers.css('display', 'block');
    let beerCounter = 0;

    let background = createBackground({
        width: 1200,
        height: 600,
        speedX: 10
    });

    window.addEventListener('keydown', function (ev) {
        switch (ev.keyCode) {
            case 37:
                if (smurfBody.speed.x < 0) {
                    return;
                }

                smurfBody.coordinates.x -= 5;
                break;
            case 38:
                if (smurfBody.coordinates.y < (smurfCanvas.height - smurfBody.height)) {
                    return;
                }

                smurfBody.coordinates.y -= 5;
                break;
            case 39:
                if (smurfBody.speed.x > 0) {
                    return;
                }

                smurfBody.coordinates.x += 5;
                break;
            default:
                break;
        }
    });

    let smurf = createSmurf(smurfContext, smurfSpriteSheet);
    let smurfBody = smurf.smurfBody;
    let currentSmurfSprite = smurf.smurfSprite;

    function gameLoop() {

        if (beers.length) {
            for (i = 0; i < beers.length; i += 1) {
                let beer = beers[i];

                if (beer.beerBody.coordinates.x < -beer.beerBody.width) {
                    beers.splice(i, 1);
                    i -= 1;
                    continue;
                }

                let beerLastCoordinates = beer.beerBody.move();

                beer.beerSprite.render(beer.beerBody.coordinates, beerLastCoordinates).update();

                if (smurfBody.collides(beer.beerBody)) {
                    beerContext.clearRect(
                        beer.beerBody.coordinates.x,
                        beer.beerBody.coordinates.y,
                        beer.beerBody.width,
                        beer.beerBody.height
                    );
                    beers.splice(i, 1);
                    i -= 1;
                    beerCounter += 1;
                    $caughtBeers.text('Хванати бири: ' + beerCounter);
                    continue;
                }
            }
        }
        if (beers.length <= 7) {
            addBeer();
        }

        if (obstacles.length) {
            for (i = 0; i < obstacles.length; i += 1) {
                let obstacle = obstacles[i];
// debugger

                if (obstacle.obstacleBody.coordinates.x < -obstacle.obstacleBody.width) {
                    console.log('enter');
                    obstacles.splice(i, 1);
                    i -= 1;
                    continue;
                }

                let obstacleLastCoordinates = obstacle.obstacleBody.move();

                obstacle.obstacleSprite.render(obstacle.obstacleBody.coordinates, obstacleLastCoordinates).update();

                if (smurfBody.collides(obstacle.obstacleBody)) {
                    console.log('break');
                }
            }
        }
        if (obstacles.length <= 5) {
            addObstacle();
        }

        let smurfLastCoordinates = smurfBody.move();
        smurfLastCoordinates.x -= 5;

        let currentSmurfSprite = smurf.currentSmurfSprite;
        if ((smurfBody.coordinates.y + smurfBody.height) < smurfCanvas.height) {
            currentSmurfSprite = smurf.smurfJumpingSprite;
        } else {
            currentSmurfSprite = smurf.smurfSprite;
        }
        currentSmurfSprite.render({
            x: smurf.smurfBody.coordinates.x,
            y: smurf.smurfBody.coordinates.y
        }, smurfLastCoordinates).
            update();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}