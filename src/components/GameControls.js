import React, { Component } from 'react'

export default class GameControls extends Component {
    render() {
        var white = { color: 'white' };
        //Replace disabled value with this.stat.start after double-click start button resolved.
        return (
            <article>
                <button onClick={this.props.startGame} >Start</button>
                <label style={white}>Velocity: </label>
                <select onChange={this.props.updateVel} >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>

                </select>
                <label style={white}>Max Score: </label>
                <input onChange={this.props.updateScore} value={this.props.maxScore} placeholder='10' type='number' />
                <label style={white}>Player 1: </label>
                <select onChange={this.props.p1Color} >
                    <option value='white'>white</option>
                    <option value='red'>red</option>
                    <option value='green'>green</option>
                    <option value='purple'>purple</option>
                </select>
                <label style={white}>Player 2: </label>
                <select onChange={this.props.p2Color} >
                    <option value='white'>white</option>
                    <option value='blue'>blue</option>
                    <option value='pink'>pink</option>
                    <option value='yellow'>yellow</option>
                </select>
                <label style={white}>Ball Color: </label>
                <select onChange={this.props.ballColor} >
                    <option value='white'>white</option>
                    <option value='black'>black</option>
                    <option value='brown'>brown</option>
                    <option value='orange'>orange</option>
                </select>
                <label style={white}>Ball Shape: </label>
                <select onChange={this.props.ballShape} >
                    <option value='circle'>circle</option>
                    <option value='square'>square</option>
                    <option value='triangle'>triangle</option>
                </select>
            </article>
        )
    }
}
