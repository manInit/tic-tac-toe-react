import Board from "./Board";
import {Component} from "react";
import calculateWinner from "../gameLogic/calculateWinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          numberCell: -1
        }
      ],
      isAsc: true,
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const winObj = calculateWinner(squares);
    if (winObj || squares[number]) return;

    squares[number] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      history: history.concat([{squares, numberCell: number}]),
      xIsNext: !prevState.xIsNext,
      stepNumber: history.length
    }));
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  sortSteps() {
    this.setState(prevState => ({
      isAsc: !prevState.isAsc
    }));
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winObj = calculateWinner(current.squares);

    const moves = history.map((step, moveNumber) => {
      const desc = moveNumber === 0 ?
                  'К началу игры' :
                  `Перейти к ходу #${moveNumber}`;
      return (
        <li key={moveNumber}>
          <button
            onClick={() => this.jumpTo(moveNumber)}
            style={moveNumber === this.state.stepNumber ? {background: 'green'} : {}}
          >
            { desc }
            {
              moveNumber === 0 ? '' :
              ` {column: ${step.numberCell % 3 + 1}, row: ${Math.trunc(step.numberCell / 3) + 1}} `
            }
          </button>
        </li>
      );
    });

    if (!this.state.isAsc) moves.reverse();

    let status, winCells = [];
    if (winObj) {
      if (winObj.winner === 'draw') {
        status = `Ничья`;
      } else {
        status = `Победил ${winObj.winner}`;
        winCells = winObj.winCells;
      }
    }
    else {
      status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <main>
        <div className="game-board">
          <Board
            squares={current.squares}
            winnerCells={winCells}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.sortSteps()}>Сортировать</button>
          <ol>{moves}</ol>
        </div>
      </main>
    );
  }
}

export default App; 