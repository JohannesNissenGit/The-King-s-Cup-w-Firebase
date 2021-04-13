import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {

 
  @Input() game;

  name: string ='';
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }
  
  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  deleteAllPlayers() {
    console.log(this.game);
    this.game.players = [];
  }
 
}


