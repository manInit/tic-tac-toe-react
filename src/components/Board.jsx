import { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    return <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
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
      boardsRow.push(<div className="board-row">{ row }</div>);
    }

    return (
      <div>
        { boardsRow }
      </div>
    );
  }
}

export default Board;