"use strict";

function draw() {

    let canvas = document.getElementById('game');
    canvas.setAttribute("tabindex", 0);

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        let player = new Player("Player1", 10, 10, 25, 25, new Material('assets/player.png'));
        let map = new Map(0, 0, canvas.width, canvas.height, new Material('assets/background.jpg'));
        let gameObjects = [];
        gameObjects.push(map);
        gameObjects.push(player);
        let game = new Game(map, player);
        let loop = new MainLoop(game);
        let assetManager = new AssetManager();

        let keyActions = new KeyActions(game);
        let keyEventHandler = new KeyboardEventHandler(keyActions, window);
        gameObjects.forEach(obj => assetManager.queueDownload(obj.material.resource));
        assetManager.downLoadAll(() => {
            gameObjects.forEach(obj => obj.material.setSprite(assetManager.getAsset(obj.material.resource)));
            animate(ctx, gameObjects, canvas, assetManager);
        });
    }

    else {
        document.getElementById('unsupported').textContent =
            "Please update your browser or download another one which supports HTML5";
    }
}

function animate(ctx, gameObjects, canvas, assetManager) {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => animate(ctx, gameObjects, canvas, assetManager));

    gameObjects.forEach(obj => ctx.drawImage(obj.material.getSprite(), obj.x, obj.y, obj.width, obj.height));

    //let sprite = assetManager.getAsset(game.player.material.resource);
    //let backgroundSprite = assetManager.getAsset(game.player.material.resource);
    //ctx.drawImage(game.player.material.getSprite(), game.player.x, game.player.y, game.player.width, game.player.height);
    //ctx.drawImage(backgroundSprite, game.getMap().x, game. )

}

$(document).ready(() => draw());