function createBeer(beerContext, beerSpriteSheet, startingX, startingY) {
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