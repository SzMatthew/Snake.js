var spacer = 1;
var x = 0;
var speed = 40;
var snake_body = [];

function setup() {
    createCanvas(500, 600);
    background(0);
    var body1 = new Square(width / 2, height / 2);
    var body2 = new Square(width / 2, body1.y + body1.width + spacer);
    var body3 = new Square(width / 2, body2.y + body2.width + spacer);
    snake_body.push(body1, body2, body3);
}

function draw() {
    if (frameCount % speed == 0) {
        drawSnake();
    }
}

function drawSnake() {
    clear();
    createCanvas(500, 600);
    background(0);
    for (var i = 0; i < snake_body.length; i++) {
        square(snake_body[i].x, snake_body[i].y, snake_body[i].width);

    }
}