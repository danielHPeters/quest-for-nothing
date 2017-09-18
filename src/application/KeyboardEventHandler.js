/**
 * Created by Daniel on 2017-09-18.
 */
class KeyboardEventHandler {

    /**
     *
     * @param {KeyActions} keyActions
     */
    constructor(keyActions) {
        this.keyActions = keyActions;
        this.initializeKeyHandler(this.keyActions);
    }

    /**
     *
     * @param {KeyActions} keyActions
     */
    initializeKeyHandler(keyActions) {

        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case "ArrowDown":
                    keyActions.keyDownAction();
                    break;
                case "ArrowUp":
                    keyActions.keyUpAction();
                    break;
                case "ArrowLeft":
                    keyActions.keyLeftAction();
                    break;
                case "ArrowRight":
                    keyActions.keyRightAction();
                    break;
                case "Enter":
                    keyActions.enterAction();
                    break;
                case "Escape":
                    keyActions.escapeAction();
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);
    }
}