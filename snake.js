var spacer = 2;
var x = 0;
var speed = 15;
var snake_body = [];
var direction;

function setup() {
    createCanvas(500, 600);
    background(0);
    var body1 = new Square(width / 2, height / 2);
    body1.color = color(181, 118, 0);
    var body2 = new Square(width / 2, body1.y + body1.width + spacer);
    var body3 = new Square(width / 2, body2.y + body2.width + spacer);
    snake_body.push(body1, body2, body3);
    direction = "up";
}

function draw() {
    if (frameCount % speed == 0) {
        moveSnake();
        drawSnake();
    }
}

function drawSnake() {
    clear();
    createCanvas(500, 600);
    background(0);
    for (var i = 0; i < snake_body.length; i++) {
        fill(snake_body[i].color);
        noStroke();
        square(snake_body[i].x, snake_body[i].y, snake_body[i].width);
    }
}

function moveSnake() {
    if (direction == "up") {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x;
                snake_body[i].y = snake_body[i].y - (snake_body[i].width + spacer);
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
    }
    if (direction == "down") {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x;
                snake_body[i].y = snake_body[i].y + (snake_body[i].width + spacer);
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
    }
    if (direction == "right") {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x + (snake_body[i].width + spacer);
                snake_body[i].y = snake_body[i].y;
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
    }
    if (direction == "left") {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x - (snake_body[i].width + spacer);
                snake_body[i].y = snake_body[i].y;
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && direction != "right") {
        direction = "left";
    }

    if (keyCode == UP_ARROW && direction != "down") {
        direction = "up";
    }

    if (keyCode == RIGHT_ARROW && direction != "left") {
        direction = "right";
    }

    if (keyCode == DOWN_ARROW && direction != "up") {
        direction = "down";
    }
}