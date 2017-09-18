function draw() {

    let canvas = document.getElementById('game');

    if (canvas.getContext) {

        let ctx = canvas.getContext('2d');
        let player = new Player();
        let map = new Map();
        let game = new Game(map, player);
        let loop = new MainLoop(game);
        loop.start();
        // drawing code here
    } else {
        document.getElementById('unsupported').textContent =
            "Please update your browser or download another one which supports HTML5";
    }
}