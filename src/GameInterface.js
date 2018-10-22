import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';

class GameInterface extends Component {
    constructor() {
        super();
        this.state = {
            start: false,
            vel: 1,
            maxScore: 10,
            p1Color: 'white',
            p2Color: 'white',
            ballColor: 'white',
            ballShape: 'circle'
        }
    }

    _updateVelocity = e => {
        this.setState(({ vel: e.target.value }));
    }
    _startGame = () => {
        this.setState(() => ({ start: true }))
    }
    _updateMaxScore = e => {
        this.setState({ maxScore: e.target.value });
    }
    _updateP1Color = e => {
        this.setState({ p1Color: e.target.value })
    }
    _updateP2Color = e => {
        this.setState({ p2Color: e.target.value })
    }
    _updateBallColor = e => {
        this.setState({ ballColor: e.target.value }, () => console.log(this.state))
    }
    _updateBallShape = e => {
        this.setState({ ballShape: e.target.value })
    }

    render() {
        return (
            <main style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GameCanvas 
                        p1Color={this.state.p1Color}
                        p2Color={this.state.p2Color}
                        ballColor={this.state.ballColor}
                        ballShape={this.state.ballShape}
                        maxScore={this.state.maxScore} 
                        start={this.state.start} 
                        velocity={this.state.vel} />
                    <GameControls 
                        start={this.state.start}
                        p1Color={this._updateP1Color}
                        p2Color={this._updateP2Color}
                        ballColor={this._updateBallColor}
                        ballShape={this._updateBallShape}
                        maxScore={this.state.maxScore} 
                        updateScore={this._updateMaxScore} 
                        startGame={this._startGame} 
                        updateVel={this._updateVelocity} />
                </section>
            </main>
        )
    }
}

export default GameInterface;