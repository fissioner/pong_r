import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';

class GameInterface extends Component {
    constructor() {
        super();
        this.state = {
            start: false,
            delay: 10000,
            maxScore: 10,
            ball: {
                color: 'white',
                height: 15,
                width: 15,
                velocityX: 1,
                velocityY: 1,
                shape: 'circle'
            },
            paddle1: {
                color: 'white',
                width: 15,
                height: 80,
                velocityY: 2
            },
            paddle2: {
                color: 'white',
                width: 15,
                height: 80,
                velocityY: 2
            }
        }
    }

    componentDidMount = () => {
        this._getItems();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    _getItems() {
      fetch('https://wwwforms.suralink.com/pong.php?accessToken=pingPONG')
            .then(result => this.result = result.json())
            .then(result => this._updateGameData(result))
            .then(clearTimeout(this.timer))
            .then(this.timer = setTimeout(_=> this._getItems(), this.state.delay));
    }

    _updateState = s => {
        let copy = JSON.parse(JSON.stringify(this.state));
        s.forEach(a => {
          a[0].length > 1?copy[a[0][0]][a[0][1]] = a[1]:copy[a[0]] = a[1];
        })
        this.setState(copy);
      }

    _updateVelocity = e => {
        this._updateState(
            [[['ball', 'velocityX'], e.target.value], 
        [['ball', 'velocityY'], e.target.value]]);
    }
    _startGame = () => {
        this.setState(() => ({ start: true }));
    }
    _stopGame = () => {
        this.setState(() => ({ start: false }));
    }
    _updateMaxScore = e => {
        this.setState({ maxScore: e.target.value<1?10:e.target.value });
    }
    _updateP1Color = e => {
        this._updateState([[['paddle1', 'color'], e.target.value]]);
    }
    _updateP2Color = e => {
        this._updateState([[['paddle2', 'color'], e.target.value]]);
    }
    _updateBallColor = e => {
        this._updateState([[['ball', 'color'], e.target.value]]);
    }
    _updateBallShape = e => {
        this._updateState([[['ball', 'shape'], e.target.value]]);
    }

    _updateGameData = data => {
        data = data.gameData;
        let keys1 = Object.keys(data),
            keys2 = [],
            state = [],
            i,
            metrics,
            prop1;
        keys1.forEach(key => (keys2.push(Object.keys(data[key]))));
        state.push([['delay'], data.newDelay]);
        for (i=1; i<keys2.length; i++) {
          metrics = data[keys1[i]];
          if (!Array.isArray(metrics)) {
            prop1 = keys1[i];
            Object.keys(data[prop1]).forEach((prop2) => {
              prop2 === 'color'?
                state.push([[prop1, prop2], '#' + data[prop1][prop2].hex]):
              state.push([[prop1, prop2], data[prop1][prop2]])
            })
      }}
        this._updateState(state);
      }

    render() {
        return (
            <main style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GameCanvas 
                        maxScore={this.state.maxScore} 
                        start={this.state.start} 
                        stopGame={this._stopGame}
                        ballColor={this.state.ball.color}
                        ballShape={this.state.ball.shape}
                        ballVelX={this.state.ball.velocityX}
                        ballVelY={this.state.ball.velocityY}
                        ballH={this.state.ball.height}
                        ballW={this.state.ball.width}
                        p1Color={this.state.paddle1.color}
                        p1W={this.state.paddle1.width}
                        p1H={this.state.paddle1.height}
                        p1Vel={this.state.paddle1.velocityY}
                        p2Color={this.state.paddle2.color}
                        p2W={this.state.paddle2.width}
                        p2H={this.state.paddle2.height}
                        p2Vel={this.state.paddle2.velocityY} />
                        
                    <GameControls 
                        start={this.state.start}
                        p1Color={this._updateP1Color}
                        p2Color={this._updateP2Color}
                        ballColor={this._updateBallColor}
                        ballShape={this._updateBallShape}
                        maxScore={this.state.maxScore} 
                        updateScore={this._updateMaxScore} 
                        startGame={this._startGame} 
                        stopGame={this._stopGame}
                        updateVel={this._updateVelocity} />
                </section>
            </main>
        )
    }
}

export default GameInterface;