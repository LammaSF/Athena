function createPhysicalBody(options) {
    function move() {

        let self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collides(options) {

        let thisHigher = false,
            thisLeft = false,
            collisionMarginY,
            collisionMarginX;

        const maxRight = 1150;
        if (this.coordinates.x < options.body.coordinates.x) {
            thisLeft = true;
        }

        if (this.coordinates.y < options.body.coordinates.y) {
            thisHigher = true;
        }

        if (thisLeft) {
            collisionMarginX = options.leftTrueMarginX;
        } else {
            collisionMarginX = options.leftFalseMarginX;
        }

        if (thisHigher) {
            collisionMarginY = options.higherTrueMarginY;
        } else {
            collisionMarginY = options.higherFalseMarginY;
        }

        if (Math.abs(this.coordinates.x - options.body.coordinates.x) < collisionMarginX &&
            Math.abs(this.coordinates.y - options.body.coordinates.y) < collisionMarginY) {
            return true;
        }
        if (this.coordinates.x < 0) {
            this.coordinates.x = 0;
        }
        if (this.coordinates.y < 0) {
            this.coordinates.y = 0
        }
        if (this.coordinates.x > maxRight) {
            this.coordinates.x = maxRight;
        }
        if (this.coordinates.y > maxRight) {
            this.coordinates.y = maxRight;
        }

        return false;
    }

    function applyGravity(gravity) {
        if (this.coordinates.y === 500) {
            return;
        } else if (this.coordinates.y > 500) {
            this.coordinates.y = 500;
            this.speed.y = 0;
            return;
        }
        this.speed.y += gravity;
    }

    let physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collides: collides,
        applyGravity: applyGravity
    };

    return physicalBody;
}