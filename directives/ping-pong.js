(function () {
    'use strict';
    app.directive('pingPong', function () {
        "use strict";
        return {
            restrict: 'EAC',
            replace: true,
            scope: {
            },
            template: "<canvas width='960' height='400'></canvas>",
            link: function (scope, element, attribute) {
                var game, context, ball, canvas, player;
                function rect(color, x, y, width, height) {
                    this.color = color; //rect color
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                    this.draw = function () {
                        context.fillStyle = this.color;
                        context.fillRect(this.x, this.y, this.width, this.height);
                    }
                }

                function playerMove(e) {
                    var y = e.pageY;
                    if (player.height / 2 + 10 < y && y < game.height - player.height / 2 - 10) {
                        player.y = y - player.height / 2;
                    }
                }

                function init() {
                    
                }

                function knock(objA, objB) {
                    if (objA.x + objA.width > objB.x &&
                        objA.x < objB.x + objB.width &&
                        objA.y + objA.height > objB.y &&
                        objA.y < objB.y + objB.height) {
                        return true;
                    } else {
                        return false;
                    }
                }

                function update() {
                    //рух по осі у
                    if (ball.y < 0 || ball.y + ball.height > game.height) {
                        ball.vY = -ball.vY;
                    }
                    //рух по осі х
                    if (ball.x < 0) {
                        ball.vX = -ball.vX;
                    }
                    if (ball.x + ball.width > game.width) {
                        ball.vX = -ball.vX;
                    }
                    // вдаряє по ракетці
                    if ((knock(player, ball) && ball.vX > 0)) {
                        ball.vX = -ball.vX;
                    }

                    ball.x += ball.vX;
                    ball.y += ball.vY;
                }

                function play() {
                    draw();
                    update();
                }

                function draw() {
                    game.draw();
                    context.fillStyle = "#373737";
                    context.fillRect(game.width / 2, 0, 5, game.height);
                    player.draw();
                    ball.draw();
                }

                game = new rect("#E37222", 0, 0, 480, 320);
                //player
                player = new rect("#fff", game.width - 30, game.height / 2 - 40, 20, 80);

                // ball, score
                ball = new rect("#fff", 40, game.height / 2 - 10, 20, 20);
                ball.vY = 6; //Math.floor(Math.random()*12 - 6); 
                ball.vX = 6; //7 - Math.abs(ball.vY);

                canvas = element[0];
                context = element[0].getContext('2d');
                canvas.height = game.height;
                canvas.width = game.width;
                canvas.onmousemove = playerMove;
                setInterval(play, 1000 / 50);
            }
        }
    });
} ());