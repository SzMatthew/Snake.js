var snake_body = [];
var bait;
var direction_changed = false;
var directions = [];
var last_direction;
var game_over = false;
var restart_enabled = false;
var start_enabled = true;

function setup() {
    InitiateCanvas();
    startDraw();
    initializeSnake();
    generateBait();
}

function draw() {
    if (frameCount % speed == 0 && game_over == false) {
        moveSnake();
        collosionDetect();
        drawSnake();
        drawBait();

        document.getElementById("score").value = overal_score;
    }
    else if (game_over == true) {
        drawGameOver();
    }
}

function drawSnake() {
    clear();
    InitiateCanvas();
    for (var i = snake_body.length - 1; i >= 0; i--) {
        fill(snake_body[i].color);
        noStroke();
        square(snake_body[i].x, snake_body[i].y, square_width);
    }
}

function moveSnake() {
    if (directions[0] == "up" || (last_direction == "up" && directions.length == 0)) {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x;
                snake_body[i].y = snake_body[i].y - (square_width + spacer);
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
        directions.shift();
        last_direction = "up";
    }
    else if (directions[0] == "down" || (last_direction == "down" && directions.length == 0)) {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x;
                snake_body[i].y = snake_body[i].y + (square_width + spacer);
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
        directions.shift();
        last_direction = "down";
    }
    else if (directions[0] == "right" || (last_direction == "right" && directions.length == 0)) {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x + (square_width + spacer);
                snake_body[i].y = snake_body[i].y;
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
        directions.shift();
        last_direction = "right";
    }
    else if (directions[0] == "left" || (last_direction == "left" && directions.length == 0)) {
        for (var i = snake_body.length - 1; i >= 0; i--) {
            if (i == 0) {
                snake_body[i].x = snake_body[i].x - (square_width + spacer);
                snake_body[i].y = snake_body[i].y;
            }
            else {
                snake_body[i].x = snake_body[i - 1].x;
                snake_body[i].y = snake_body[i - 1].y;
            }
        }
        directions.shift();
        last_direction = "left";
    }
}

function keyPressed() {
    if (keyCode == LEFT_ARROW && directions[directions.length - 1] != "right" && last_direction != "right") {
        directions.push("left");
    }

    if (keyCode == UP_ARROW && directions[directions.length - 1] != "down" && last_direction != "down") {
        directions.push("up");
    }

    if (keyCode == RIGHT_ARROW && directions[directions.length - 1] != "left" && last_direction != "left") {
        directions.push("right");
    }

    if (keyCode == DOWN_ARROW && directions[directions.length - 1] != "up" && last_direction != "up") {
        directions.push("down");
    }

    if (keyCode == 32 && restart_enabled == true) {
        game_over = false;
        overal_score = 0;
        restart_enabled = false;
        initializeSnake();
    }

    if (keyCode == 32 && start_enabled == true) {
        loop();
        start_enabled = false;
    }
}

function generateBait() {
    var bait_x = Math.floor(Math.random() * canvas_width) * (square_width + spacer);
    var bait_y = Math.floor(Math.random() * canvas_height) * (square_width + spacer)
    bait = new Square(bait_x, bait_y);
    bait.color = color(255, 0, 0);
}

function drawBait() {
    fill(bait.color);
    noStroke();
    square(bait.x, bait.y, square_width);
}

function collosionDetect() {
    //Tail Catch
    for (var i = 1; i < snake_body.length; i++) {
        if (snake_body[i].x == snake_body[0].x && snake_body[i].y == snake_body[0].y) {
            game_over = true;
            drawGameOver();
        }
    }

    //Wall collosion
    if (snake_body[0].x > (canvas_width_pixel - square_width) || snake_body[0].y > (canvas_height_pixel - square_width - spacer) || snake_body[0].x < 0 || snake_body[0].y < 0) {
        game_over = true;
        drawGameOver();
    }

    //Bait catched
    if (snake_body[0].x == bait.x && snake_body[0].y == bait.y) {
        var body = new Square(bait.x, bait.y, square_width);
        snake_body.push(body);
        overal_score += score_step;

        if (overal_score % (3 * score_step) == 0) {
            if (speed > 0 && overal_score < 1050) {
                speed--;
            }
        }
        generateBait();
    }

}

function drawGameOver() {
    textSize(55);
    fill(color(255, 255, 255))
    text('Game Over', canvas_width_pixel * 0.23, canvas_height_pixel / 2);
    textSize(20);
    text('Press Space to Restart!', canvas_width_pixel * 0.3, canvas_height_pixel / 2 + 40)
    restart_enabled = true;
    speed = 9;
}

function initializeSnake() {
    snake_body = [];
    var start_x = Math.floor(canvas_width / 2) * (square_width + spacer)
    var body1 = new Square(start_x, canvas_height * (square_width + spacer) / 2);
    body1.color = color(181, 118, 0);
    var body2 = new Square(start_x, body1.y + square_width + spacer);
    var body3 = new Square(start_x, body2.y + square_width + spacer);
    snake_body.push(body1, body2, body3);
    directions.push("up");
}

function InitiateCanvas() {
    let cnv = createCanvas(canvas_width_pixel, canvas_height_pixel);
    cnv.background(0);
}

function startDraw() {
    document.getElementById("score").value = overal_score;
    textSize(35);
    fill(color(255, 255, 255))
    text('Press Space to Start!', canvas_width_pixel * 0.18, canvas_height_pixel / 2);
    noLoop();
}