import React, { Component } from 'react';

class GameInterface extends Component {
    constructor() {
        super()
    }

    componentDidMount = () => {
        this._initializeGameCanvas()
    }

    _initializeGameCanvas = () => {
        this.canvas = this.refs.pong_canvas;
        this.ctx = this.canvas.getContext('2d');

        this.cW = this.canvas.width;
        this.cH = this.canvas.height;

        this.p1Score = 0;
        this.p2Score = 0;

        this.keys = {};

        window.addEventListener('keydown', e => { this.keys[e.keyCode] = 1; e.preventDefault(); })
        window.addEventListener('keyup', e => delete this.keys[e.keyCode])

        this.player1 = new this.GameClasses.Box({ x: 10, y: 200, width: 15, height: 80, color: '#FFF', velocityY: 2 });
        this.player2 = new this.GameClasses.Box({ x: 725, y: 200, width: 15, height: 80, color: '#FFF', velocityY: 2 });
        this.boardDivider = new this.GameClasses.Box({ x: ((this.canvas.width / 2) - 2.5), y: -1, width: 5, height: (this.canvas.height + 1), color: '#FFF' });
        this.gameBall = new this.GameClasses.Box({ x: (this.canvas.width / 2), y: (this.canvas.height / 2), width: 15, height: 15, color: '#FF0000', velocityX: 1, velocityY: 1 });

        this._renderLoop();
    }

    _renderLoop = () => {
        this._ballCollisionY();
        this._userInput(this.player1);
        this._userInput(this.player2);
        window.requestAnimationFrame(this._renderLoop);
    }

    _drawRender = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this._displayScore1();
        this._displayScore2();
        this._drawBox(this.player1);
        this._drawBox(this.player2)
        this._drawBox(this.boardDivider);
        this._drawBox(this.gameBall);
    }

    _drawBox = box => {
        this.ctx.fillStyle = box.color;
        this.ctx.fillRect(box.x, box.y, box.width, box.height);
    }
    
    _ballCollisionY = () => {
        if (((this.gameBall.y + this.gameBall.velocityY) <= 0) || ((this.gameBall.y + this.gameBall.velocityY + this.gameBall.height) >= this.canvas.height)) {
            this.gameBall.velocityY = this.gameBall.velocityY * -1;
            this.gameBall.x += this.gameBall.velocityX;
            this.gameBall.y += this.gameBall.velocityY;
        } else {
            this.gameBall.x += this.gameBall.velocityX;
            this.gameBall.y += this.gameBall.velocityY;
        }
        this._ballCollisionX();
    }
    
    _ballCollisionX = () => {
        if (
            (
                ((this.gameBall.x + this.gameBall.velocityX) <= (this.player1.x + this.player1.width)) &&
                ((this.gameBall.y + this.gameBall.velocityY) > this.player1.y) &&
                ((this.gameBall.y + this.gameBall.velocityY) <= (this.player1.y + this.player1.height))
            ) ||
            (
                ((this.gameBall.x + this.gameBall.width + this.gameBall.velocityX) >= this.player2.x) &&
                ((this.gameBall.y + this.gameBall.velocityY) > this.player2.y) &&
                ((this.gameBall.y + this.gameBall.velocityY) <= (this.player2.y + this.player2.height))
            )
        ) {
            this.gameBall.velocityX = this.gameBall.velocityX * -1;
        } else if ((this.gameBall.x + this.gameBall.velocityX) < this.player1.x) {
            this.p2Score += 1;
            this.gameBall.velocityX = this.gameBall.velocityX * -1;
            this.gameBall.x = ((this.canvas.width / 2) + this.gameBall.velocityX);
            this.gameBall.y = ((this.canvas.height / 2) + this.gameBall.velocityY);
        } else if ((this.gameBall.x + this.gameBall.velocityX) > (this.player2.x + this.player2.width)) {
            this.p1Score += 1;
            this.gameBall.velocityX = this.gameBall.velocityX * -1;
            this.gameBall.x = ((this.canvas.width / 2) + this.gameBall.velocityX);
            this.gameBall.y = ((this.canvas.height / 2) + this.gameBall.velocityY);
        } else {
            this.gameBall.x += this.gameBall.velocityX;
            this.gameBall.y += this.gameBall.velocityY;
        }
        this._drawRender();
    }

    _displayScore1 = () => {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillText(this.p1Score, ((this.canvas.width / 2) - 50), 30);
    }

    _displayScore2 = () => {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'rgb(255, 255, 255)';
        this.ctx.fillText(this.p2Score, ((this.canvas.width / 2) + 40), 30);
    }

    _userInput = () => {
        if (87 in this.keys) {
            if ((this.player1.y - this.player1.velocityY) > 0) this.player1.y -= this.player1.velocityY;
        } else if (83 in this.keys) {
            if ((this.player1.y + this.player1.height + this.player1.velocityY) < this.canvas.height) this.player1.y += this.player1.velocityY;
        }

        if (38 in this.keys) {
            if ((this.player2.y - this.player2.velocityY) > 0) this.player2.y -= this.player2.velocityY;
        } else if (40 in this.keys) {
            if ((this.player2.y + this.player2.height + this.player2.velocityY) < this.canvas.height) this.player2.y += this.player2.velocityY;
        }
    }

    GameClasses = (() => {
        return {
            Box: function Box(opts) {
                let { x, y, width, height, color, velocityX, velocityY } = opts;
                this.x = x || 10;
                this.y = y || 10;
                this.width = width || 40;
                this.height = height || 50;
                this.color = color || '#FFF';
                this.velocityX = velocityX || 2;
                this.velocityY = velocityY || 2;
            }
        }
    })()

    render() {
        return (
            <canvas
                id="pong_canvas"
                ref="pong_canvas"
                width="750"
                height="500"
                style={{ background: '#12260e', border: '4px solid #FFF' }}
            >
            </canvas>
        )
    }
}

export default GameInterface;