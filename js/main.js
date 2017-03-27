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
        coordinates: { x: 1000, y: 70 } ,
        speed: { x: -3, y: 0 },
        height: beerSprite.imgWidth,
        width: beerSprite.imgHeight
    });
    
    var smurfBody = createPhysicalBody({
        coordinates: { x: 50, y: 70 },
        speed: { x: 0, y: 0 },
        height: smurfSprite.imgWidth,
        width: smurfSprite.imgHeight
    });

    var $caughtBeers = $("#caughtBeers");
    var beerCounter = 0;

    function gameLoop() {


        let smurfLastCoordinates = smurfBody.move();
        let beerLastCoordinates = beerBody.move();
        
        beerSprite.render(beerBody.coordinates, beerLastCoordinates).update();
        smurfSprite.render({ x: 0, y: 0 }, { x: 0, y: 0 }).update();
        
        if(smurfBody.collides(beerBody)){
            beerSprite.render({ x: 1000, y: 70 }, beerLastCoordinates)
            beerBody.coordinates = { x: 1000, y: 70 };
            beerCounter += 1;
            $caughtBeers.text("Хванати бири: " + beerCounter);
        }
        
        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
});
