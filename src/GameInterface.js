import React, { Component } from 'react';

import GameCanvas from './components/GameCanvas';
import GameControls from './components/GameControls';

class GameInterface extends Component {
   constructor() {
      super();
      this.state = {
         gameInitted: false,
         maxScore: 10,
         ballVelocity: 1,
         p1Color: '#FFFFFF',
         p2Color: '#FFFFFF',
         ballColor: '#FF0000'
      }
   }

   _setMaxScore = e => {
      let score = parseInt(e.target.value) || '';
      this.setState((ps, s) => ({ maxScore: score, gameInitted: 'run' }));
   }

   _setBallVelocity = i => this.setState((ps, s) => ({ ballVelocity: i, gameInitted: 'run' }))

   _setPaddleColor = (e, p) => {
      let update = {};
      update[`p${p}Color`] = e.target.value;
      update.gameInitted = 'run';
      this.setState((ps, s) => update);
   }

   _setBallColor = e => {
      let color = e.target.value
      this.setState((ps, s) => ({ ballColor: color, gameInitted: 'run' }))
   }

   _startGame = () => this.setState((ps, s) => ({ gameInitted: 'start' }))

   render() {
      let { gameInitted, maxScore, ballVelocity, p1Color, p2Color, ballColor } = this.state;
      let { _setMaxScore, _setBallVelocity, _setPaddleColor, _setBallColor, _startGame } = this;
      const canvasProps = { gameInitted, maxScore, ballVelocity, p1Color, p2Color, ballColor };
      const controlProps = { maxScore, ballVelocity, _setMaxScore, _setBallVelocity, _setPaddleColor, _setBallColor, _startGame }
      console.log('canvasProps: ', canvasProps)
      console.log('controlProps: ', controlProps)
      return (
         <main style={{ width: '100vw', height: '100vh', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <GameCanvas {...canvasProps} />
               <GameControls {...controlProps} />
            </section>
         </main>
      )
   }
}

export default GameInterface;

/*
   let { ballVelocity } = props;
   let { _setMaxScore, _setBallVelocity, _setPaddleColor, _setBallColor } = props;
*/