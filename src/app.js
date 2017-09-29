'use strict';

function init() {

    let canvas = document.getElementById('game');

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');
        let player = new Player("Player1", 100, 100, 60, 60, new Material('assets/player.png'));
        let map = new Canvas(0, 0, canvas.width, canvas.height, new Material('assets/background.jpg'));
        let areas = [];
        let area1 = new Area(map)
        let area2 = new Area(map);
        let gameObjects = [];
        let game = new Game(map, player);
        let assetManager = new AssetManager();
        let keyEventHandler = new KeyboardEventHandler(window);

        let bl = 'block';
        let se = 'secret'
        let no = null;
        let blocksList = [
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, no, no, no, no, bl, bl, no, no, no, bl],
            [bl, no, no, bl, no, no, no, no, no, no, no, no, no, no, bl],
            [bl, no, bl, bl, bl, no, no, bl, no, no, no, no, no, se, se],
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
        ];

        let blocksList2 = [
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, bl, no, no, no, no, no, no, no, no, bl],
            [bl, no, no, no, no, no, no, no, no, bl, bl, bl, bl, bl, bl],
            [bl, no, no, no, no, no, no, no, no, no, no, no, no, no, bl],
            [no, no, no, no, no, no, no, bl, no, no, no, no, no, no, bl],
            [bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl, bl]
        ];
        area1.right = area2;
        area2.left = area1;
        area1.generateBlocks(blocksList);
        area2.generateBlocks(blocksList2);
        areas.push(area1);
        areas.push(area2);
        game.areas = areas;
        game.current = game.areas[0];
        //game.generateBlocks(blocksList);

        player.keyActionsRegister = keyEventHandler.getKeyActionsRegister();
        gameObjects.push(map);
        gameObjects.push(player);
        gameObjects = gameObjects.concat(area1.blocks);
        gameObjects = gameObjects.concat(area2.blocks);

        // Add all sprites to the download queue
        gameObjects.forEach(obj => assetManager.queueDownload(obj.material.getResource()));

        // Download all sprites
        assetManager.downLoadAll(() => {
            // Assign the sprites to the correct material
            gameObjects.forEach(obj => obj.material.setSprite(assetManager.getAsset(obj.material.getResource())));
            // After the sprites are initialized start drawing
            animate(ctx, game);
        });
    }

    else {
        document.getElementById('unsupported').textContent =
            'Please update your browser or download another one which supports HTML5';
    }
}

/**
 *
 * @param ctx
 * @param game
 */
function animate(ctx, game) {

    // Clear canvas before drawing new animation
    ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);

    // Draw Background
    game.canvas.render(ctx);

    game.player.move(game.current.blocks);
    game.player.checkEdges(game);
    game.player.render(ctx);
    game.current.blocks.forEach(block => block.render(ctx));

    // Request new frame when ready
    requestAnimationFrame(() => animate(ctx, game));
}

$(document).ready(() => init());
