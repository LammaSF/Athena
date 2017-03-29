function createPhysicalBody(options) {
    function move() {

        let self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collides(body) {
        let biggerBodySizeX = Math.abs(this.width - body.width);
        let biggerBodySizeY = Math.abs(this.height - body.height);

        if (Math.abs(this.coordinates.x - body.coordinates.x) < biggerBodySizeX &&
            Math.abs(this.coordinates.y - body.coordinates.y) < biggerBodySizeY) {
            return true;
        }

        return false;
    }

    let physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collides: collides
    }

    return physicalBody;
}