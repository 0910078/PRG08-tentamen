class Sleeping implements GandalfState  {
    private gandalf:Gandalf;

    constructor(g:Gandalf){
        this.gandalf = g;

        this.gandalf.div.style.backgroundImage = "url(images/"+this.gandalf.tag+"_sleep.png)";
        this.gandalf.div.style.cursor =  "pointer";
        this.gandalf.div.addEventListener("click", this.gandalf.callback);
    }

    public onClick(){
        console.log("je klikt op gandalf. de listener wordt nu verwijderd.");
        this.gandalf.div.style.cursor =  "auto";
        this.gandalf.div.removeEventListener("click", this.gandalf.callback);

        this.gandalf.state = new Hungry(this.gandalf);
    }

    public action(){

    }

    public notify(){
        
    }
}