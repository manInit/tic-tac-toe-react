import { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            isWinner={this.props.winnerCells.includes(i)}
          />;
  }

  render() {
    const rowCount = 3;
    const boardsRow = [];

    let number = 0;
    for (let i = 0; i < rowCount; i++) {
      const row = [];
      for (let j = 0; j < rowCount; j++) {
        row.push(this.renderSquare(number++));
      }
      boardsRow.push(<div className="board-row" key={i}>{ row }</div>);
    }

    return (
      <div>
        { boardsRow }
      </div>
    );
  }
}

export default Board;