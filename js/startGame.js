function startGame() {
    let beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

    let smurfCanvas = document.getElementById('smurfCanvas'),
        smurfContext = smurfCanvas.getContext('2d'),
        smurfSpriteSheet = document.getElementById('smurfWalkingSheet'),
        smurfJumpingSheet = document.getElementById('smurfJumpingSheet');

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