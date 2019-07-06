import React, { Component } from "react";
import Row from "../Components/Row";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 'red',
      player2: 'yellow',
      currentPlayer: null,
      gameBoard: [],
      gameOver: false,
      message: '',
    };
  }

  componentWillMount = () => {
    this.startGame();
  }

  renderRows = () => {
    return this.state.gameBoard.map((row, i) => {
      return <Row row={row} key={i} move={this.move} />;
    });
  };

  startGame = () => {
    let newBoard = [];
    for (let r = 0; r < 6; r++) {
      let row = [0, 0, 0, 0, 0, 0, 0];
      newBoard.push(row);
    }

    this.setState(prevState => {
      return {
        gameBoard: newBoard,
        gameOver: !prevState.gameOver,
        currentPlayer: this.state.player1,
        message: 'Click Start Game to begin'
      }
    });
  };

  move = (column) => { // Places moves on the board, changes player state, check board status
    if (!this.state.gameOver) {
      let currentBoard = this.state.gameBoard;
      this.setState({ message: 'Game has begun!'})
      for (let row = 5; row >= 0; row--) {
        if (!currentBoard[row][column]) {
          currentBoard[row][column] = this.state.currentPlayer;
          this.togglePlayer();
          break;
        }
      }
      this.checkBoardStatus(currentBoard)
    }
  }

  checkBoardStatus = (currentBoard) => { // Changes game state
    let result = this.checkForWinner(currentBoard);
    if (result === this.state.player1) {
      this.setState((prevState) => {
        return {
          gameBoard: currentBoard,
          gameOver: !prevState.gameOver,
          message: 'Player 1 Wins!'
        }
      })
    } else if (result === this.state.player2) {
      this.setState((prevState) => {
        return {
          gameBoard: currentBoard,
          gameOver: !prevState.gameOver,
          message: 'Player 2 Wins!'
        }
      });
    } else if (result === 'draw') {
      this.setState((prevState) => {
        return {
          gameBoard: currentBoard,
          gameOver: !prevState.gameOver,
          message: 'DRAW! Play Again!'
        }
      });
    } 
  }

  checkForWinner = (currentBoard) => { // Controller function responsible for checking possible win
    return this.verticalCheck(currentBoard) || this.horizontalCheck(currentBoard) || 
           this.drawCheck(currentBoard) || this.diagonalLeftCheck(currentBoard) || 
           this.diagonalRightCheck(currentBoard)
  }

  verticalCheck = (currentBoard) => { // Checks vertical win
    for (let row=3; row<6; row++) {
      for (let col=0; col<7; col++) {
        if (currentBoard[row][col]) {
          if (currentBoard[row][col] === currentBoard[row-1][col] &&
              currentBoard[row][col] === currentBoard[row-2][col] &&
              currentBoard[row][col] === currentBoard[row-3][col]) {
            return currentBoard[row][col];
          }
        }
      }
    }
  }
  
  horizontalCheck = (currentBoard) => { // Checks horizontal win
    for (let row=0; row<6; row++) {
      for (let col=0; col<4; col++) {
        if (currentBoard[row][col]) {
          if (currentBoard[row][col] === currentBoard[row][col+1] &&
              currentBoard[row][col] === currentBoard[row][col+2] &&
              currentBoard[row][col] === currentBoard[row][col+3]) {
            return currentBoard[row][col];
          }
        }
      }
    }
  }

  drawCheck = (currentBoard) => { // Checks for draw
    for (let row=0; row<6; row++) {
      for (let col=0; col<7; col++) {
        if (currentBoard[row][col] === 0) {
          return 0;
        }
      }
    }
    return 'draw';
  }

  diagonalLeftCheck = (currentBoard) => {
    for (let row=3; row<6; row++) {
      for (let col=3; col<7; col++) {
        if (currentBoard[row][col]) {
          if (currentBoard[row][col] === currentBoard[row-1][col-1] &&
              currentBoard[row][col] === currentBoard[row-2][col-2] &&
              currentBoard[row][col] === currentBoard[row-3][col-3]) {
            return currentBoard[row][col];
          }
        }
      }
    }
  }

  diagonalRightCheck = (currentBoard) => {
    for (let row=3; row<6; row++) {
      for (let col=0; col<4; col++) {
        if (currentBoard[row][col]) {
          if (currentBoard[row][col] === currentBoard[row-1][col+1] &&
              currentBoard[row][col] === currentBoard[row-2][col+2] &&
              currentBoard[row][col] === currentBoard[row-3][col+3]) {
            return currentBoard[row][col];
          }
        }
      }
    }
  }

  togglePlayer = () => {
    const current = this.state.currentPlayer;
    if (current === 'red') {
      this.setState(() => {
        return {
          currentPlayer: this.state.player2        
        }
      })
    } else {
      this.setState(() => {
        return {
          currentPlayer: this.state.player1
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="center col s12">
              <img width="350px" alt="connect four logo" src="https://famfonts.com/wp-content/uploads/connect-four-wide.png" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <table>
              <tbody>{this.renderRows()}</tbody>
            </table>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <button className="waves-effect waves-light btn-large green col s2" onClick={this.startGame} >
              {this.state.gameOver ? 'Start Game!' : 'End Game'}
            </button>
            <h5 className="col s4 left">
              Turn: {this.state.currentPlayer === 'red' ? 'Player 1' : 'Player 2'}
            </h5>
            <h5 className="col s6 right">
              {this.state.message}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
