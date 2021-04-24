export class Game {
    public players: string[] = [];
    public player_images: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for (let i=1; i<14; i++) {
        //  for (let i=1; i<2; i++) { ////TESTING (empty cardstack after 1 draw)////
        this.stack.push('ace_' + i);
        this.stack.push('hearts_' + i);
        this.stack.push('clubs_' + i);
        this.stack.push('diamonds_' + i);
    }
    shuffle(this.stack);
    }

    public toJson() {   //converts game object to json (firebase accepts json!)
      return {
        players: this.players,
        player_images: this.player_images,
        stack: this.stack,
        playedCards: this.playedCards,
        currentPlayer: this.currentPlayer,
        pickCardAnimation: this.pickCardAnimation,
        currentCard: this.currentCard
      }
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }