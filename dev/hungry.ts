class Hungry implements GandalfState  {
    private gandalf:Gandalf;
    private timer:number;

    constructor(g:Gandalf){
        this.gandalf = g;
        this.timer = 0;

        this.gandalf.div.style.backgroundImage = "url(images/"+this.gandalf.tag+"_hungry.png)";
        this.gandalf.div.style.cursor =  "auto";
        this.gandalf.setTarget();

        //subscribe to breakfast
        let game : Game = Game.getInstance();
        game.breakfast.subscribe(this.gandalf);
    }

    public onClick(){

    }

    //
    // de hungry update laat een karakter random door het beeld heen en weer lopen
    //
    public action(){
        this.gandalf.x += this.gandalf.xspeed;
        this.gandalf.y += this.gandalf.yspeed;
        let xdistance = this.gandalf.xTarget - this.gandalf.x;
        let ydistance = this.gandalf.yTarget - this.gandalf.y;
        if(xdistance < 4 && ydistance < 4) this.gandalf.setTarget();
        this.gandalf.setSpeed(xdistance, ydistance);

        this.timer++;
        if (this.timer > 300){
            this.gandalf.state = new Sleeping(this.gandalf);
        }
    }

    public notify(){
        this.gandalf.state = new Leaving(this.gandalf);
    }
}