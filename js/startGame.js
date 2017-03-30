let themeSong = document.getElementById("audio"),
    drinkBeer = document.getElementById("drinkBeer"),
    inTheForet = document.getElementById("inTheForest");

function startGame() {
    const GAMEHEIGHT = 600,
        GAMEWIDTH = 1200;
    let beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

    let smurfCanvas = document.getElementById('smurfCanvas'),
        smurfContext = smurfCanvas.getContext('2d'),
        smurfSpriteSheet = document.getElementById('smurfWalkingSheet'),
        smurfJumpingSheet = document.getElementById('smurfJumpingSheet');

    let obstacleCanvas = document.getElementById('obstacleCanvas'),
        obstacleContext = obstacleCanvas.getContext('2d'),
        obstacleSpriteSheet = document.getElementById('obstacle');

    let $wrapper = $('#wrapper');
    $wrapper.css({
        'display': 'block',
        'background-image': 'url("../images/background.jpg")'
    });

    let beers = [];

    function addBeer() {

        let startingY = getRandomArbitrary((GAMEHEIGHT / 2) + 50, GAMEHEIGHT - 50);

        if (beers.length) {
            let lastBeer = beers[beers.length - 1];

            let startingX = lastBeer.beerBody.coordinates.x + GAMEWIDTH / 4;
            let newBeer = createBeer(beerContext, beerSpriteSheet, startingX, startingY);

            beers.push(newBeer);
        } else {
            beers.push(createBeer(beerContext, beerSpriteSheet, GAMEWIDTH, startingY));
        }
    }

    let obstacles = [];

    function addObstacle() {
        let startingX = getRandomArbitrary(GAMEWIDTH / 4, (GAMEWIDTH / 3) * 2);
        let startingY = 465;

        if (obstacles.length) {
            let lastObstacle = obstacles[obstacles.length - 1];
            startingX += lastObstacle.obstacleBody.coordinates.x;
            let newObstacle = createObstacle(obstacleContext, obstacleSpriteSheet, startingX, startingY);
            obstacles.push(newObstacle);
        } else {
            obstacles.push(createObstacle(obstacleContext, obstacleSpriteSheet, GAMEWIDTH, startingY));
        }
    }

    let $caughtBeers = $('#caughtBeers');
    $caughtBeers.css('display', 'block');
    let beerCounter = 0;

    let background = createBackground({
        width: GAMEWIDTH,
        height: GAMEHEIGHT,
        speedX: 10
    });

    let smurf = createSmurf(smurfContext, smurfSpriteSheet);
    let smurfBody = smurf.smurfBody;
    applyControls(smurfBody);
    let currentSmurfSprite = smurf.smurfSprite;

    let live = 3;

    function gameLoop() {
        smurfBody.applyGravity(0.7);

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

                if (smurfBody.collides({
                    body: beer.beerBody,
                    leftTrueMarginX: 41,
                    leftFalseMarginX: 31,
                    higherTrueMarginY: 51,
                    higherFalseMarginY: 41
                })) {
                    beerContext.clearRect(
                        beer.beerBody.coordinates.x,
                        beer.beerBody.coordinates.y,
                        beer.beerBody.width,
                        beer.beerBody.height
                    );
                    beers.splice(i, 1);
                    i -= 1;
                    beerCounter += 1;
                    drinkBeer.play();
                    $caughtBeers.text('Хванати бири: ' + beerCounter);
                    continue;
                }
            }
        }

        let highscore = localStorage.getItem("highscore");
        let isDead = false;
        if (highscore !== null) {
            if (beerCounter >= highscore) {
                localStorage.setItem("highscore", beerCounter);
            } else {
                isDead = true;
            }
        } else {
            localStorage.setItem("highscore", beerCounter);
        }

        let $highscores = $('#hightscores');
        $highscores.css('display', 'block');
        $highscores.text('Най-добър резултат: ' + highscore);

        let $live = $('#live');
        $live.css('display', 'block');
        $live.text('' + live);

        if (beers.length <= 7) {
            addBeer();
        }

        if (obstacles.length) {
            for (i = 0; i < obstacles.length; i += 1) {
                let obstacle = obstacles[i];

                if (obstacle.obstacleBody.coordinates.x < -obstacle.obstacleBody.width) {
                    obstacles.splice(i, 1);
                    i -= 1;
                    continue;
                }

                let obstacleLastCoordinates = obstacle.obstacleBody.move();

                obstacle.obstacleSprite.render(obstacle.obstacleBody.coordinates, obstacleLastCoordinates).update();

                if (smurfBody.collides({
                    body: obstacle.obstacleBody,
                    leftTrueMarginX: 43,
                    leftFalseMarginX: 60,
                    higherTrueMarginY: 50,
                    higherFalseMarginY: 65
                })) {
                        live -= 1;
                        $live.text('' + live);


                        obstacleContext.clearRect(obstacle.obstacleBody.coordinates.x, obstacle.obstacleBody.coordinates.y, obstacleCanvas.width, obstacleCanvas.height);
                        obstacles.splice(i, 1);
                        i -= 1;

                        $caughtBeers.text('Хванати бири: ' + beerCounter);
                        if (live <= 0) {
                            inTheForet.pause();
                            smurfContext.clearRect(0, 0, smurfCanvas.width, smurfCanvas.height);
                            beerContext.clearRect(0, 0, beerCanvas.width, beerCanvas.height);
                            obstacleContext.clearRect(0, 0, obstacleCanvas.width, obstacleCanvas.height);
                            beerCounter = 0;
                            $caughtBeers.text('Хванати бири: ' + beerCounter);                    
                            gameOver(isDead);
                            return;
                        }
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