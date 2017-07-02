"use strict"

class Sudoku {
  constructor(board_string) {
    this.board_string = board_string;
    this.papan = [];
  }

  periksaBaris(papan, baris, nilai) {
    for (let k = 0; k < 9; k++) {
      if (papan[baris][k] === nilai) {
        return false;
      }
    }
    return true;
  }

  periksa1Kolom(papan, kolom, nilai) {
    for (let k = 0; k < 9; k++) {
      if (papan[k][kolom] === nilai) {
        return false;
      }
    }
    return true;
  }

  periksa3x3(papan, baris, kolom, nilai) {
    let barisPermulaan = baris - (baris % 3);
    let kolomPermulaan = kolom - (kolom % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (papan[i + barisPermulaan][j + kolomPermulaan] === nilai) {
          return false;
        }
      }
    }
    return true;
  }

  pemeriksaanNilai(papan, baris, kolom, nilai) {
    return this.periksaBaris(papan, baris, nilai) && this.periksa1Kolom(papan, kolom, nilai) && this.periksa3x3(papan, baris, kolom, nilai);
  }

  pemeriksaanBarisKolom3X3(papan, baris, kolom) {
    for (let baris = 0; baris < 9; baris++) {
      for (let kolom = 0; kolom < 9; kolom++) {
        if (papan[baris][kolom] === 0) {
          return [baris, kolom];
        }
      }
    }
    return [-1, -1];
  }

  solve(papan = this.board(), baris = 0, kolom = 0) {
    let index = this.pemeriksaanBarisKolom3X3(papan, baris, kolom);
    baris = index[0];
    kolom = index[1];
    if (baris === -1) {
      return true;
    }
    for (let nilai = 1; nilai <= 9; nilai++) {
      if (this.pemeriksaanNilai(papan, baris, kolom, nilai)) {
        papan[baris][kolom] = nilai;
        if (this.solve(papan, baris, kolom)) {
          return true;
        }
        papan[baris][kolom] = 0;
      }
    }
    return false;
  }

  board() {
    //mengatur angka inputan ke dalam array
    for (let baris = 0; baris < 9; baris++) {
      this.papan[baris] = [];
      for (let kolom = 0; kolom < 9; kolom++) {
        if (baris == 0) this.papan[baris][kolom] = parseInt(this.board_string[kolom]);
        if (baris == 1) this.papan[baris][kolom] = parseInt(this.board_string[kolom+9]);
        if (baris == 2) this.papan[baris][kolom] = parseInt(this.board_string[kolom+18]);
        if (baris == 3) this.papan[baris][kolom] = parseInt(this.board_string[kolom+27]);
        if (baris == 4) this.papan[baris][kolom] = parseInt(this.board_string[kolom+36]);
        if (baris == 5) this.papan[baris][kolom] = parseInt(this.board_string[kolom+45]);
        if (baris == 6) this.papan[baris][kolom] = parseInt(this.board_string[kolom+54]);
        if (baris == 7) this.papan[baris][kolom] = parseInt(this.board_string[kolom+63]);
        if (baris == 8) this.papan[baris][kolom] = parseInt(this.board_string[kolom+72]);
      }
    }
    return this.papan;
  }

  print_board(papan = this.papan) {
    // membuat tampilannya
    let papanSudoku = "";
    let garisPemisah = "---------------------";
    papanSudoku = `${garisPemisah} \n`;
    for (let i = 0; i < papan.length; i++) {
      for (let j = 0; j < 3; j++) {
        let potongTiga = papan[i].slice(j*3, j*3+3).join(' ');
        papanSudoku += `${potongTiga}`;
        if (j!= 2) papanSudoku += ' | ';
      }
      //memberikan enter setiap 9 baris terpenuhi
      papanSudoku += '\n';
      //memberikan garis pemisah setiap jeda 3 kolom
      if ((i+1) % 3 == 0) papanSudoku += `${garisPemisah} \n`;
    }
    return papanSudoku;
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
console.log(game.print_board());
