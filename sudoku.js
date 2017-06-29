"use strict";

class Sudoku {
  constructor(board_string) {
    // this.arr = board_string.match(/\d{9}/g);
    this.arr = board_string;
  }


  // -------------------- preparation --------------------
  parseBoard() {
    let arr = this.arr.match(/\d{9}/g);
    let parsed = [];

    for (var i = 0; i <= arr.length - 1; i++) {
      let temp = [];
      for (var j = 0; j <= arr[i].length - 1; j++) {
        temp.push(parseInt(arr[i][j]));
      }
      parsed.push(temp);
    }
    return parsed;
  }

  emptyCell() {
    let emptyArr = [];
    let board = this.parseBoard();
    for (var i = 0; i <= board.length - 1; i++) {
      for (var j = 0; j <= board[i].length - 1; j++) {
        if (board[i][j] == 0) emptyArr.push([i, j]);
      }
    }
    return emptyArr;
  } // --- method emptyCell


  // -------------------- checker --------------------
  checkRow(board, row, val) {
    for (var i = 0; i <= board[row].length - 1; i++) {
      if (board[row][i] == val) return false;
    }
    return true;
  } // --- method checkRow

  checkCol(board, col, val) {
    for (var i = 0; i <= board.length - 1; i++) {
      if (board[i][col] == val) return false;
    }
    return true;
  } // --- method checkCol

  check3x3(board, row, col, val) {
    let rowCorner = row - (row % 3);
    let colCorner = col - (col % 3);

    for (var i = rowCorner; i < rowCorner + 3; i++) {
      for (var j = colCorner; j < colCorner + 3; j++) {
        if (board[i][j] == val) return false;
      }
    }
    return true;
  } // --- method check3x3

  checkVal(board, col, row, val) {
    if (this.checkRow(board, row, val) && this.checkCol(board, col, val) && this.check3x3(board, row, col, val)) return true;
    else return false;
  } // --- method checkVal


  // -------------------- unsolved & solved --------------------
  unsolved(arr = this.parseBoard()) {
    return this.board(arr);
  } // --- method unsolved

  solved(board = this.parseBoard(), empty = this.emptyCell()) {
    for (var i = 0; i < empty.length;) {
      let row = empty[i][0];
      let col = empty[i][1];
      let val = board[row][col] + 1;
      let solved = false;

      while(!solved && val <= 9) {
        if (this.checkVal(board, col, row, val)) {
          solved = true;
          board[row][col] = val;
          i++;
        } else val++;
      }

      if (!solved) {
        board[row][col] = 0;
        i--;
      }
    }

    return this.board(board);

  } // --- method solve


  // -------------------- printer --------------------
  // Returns a string representing the current state of the board
  board(arr) {
    const horLine = '---------------------\n';
    // let arr = this.parseBoard();
    let sudoString = horLine;

    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (col + 1 == 9) {
          sudoString += `${arr[row][col]}`;
        } else if (((col + 1) % 3 == 0 ) && (col < 8)) {
          sudoString += `${arr[row][col]} | `;
        } else {
          sudoString += `${arr[row][col]} `;
        }
      }

      if ((row + 1) % 3 == 0) {
        sudoString += `\n${horLine}`;
      } else {
        sudoString += '\n';
      }
    }

    return sudoString;
  } // --- method board

}  // --------------- class Sudoku ---------------

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
// var board_string = fs.readFileSync('set-02_project_euler_50-easy-puzzles.txt')
// var board_string = fs.readFileSync('set-03_peter-norvig_95-hard-puzzles.txt')
// var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);

// Remember: this will just fill out what it can and not "guess"

console.log('=====================');
console.log('\nunsolved case');
console.log(game.unsolved());
console.log('=====================');
console.log('\nsolved case');
console.log(game.solved());
