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

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');
        let player = new Player("Player1", 100, 100, 25, 25, new Material('assets/player.png'));
        let map = new Canvas(0, 0, canvas.width, canvas.height, new Material('assets/background.jpg'));
        let gameObjects = [];
        let game = new Game(map, player);
        let assetManager = new AssetManager();
        let keyActions = new KeyActions(game);
        let keyEventHandler = new KeyboardEventHandler(keyActions, window);
        let collisionHandler = new CollisionHandler();
        let blocks = [];
        let bl = 'block';
        let no = null;
        let blocksList = [
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, bl, no, no, no, no, no, no, no, no, no, no, bl],
            [bl, no, bl, bl, bl, no, no, bl, no, no, no, no, no, bl, bl],
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
        ];

        player.keyActionsRegister = keyEventHandler.getKeyActionsRegister();
        gameObjects.push(map);
        gameObjects.push(player);

        let blockWidth = game.canvas.width / blocksList[0].length;
        let blockHeight = game.canvas.height / blocksList.length;
        let blockX = 0;
        let blockY = 0;

        for (let i = 0; i < blocksList.length; i++) {

            for (let j = 0; j < blocksList[i].length; j++) {

                if (blocksList[i][j] === 'block') {
                    blocks.push(new Block(blockX, blockY, blockWidth, blockHeight, new Material('assets/stone-block.jpg')));
                }
                blockX += blockWidth;
            }
            blockY += blockHeight;
            blockX = 0;
        }

        console.log(blocks[0].height + ' : ' + blocks[0].width);

        game.blocks = blocks;
        gameObjects = gameObjects.concat(blocks);

        // Add all sprites to the download queue
        gameObjects.forEach(obj => assetManager.queueDownload(obj.material.getResource()));

        // Download all sprites
        assetManager.downLoadAll(() => {
            // Assign the sprites to the correct materiala
            gameObjects.forEach(obj => obj.material.setSprite(assetManager.getAsset(obj.material.getResource())));
            // After the sprites are initialized start drawing
            animate(ctx, game, gameObjects, collisionHandler);
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
 * @param game
 * @param gameObjects
 * @param {CollisionHandler} collisionHandler
 */
function animate(ctx, game, gameObjects, collisionHandler) {

    // Clear canvas before drawing new animation
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    // Request new frame when ready
    requestAnimationFrame(() => animate(ctx, game, gameObjects, collisionHandler));

    //gameObjects[1].checkOutOfBounds(gameObjects[0]);
    game.player.move(game.canvas);
    game.blocks.forEach(block => {

        const direction = collisionHandler.colCheck(game.player, block);

        if (direction === "l" || direction === "r") {

            game.player.velX = 0;
            game.player.jumping = false;

        } else if (direction === "b") {

            game.player.grounded = true;
            game.player.jumping = false;

        } else if (direction === "t") {

            game.player.velY *= -1;
        }
    });

    if (game.player.grounded) {

        game.player.velY = 0;
    }

    game.player.x += game.player.velX;
    game.player.y += game.player.velY;

    // Draw the sprites on the canvas
    gameObjects.forEach(obj => ctx.drawImage(obj.material.getSprite(), obj.x, obj.y, obj.width, obj.height));
}

$(document).ready(() => draw());
