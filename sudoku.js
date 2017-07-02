"use strict"

class Sudoku {
  constructor(board_string) {
    this._board = board_string;
  }


  // 1. Cek value
  checkValue(board, baris, kolom, value) {
    return this.checkRow(board, kolom, value) && this.checkColumn(board, baris, value) && this.checkSquare(board, baris, kolom, value);
  }

  backRecheck(board, baris, kolom) {
    for (; baris < 9; kolom = 0, baris++) {
      for (; kolom < 9; kolom++) {
        if (board[baris][kolom] === 0) {
          return [baris, kolom];
        }
      }
    }
    return [-1, -1];
  }

  // 2. Cek baris
  checkRow(board, kolom, value) {
    for (let r = 0; r < 9; r++) {
      if (board[r][kolom] === value) {
        return false;
      }
    }
    return true;
  }

  // 3. Cek kolom
  checkColumn(board, baris, value) {
    for (let c = 0; c < 9; c++) {
      if (board[baris][c] === value) {
        return false;
      }
    }
    return true;
  }

  //4. Cek kotak 3x3
  checkSquare(board, baris, kolom, value) {
    let rowStart = baris - (baris % 3); //
    let columnStart = kolom - (kolom % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + rowStart][j + columnStart] === value) {
          return false;
        }
      }
    }
    return true;
  } //method

  solve(board = this._board, baris = 0, kolom = 0) {
    let cell = this.backRecheck(board, baris, kolom);
    baris = cell[0];
    kolom = cell[1];

    if (baris === -1) {
      return true;
    }

    for (let value = 1; value <= 9; value++) {
      if (this.checkValue(board, baris, kolom, value)) {
        board[baris][kolom] = value;

        if (this.solve(board, baris, kolom)) {
          return true;
        }
        board[baris][kolom] = 0;
      }
    }
    return false;
  }

  // Make the board
  // Returns a string representing the current state of the board
  board(board_string) { // v for values, b for baris, k for kolom
    let arrSplit = this._board.split('');
    let res = [];
    for (let i = 0; i < arrSplit.length; i += 9) {
      let arr = [];
      for (let j = i; j < i + 9; j++) {
        arr.push(+arrSplit[j]);
      }
      res.push(arr);
    }
    return this._board = res;
  }
} //class

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
console.log('\n');
console.log('-----Random-----');
console.log(game.board());
game.solve()

console.log('\n');
console.log('Solved');
console.log(game._board);
