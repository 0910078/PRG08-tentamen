class Game {
    private static instance: Game;
    
    public breakfast:Breakfast;
    private gandalfAmount:number;
    private orcAmount:number;
    private gameObjects = new Array<GameObject>();

    constructor() { 
        this.breakfast = new Breakfast();

        //maak een random aantal gandalfs aan
        this.gandalfAmount = Math.floor(Math.random() * 8) + 1;
        for (let g = 0; g < this.gandalfAmount; g++){
            this.gameObjects.push(new Gandalf());
        }

        //maak een random aantal orcs aan
        this.orcAmount = Math.floor(Math.random() * 8) + 1;
        for (let o = 0; o < this.orcAmount; o++){
            this.gameObjects.push(new Ork());
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    //Singleton
    public static getInstance() {
        if (! Game.instance) {
        Game.instance = new Game();
        }
        return Game.instance;
    }
    
    private gameLoop(){
        this.breakfast.update();
        
        //update gameobjects
        for (let i = 0;i < this.gameObjects.length;i++){
            this.gameObjects[i].update();
        }

        requestAnimationFrame(() => this.gameLoop());
    }


    // demo code om een object uit een array te verwijderen
    /*
    private removeFromArray(object:something){
        let i:number = this.array.indexOf(object);
        if(i != -1) {
            this.array.splice(i, 1);
        }
    }
    */
} 