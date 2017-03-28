function startGame() {
    let beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

    let smurfCanvas = document.getElementById('smurfCanvas'),
        smurfContext = smurfCanvas.getContext('2d'),
        smurfSpriteSheet = document.getElementById('smurfWalkingSheet');

    let $wrapper = $('#wrapper');
    $wrapper.css({
        'display': 'block',
        'background-image': 'url("../images/background.jpg")'
    });


    let smurfSprite = createSprite({
        spriteSheet: smurfSpriteSheet,
        context: smurfContext,
        width: smurfSpriteSheet.width / 8,
        height: smurfSpriteSheet.height,
        framesCount: 2,
        maxFrames: 4,
        maxTicks: 5,
        elapsedFrames: 0,
        frameIndex: 0,
        imgWidth: smurfSpriteSheet.width / 6,
        imgHeight: smurfSpriteSheet.height
    });

    let smurfBody = createPhysicalBody({
        coordinates: {
            x: 0,
            y: 550
        },
        speed: {
            x: 0,
            y: 0
        },
        height: smurfSprite.imgWidth,
        width: smurfSprite.imgHeight
    });

    function createBeer(startingX, startingY) {

        let beerSprite = createSprite({
            spriteSheet: beerSpriteSheet,
            context: beerContext,
            width: beerSpriteSheet.width / 4,
            height: beerSpriteSheet.height,
            framesCount: 2,
            maxFrames: 4,
            maxTicks: 5,
            elapsedFrames: 0,
            frameIndex: 0,
            imgWidth: beerSpriteSheet.width / 16,
            imgHeight: beerSpriteSheet.height / 4
        });

        let beerBody = createPhysicalBody({
            coordinates: {
                x: startingX,
                y: startingY
            },
            speed: {
                x: -3,
                y: 0
            },
            height: beerSprite.imgWidth,
            width: beerSprite.imgHeight
        });

        return {
            beerSprite: beerSprite,
            beerBody: beerBody
        }
    }


    let beers = [];

    function addBeer(options) {
        let startingY = getRandomArbitrary(350, 550);

        if (beers.length) {
            let lastBeer = beers[beers.length - 1];

            let startingX = lastBeer.beerBody.coordinates.x + 300;
            let newBeer = createBeer(startingX, startingY);
            beers.push(newBeer);
        } else {
            beers.push(createBeer(1200, startingY));
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

    function gameLoop() {


        if (beers.length) {
            for (i = 0; i < beers.length; i += 1) {
                let beer = beers[i];

                // debugger
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

        addBeer();

        let smurfLastCoordinates = smurfBody.move();

        smurfSprite.render({
            x: 0,
            y: 500
        }, {
                x: 0,
                y: 500
            }).update();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

}