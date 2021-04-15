import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firestore } from 'firebase';
import { Game } from 'src/models/game';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  newGame() {
    //Start New Game
   let game = new Game;
   this.firestore    //firestore upload
   .collection('games')
   .add(game.toJson()) //see game.ts
   .then((gameInfo:any) => {

this.router.navigateByUrl('/game/' + gameInfo.id);
   } );
    
  }

}
