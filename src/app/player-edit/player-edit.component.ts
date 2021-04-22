import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.scss']
})
export class PlayerEditComponent implements OnInit {

allProfilePictures = ['2.png', 'monkey.png', 'pinguin.svg', 'serious-woman.svg', 'winkboy.svg'];

  constructor() { }

  ngOnInit(): void {
  }


}
