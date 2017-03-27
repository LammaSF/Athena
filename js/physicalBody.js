function createPhysicalBody(options) {
    function move() {

        var self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collides (body) {
        if(this.coordinates.x === body.coordinates.x){
            return true;
        }
        
        return false;
    }

    var physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collides: collides
    }

    return physicalBody;
}
