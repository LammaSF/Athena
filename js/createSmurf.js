function createSmurf(smurfContext, smurfSpriteSheet, startingX, startingY) {
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

    let smurfJumpingSprite = createSprite({
        spriteSheet: smurfJumpingSheet,
        context: smurfContext,
        width: smurfJumpingSheet.width / 5,
        height: smurfJumpingSheet.height,
        framesCount: 2,
        maxFrames: 5,
        maxTicks: 5,
        elapsedFrames: 0,
        frameIndex: 0,
        imgWidth: smurfJumpingSheet.width / 3,
        imgHeight: smurfJumpingSheet.height
    });
    let currentSmurfSprite = smurfSprite;

    let smurfBody = createPhysicalBody({
        coordinates: {
            x: startingX || 0,
            y: startingY || 500
        },
        speed: {
            x: 0,
            y: 0
        },
        height: currentSmurfSprite.imgWidth,
        width: currentSmurfSprite.imgHeight
    });

    return {
        smurfBody: smurfBody,
        smurfSprite: smurfSprite,
        smurfJumpingSprite: smurfJumpingSprite
    }
}
