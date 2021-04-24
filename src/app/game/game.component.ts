import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog'; //, MatDialogRef, MAT_DIALOG_DATA
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerEditComponent } from '../player-edit/player-edit.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {


  game!: Game;
  gameId!: string;
  gameOver:boolean = false;

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
          this.game.player_images = game.player_images;
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
    if (this.game.players.length > 0) {  //checks if players exists
      if (this.game.stack.length == 0) { //checks if card stack is empty
        this.gameOver = true;
      }
      else
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
    else {
      alert('Please add players before starting the game (+ Button).')
    }
  }

  //add player
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
     if (name && name.length > 0) {
       this.game.players.push(name);
       this.game.player_images.push('monkey.png')
       this.saveGame();
     }
    });
  }

  
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


 /*//edit player image
  }*/
  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(PlayerEditComponent);  
    dialogRef.afterClosed().subscribe((change: string) => {
      if(change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId,1);
this.game.player_images.splice(playerId,1);
        }
        else {
     this.game.player_images[playerId] = change;}
     this.saveGame();}
    });
  }
}
