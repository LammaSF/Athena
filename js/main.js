window.addEventListener('load', function() {

    // var canvas = document.getElementById('myCanvas'),
    //     context = canvas.getContext('2d');

    var beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

        
    let drawCoordinatesY = getRandomArbitrary(550, 550);
    let drawCoordinatesX = 1200;

    var smurfCanvas = document.getElementById('smurfCanvas'),
        smurfContext = smurfCanvas.getContext('2d'),
        smurfSpriteSheet = document.getElementById('smurfWalkingSheet');

    var beerSprite = createSprite({
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

    var smurfSprite = createSprite({
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

    var beerBody = createPhysicalBody({
        coordinates: { x: drawCoordinatesX, y: drawCoordinatesY },
        speed: { x: -3, y: 0 },
        height: beerSprite.imgWidth,
        width: beerSprite.imgHeight
    });

    function gameLoop() {



        let beerLastCoordinates = beerBody.move();
        beerSprite.render(beerBody.coordinates, beerLastCoordinates).update();

        smurfSprite.render({ x: 0, y: 0 }, { x: 0, y: 0 }).update();
        
        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
});