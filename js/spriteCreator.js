    'use strict'
    function createSprite(options) {

        function render(drawCoordinates, clearCoordinates) {
            
            var self = this;
            self.context.clearRect(
                clearCoordinates.x,
                clearCoordinates.y,
                self.width,
                self.height
            );

            self.context.drawImage(
                self.spriteSheet,
                self.frameIndex * this.width,
                0,
                self.width,
                self.height,
                drawCoordinates.x,
                drawCoordinates.y,
                options.imgWidth / 2,
                options.imgHeight / 2
            );
        }

        function update(){
            var self = this;

            self.ticksCount += 1;
            console.log(self.maxTicks);
            if(self.ticksCount >= self.maxTicks) {
                self.ticksCount = 0;
                self.frameIndex += 1;

                if(self.frameIndex > self.framesCount) {
                    self.frameIndex = 0;
                }
            }

            return self;
        }

        var sprite = {
            spriteSheet: options.spriteSheet,
            context: options.context,
            width: options.width,
            height: options.height,
            framesCount: options.framesCount,
            maxFrames: options.maxFrames,
            elapsedFrames: 0,
            frameIndex: 0,
            ticksCount: 0,
            maxTicks: options.maxTicks,
            render: render,
            update: update,
            imgWidth: options.imgWidth,
            imgHeight: options.imgHeight
        }

        return sprite;
    }