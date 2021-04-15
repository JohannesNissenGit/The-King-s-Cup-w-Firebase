import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog'; //, MatDialogRef, MAT_DIALOG_DATA
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  game!: Game;
  gameId!: string;

  constructor(private router: Router, private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;
      this            //firestore valuechanges download
        .firestore
        .collection('games')
        .doc(this.gameId) //get url 
        .valueChanges()
        .subscribe((game: any) => {
          console.log('Game update: ', game);
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.currentCard = game.currentCard
        });
    });



  }

  //create new game
  newGame() {
    this.game = new Game();

  }

  //pick top card
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      console.log(this.game.currentCard);
      this.game.pickCardAnimation = true;  //animate top card
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;   //cycle current player after each drawn card
      this.saveGame();
      
      setTimeout(() => {
        document.getElementById('topcard')?.classList.add('d-none');
      }, 1000);

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard); //push played card into playedCards array
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  //add player
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name)
        console.log('Player ' + name + ' added.');
        this.saveGame(); 
      }
    });
  }

  /*//clear players
  deleteAllPlayers() {
    this.game.players = [];
  }*/

  /**
   * saves current state of game, transfer to firebase 
   */
  saveGame() {
    this            //firestore valuechanges download
      .firestore
      .collection('games')
      .doc(this.gameId) //get url 
      .update(this.game.toJson());
  }

}
