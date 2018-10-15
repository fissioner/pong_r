import React from 'react';

/*
   TO-DO:
   -
*/

const panelStyle = {
   width: '100%',
   height: '300px',
   paddingTop: '20px',
   background: '#777',
   border: '2px solid #333',
   borderRadius: '3px',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'flex-start',
   alignItems: 'center'
}

const GameControls = props => {
   let { maxScore, ballVelocity } = props;
   let { _setMaxScore, _setBallVelocity, _setPaddleColor, _setBallColor, _startGame } = props;

    return (
        <article style={panelStyle}>
            <div>
               <label>Max Score:</label> &nbsp; &nbsp;
               <input style={{ width: '64px' }} onChange={_setMaxScore} value={maxScore} />
            </div><br />
            <div>
               <label>Ball Velocity:</label> &nbsp; &nbsp;
               <input type='radio' readOnly checked={ballVelocity === 1} onClick={e => _setBallVelocity(1)} /><label>slow</label> &nbsp;
               <input type='radio' readOnly checked={ballVelocity === 2} onClick={e => _setBallVelocity(2)} /><label>med</label> &nbsp;
               <input type='radio' readOnly checked={ballVelocity === 3} onClick={e => _setBallVelocity(3)} /><label>fast</label>
            </div><br />
            <div>
               <label>Paddle Colors:</label> &nbsp; &nbsp;
               <label>p1 (left)</label>&nbsp;<input type='color' onChange={e => _setPaddleColor(e, 1)} /> &nbsp; &nbsp;
               <label>p2 (right)</label>&nbsp;<input type='color' onChange={e => _setPaddleColor(e, 2)} />
            </div><br />
            <div>
               <label>Ball Color:</label> &nbsp; &nbsp;
               <input type='color' onChange={_setBallColor} />
            </div><br />
            <div>
               <button onClick={_startGame}>Start Game!</button>
            </div>
        </article>
    )
}

export default GameControls;