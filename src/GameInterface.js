import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';

class GameInterface extends Component {
    constructor() {
        super();
        this.state = {
            vel: 1
        }
    }

    _updateVelocity = () => {
        this.setState((ps, s) => ({ vel: (Math.floor(Math.random() * 6) + 1) }))
    }

    render() {
        return (
            <main style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <GameCanvas velocity={this.state.vel} />
                    <GameControls updateVel={this._updateVelocity} />
                </section>
            </main>
        )
    }
}

export default GameInterface;