import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog} from '@angular/material/dialog'; //, MatDialogRef, MAT_DIALOG_DATA
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
    console.log(this.game);
  }

  //create new game
  newGame() {
    this.game = new Game();
  }

  //pick top card
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      console.log(this.currentCard);
      this.pickCardAnimation = true;  //animate top card

      this.game.currentPlayer ++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;   //cycle current player after each drawn card

      setTimeout(() => {
        document.getElementById('topcard')?.classList.add('d-none');
      }, 1000);
      
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard); //push played card into playedCards array
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  //add player
    openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length>0) {
      this.game.players.push(name) 
      console.log('Player ' + name + ' added.');}
    });
  }

  /*//clear players
  deleteAllPlayers() {
    this.game.players = [];
  }*/

 
}
