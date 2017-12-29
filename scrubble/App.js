import Client from 'boardgame.io/client';
import Game from 'boardgame.io/game';
import React from 'react';

class TicTacToeBoard extends React.Component {
  onClick(id) {
    if (this.props.G.winner == null) {
      this.props.moves.clickCell(id);
      this.props.endTurn();
    }
  }

  render() {
    let winner = '';
    if (this.props.G.winner !== null) {
      winner = <div>Winner: {this.props.G.winner}</div>;
    }

    const cellStyle = {
      border: '1px solid #555',
      width: '50px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
    };

    let tbody = [];
    for (let i = 0; i < 3; i++) {
      let cells = [];
      for (let j = 0; j < 3; j++) {
        const id = 3 * i + j;
        cells.push(
          <td style={cellStyle}
              key={id}
              onClick={() => this.onClick(id)}>
            {this.props.G.cells[id]}
          </td>
        );
      }
      tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
      <div>
        <table id="board">
        <tbody>{tbody}</tbody>
        </table>
        {winner}
      </div>
    );
  }
}


function IsVictory(cells) {
  // Return true if cells is in a winning configuration.
}

const TicTacToe = Game({
  G: { cells: Array(9).fill(null) },

  moves: {
    clickCell(G, ctx, id) {
      const cells = [...G.cells];

      // Ensure we can't overwrite cells.
      if (cells[id] === null) {
        cells[id] = ctx.currentPlayer;
      }

      // Set winner to true if the current
      // player just won.
      let winner = null;
      if (IsVictory(cells)) {
        winner = ctx.currentPlayer;
      }

      return { ...G, cells, winner };
    }
  }
});


const App = Client({
  	game: TicTacToe,
  	board: TicTacToeBoard,
	multiplayer: true
});

export default App;

