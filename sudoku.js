
//================================
"use strict"

class Sudoku {
  constructor(board_string) {
    this.boardStringDigitArray = board_string.match(/\d{9}/g);
    this.game = this.boardStringDigitArray.map(function(array) {
      array = array.split("");
      return array;
    })
    this.fullNumArray = "123456789".split("");
  }

  solve() {
    for (let i=0; i<this.game.length; i++) {
      for (let j=0; j<this.game[0].length; j++) {
         console.log(this.board());
        if (this.game[i][j] == 0) {
          for (let hitNum in this.fullNumArray) {
            if (this.check(i,j,this.fullNumArray[hitNum])) {
              this.game[i][j] = this.fullNumArray[hitNum];
              let allCheck = this.solve();
              if (allCheck === true) return true;
                this.game[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  check(Horizontal, Vertical, hitNum){
    let H=false, V=true, D = true;
    H = !this.game[Horizontal].includes(hitNum);
    for (let i=0; i<this.game.length; i++) {
      if (this.game[i][Vertical] == hitNum){
        V = false;
        break;
      }
    }
    let mHorizontal = Horizontal-Horizontal%3;
    let mVertical = Vertical-Vertical%3;
    for (let i=mHorizontal; i<mHorizontal+3; i++) {
      for (let j=mVertical; j<mVertical+3; j++) {
        if (this.game[i][j] == hitNum) {
          D = false;
          break;
        }
      }
    }
    return H && V && D;
  }

  board() {
    let allBoard = "";
    let Line = "=====================";
    allBoard += Line +"\n" ;
    for (let i=0; i<this.game.length; i++) {
      for (let j=0; j<3; j++) {
        let onePlace = this.game[i].slice(j*3,j*3+3).join(" ");
        allBoard += onePlace;
        if (j!=2) allBoard += " | ";
      }
      allBoard += "\n";
      if ((i+1)%3===0) allBoard += Line + "\n";
    }
    return allBoard;
  }
}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var game = new Sudoku(board_string)

// Remember: this will just fill out what it can and not "guess"
game.solve()
