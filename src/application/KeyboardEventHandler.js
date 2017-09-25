/**
 * Created by Daniel on 2017-09-18.
 */
class KeyboardEventHandler {

    /**
     *
     * @param {KeyActions} keyActions
     */
    constructor(keyActions, canvas) {
        this.keyActions = keyActions;
        this.canvas = canvas;
        this.initializeKeyHandler(this.keyActions);
    }

    /**
     *
     * @param {KeyActions} keyActions
     */
    initializeKeyHandler(keyActions) {

        this.canvas.addEventListener('keydown', function (event) {
            if (event.defaultPrevented) {
                return; // Do nothing if the event was already processed
            }

            switch (event.key) {
                case 's':
                    keyActions.keyDownAction();
                    break;
                case 'w':
                    keyActions.keyUpAction();
                    break;
                case 'a':
                    keyActions.keyLeftAction();
                    break;
                case 'd':
                    keyActions.keyRightAction();
                    break;
                case 'Enter':
                    keyActions.enterAction();
                    break;
                case 'Escape':
                    keyActions.escapeAction();
                    break;
                case 'Shift':
                    keyActions.shiftAction();
                    break;
                case 'P':
                    keyActions.keyPAction();
                    break;
                default:
                    return; // Quit when this doesn't handle the key event.
            }

            // Cancel the default action to avoid it being handled twice
            event.preventDefault();
        }, true);
    }
}