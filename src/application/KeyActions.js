/**
 * Created by Daniel on 2017-09-18.
 */
class KeyActions {

    constructor(game) {
        this.game = game;
    }

    keyUpAction() {
        this.game.player.move(DirectionsEnum.UP());
    }

    keyDownAction() {
        this.game.player.move(DirectionsEnum.DOWN());
    }

    keyLeftAction() {
        this.game.player.move(DirectionsEnum.LEFT());
    }

    keyRightAction() {
        this.game.player.move(DirectionsEnum.RIGHT());
    }

    enterAction() {

    }

    escapeAction() {

    }
}