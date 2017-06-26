class Leaving implements GandalfState  {
    private gandalf:Gandalf;

    constructor(g:Gandalf){
        this.gandalf = g;

        this.gandalf.div.style.backgroundImage = "url(images/"+this.gandalf.tag+"_leaving.png)";
        this.gandalf.div.style.cursor =  "auto";
        this.gandalf.xTarget = Math.random() * window.innerWidth;
        this.gandalf.yTarget = window.innerHeight + 300;
        this.gandalf.speedmultiplier += 1;
    }

    public onClick(){

    }

    //
    // de leaving update laat een karakter uit beeld lopen
    //
    public action(){
        this.gandalf.x += this.gandalf.xspeed;
        this.gandalf.y += this.gandalf.yspeed;
        let xdistance = this.gandalf.xTarget - this.gandalf.x;
        let ydistance = this.gandalf.yTarget - this.gandalf.y;

        this.gandalf.setSpeed(xdistance, ydistance);

        if(xdistance < 4 && ydistance < 4) {
            console.log("het karakter is uit beeld");
            this.gandalf.sendCard();
        }
    }

    public notify(){

    }
}