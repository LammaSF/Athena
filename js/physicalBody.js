function createPhysicalBody(options) {
    function move() {

        let self = this,
            lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y };

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collides(body) {

        let thisHigher = false,
                       collisionMarginY;
             if(this.coordinates.y - body.coordinates.y) {
                      thisHigher = true;
                  }
              if(thisHigher) {
                       collisionMarginY = 45;
             } else {
                       collisionMarginY = 20;
                   }


        if (Math.abs(this.coordinates.x - body.coordinates.x) < 30 &&
            Math.abs(this.coordinates.y - body.coordinates.y) < collisionMarginY) {
            return true;
        }
        if (this.coordinates.x<0) {
            this.coordinates.x=0;
        }
        if (this.coordinates.y<0) {
            this.coordinates.y=0
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
    };

    return physicalBody;
}