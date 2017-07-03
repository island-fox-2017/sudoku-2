"use strict"

class Sudoku {
  constructor(board_string) {
    this.Board = board_string;
  }

  checkRow(board, col, point) {
    for (let row = 0; row < 9; row++){
      if (board[row][col] === point){
        return false;
      }
    }
    return true;
  }

  checkCol(board, row, point) {
    for (let col = 0; col < 9; col++){
      if (board[row][col] == point){
        return false;
      }
    }
    return true;
  }

  checkSquare(board,row,col,point) {
    let startrow=row-row%3;
    let startcol=col-col%3;

    for (let row=0; row<3; row++){
      for (let col=0; col<3; col++){
        if (board[row+startrow][col+startcol] == point){
          return false;
        }
      }
    }
    return true;
  }

  checkDouble(board,row,col,point) {
    return this.checkRow(board,col,point) && this.checkCol(board,row,point) && this.checkSquare(board,row,col,point);
  }

  checkBack(board,row,col) {
    debugger
    for(let row = 0; row < 9; col = 0, row++){
      for (let col = 0; col < 9; col++){
        if (board[row][col] == 0){
          return [row,col];
        }
      }
    }
    return [-1,-1];
  }

  solve(board=this.Board, row=0, col=0) {
    let cell = this.checkBack(board,row,col);
    row = cell[0];
    col = cell[1];

    if (row == -1) {
      return true;
    }

    for (let point=1; point<=9; point++) {
      if (this.checkDouble(board,row,col,point)) {
        board[row][col]=point;

        if (this.solve(board,row,col)) {
          return true;
        }
        board[row][col] = 0;
      }
    }
    return false;
  }

  board() {
    let arrSplit=this.Board.split('');
    let res=[];
    for(let i=0; i<arrSplit.length;i+=9){
      let arr=[];
        for(let j=i; j<i+9; j++){
          arr.push(+arrSplit[j]);
        }
      res.push(arr)
    }
    return this.Board=res;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
let fs = require('fs')
let board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
.toString()
.split("\n")[0]

let game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log('\n')
console.log('random');
console.log(game.board())
game.solve()
console.log('\n')
console.log('solved');
console.log(game.Board);
