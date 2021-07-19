import Board from "./Board";
import {Component} from "react";
import calculateWinner from "../gameLogic/calculateWinner";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(number) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[number]) return;

    squares[number] = this.state.xIsNext ? 'X' : 'O';
    this.setState(prevState => ({
      history: history.concat([{squares}]),
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

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, moveNumber) => {
      const desc = moveNumber === 0 ?
                  'К началу игры' :
                  `Перейти к ходу #${moveNumber}`;
      return (
        <li key={moveNumber}>
          <button onClick={() => this.jumpTo(moveNumber)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) status = `Победил ${winner}`;
    else status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`

    return (
      <main>
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </main>
    );
  }
}

export default App; 