function draw() {

    let canvas = document.getElementById('tutorial');

    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        // drawing code here
    } else {
        // canvas-unsupported code here
    }
}