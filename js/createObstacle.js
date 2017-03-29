function createObstacle(obstacleContext, obstacleSpriteSheet, startingX, startingY) {
        let obstacleSprite = createSprite({
            spriteSheet: obstacleSpriteSheet,
            context: obstacleContext,
            width: obstacleSpriteSheet.width,
            height: obstacleSpriteSheet.height,
            framesCount: 0,
            maxFrames: 0,
            maxTicks: 0,
            elapsedFrames: 0,
            frameIndex: 0,
            imgWidth: obstacleSpriteSheet.width / 1.5,
            imgHeight: obstacleSpriteSheet.height / 1.5
        });

        let obstacleBody = createPhysicalBody({
            coordinates: {
                x: startingX || 1000,
                y: startingY || 400
            },
            speed: {
                x: -2,
                y: 0
            },
            height: obstacleSpriteSheet.width,
            width: obstacleSpriteSheet.height
        });

        return {
            obstacleBody: obstacleBody,
            obstacleSprite: obstacleSprite
        }
    }