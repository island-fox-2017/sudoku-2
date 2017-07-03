"use strict"

class Sudoku {
  constructor(board_string) {
    this.sudo = board_string;
  }

  //merubah format board string menjadi multi array return nestedArray
  parseBoard(){
    let array = this.sudo.match(/\d{9}/g);
    let nestedArray = [];

    for(let i = 0; i < array.length; i++)
    {
      let temp = [];
      for(let j = 0; j < array.length; j++)
      {
        temp.push(parseInt(array[i][j]));
      }
      nestedArray.push(temp);
    }
    return nestedArray;
  }

  //menyimpan location dari cell yang belum di isi dan mereturn array dari location cell tsb
  emptyCell(){
    let emptyArr = [];
    let board = this.parseBoard();

    for(let i = 0; i < board.length; i++)
    {
      for(let j = 0; j < board[i].length; j++)
      {
          if(board[i][j] == 0)
          {
            emptyArr.push([i,j]);
          }
      }
    }
    return emptyArr;
  }

  /*checker*/

  //row checker, mengecek di setiap baris apakah ada yang sama
  rowChecker(board, row, value){
    for(let i = 0; i < board.length; i++)
    {
      if(board[row][i] == value)
      {
        return false;
      }
    }
    return true;
  }

  //col checker, mengecek di setiap col apakah ada yang sama
  colChecker(board, col, value){
    for(let i = 0; i < board.length; i++)
    {
      if(board[i][col] == value)
      {
        return false;
      }
    }
    return true;
  }

  checker3x3(board, row, col, value){
    let rowCorner = row - (row % 3);
    let colCorner = col - (col % 3);

    for(let i = rowCorner; i < rowCorner +3; i++)
    {
      for(let j = colCorner; j < colCorner +3; j++)
      {
        if(board[i][j] == value)
        {
          return false;
        }
      }
    }

    return true;
  }

  valueChecker(board, row, col, value)
  {
    if(this.rowChecker(board, row, value) && this.colChecker(board, col, value) && this.checker3x3(board, row, col, value))
    {
      return true;
    }
    else {
      return false;
    }
  }
  //end checker

  solve() {
    let board = this.parseBoard();
    let empty = this.emptyCell();

    for(let i = 0; i < empty.length;)
    {
      let row = empty[i][0];
      let col = empty[i][1];
      let value = board[row][col] + 1;
      let solve = false;

      while(!solve && value <= 9)
      {
        if(this.valueChecker(board, row, col, value))
        {
          solve = true;
          board[row][col] = value;
          i++;
        }
        else {
          value++;
        }
      }
      if(!solve)
      {
        board[row][col] = 0;
        if(i !== 0)
        {
          i--;
        }
      }
    }
    return this.board(board);
  }


  // Returns a string representing the current state of the board
  board(arr) {
    let string = '-----------------------------\n';
    for(let i = 0; i < 9; i++)
    {
      for(let j = 0; j < 9; j++)
      {
        if((j+1) % 3 == 0 && j < 8)
        {
          string += ` ${arr[i][j]} |`;
        }
        else {
          string += ` ${arr[i][j]} `;
        }
      }
      if((i+1) % 3 == 0)
      {
        string+= '\n-----------------------------\n';
      }
      else {
        string+= '\n';
      }
    }
    return string;
  }



}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs');
// var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
var board_string = fs.readFileSync('set-02_project_euler_50-easy-puzzles.txt')
// var board_string = fs.readFileSync('set-03_peter-norvig_95-hard-puzzles.txt')
// var board_string = fs.readFileSync('set-04_peter-norvig_11-hardest-puzzles.txt')
  .toString()
  .split("\n")[0];

var game = new Sudoku(board_string);


// Remember: this will just fill out what it can and not "guess"
console.log(game.solve())
