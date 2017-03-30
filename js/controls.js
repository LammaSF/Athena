function applyControls(body){
        window.addEventListener('keydown', function (ev) {
        switch (ev.keyCode) {
            case 37:
                if (body.speed.x < 0) {
                    return;
                }
                body.speed.x -= 6;
                break;
            case 38:
                if (body.coordinates.y < (smurfCanvas.height - body.height)) {
                    return;
                }
                body.speed.y -= 13;
                break;
            case 39:
                if (body.speed.x > 0) {
                    return;
                }
                body.speed.x += 4;
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function (ev) {
        switch (ev.keyCode) {
            case 37:
                body.speed.x = 0;
                break;
            case 39:
                body.speed.x = 0;
                break;
            default:
                break;
        }
    });
}