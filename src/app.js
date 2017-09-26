"use strict";

/*let FPS = 60;
setInterval(function () {
    update();
    draw();
}, 1000 / FPS);*/

function update() {

}

function draw() {

    let canvas = document.getElementById('game');
    canvas.setAttribute("tabindex", "0");

    if (canvas.getContext) {

        let keyActionsRegister = [];
        let ctx = canvas.getContext('2d');
        let player = new Player("Player1", 20, 20, 25, 25, new Material('assets/player.png'));
        let map = new Map(0, 0, canvas.width, canvas.height, new Material('assets/background.jpg'));
        let block = new Block(50, 50, 40, 40, new Material('assets/stone-block.jpg'));
        let gameObjects = [];
        let game = new Game(map, player);
        let assetManager = new AssetManager();
        let keyActions = new KeyActions(game);
        let keyEventHandler = new KeyboardEventHandler(keyActions, window, keyActionsRegister);
        let collisionHandler = new CollisionHandler();
        player.keyActionsRegister = keyActionsRegister;
        gameObjects.push(map);
        gameObjects.push(player);
        gameObjects.push(block);

        // Add all sprites to the download queue
        gameObjects.forEach(obj => assetManager.queueDownload(obj.material.getResource()));

        // Download all sprites
        assetManager.downLoadAll(() => {
            // Assign the sprites to the correct material
            gameObjects.forEach(obj => obj.material.setSprite(assetManager.getAsset(obj.material.getResource())));
            // After the sprites are initialized start drawing
            animate(ctx, gameObjects, assetManager, collisionHandler);
        });
    }

    else {
        document.getElementById('unsupported').textContent =
            "Please update your browser or download another one which supports HTML5";
    }
}

/**
 *
 * @param ctx
 * @param gameObjects
 * @param canvas
 * @param {AssetManager} assetManager
 * @param {CollisionHandler} collisionHandler
 */
function animate(ctx, gameObjects, assetManager, collisionHandler) {

    // Clear canvas before drawing new animation
    ctx.clearRect(0, 0, gameObjects[0].width, gameObjects[0].height);
    // Request new frame when ready
    requestAnimationFrame(() => animate(ctx, gameObjects, assetManager, collisionHandler));

    //gameObjects[1].checkOutOfBounds(gameObjects[0]);
    gameObjects[1].move(gameObjects[0]);
    /**collisionHandler.handleCollision(gameObjects[1].getCollisionBox(), gameObjects[2], () => {
        gameObjects[1].goBack();
        gameObjects[1].jumping = false;
    });*/
    // Draw the sprites on the canvas
    gameObjects.forEach(obj => ctx.drawImage(obj.material.getSprite(), obj.x, obj.y, obj.width, obj.height));
}

$(document).ready(() => draw());