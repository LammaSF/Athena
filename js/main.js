window.addEventListener('load', function() {

    // var canvas = document.getElementById('myCanvas'),
    //     context = canvas.getContext('2d');

    var beerCanvas = document.getElementById('beerCanvas'),
        beerContext = beerCanvas.getContext('2d'),
        beerSpriteSheet = document.getElementById('beerSpriteSheet');

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

    function gameLoop() {

        let drawCoordinatesY = getRandomArbitrary(550, 550);
        let drawCoordinatesX = 500;
        drawCoordinatesX -= 1;

        beerSprite.render({ x: drawCoordinatesX, y: drawCoordinatesY }, { x: drawCoordinatesX, y: drawCoordinatesY });
        beerSprite.update();

        smurfSprite.render({ x: 0, y: 0 }, { x: 0, y: 0 });
        smurfSprite.update();
        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
});