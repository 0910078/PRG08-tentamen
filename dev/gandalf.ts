/// <reference path="gameObject.ts" />

class Gandalf extends GameObject implements Observer {

    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public facing:number = 1;
    public div: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public width:number;
    public height:number;
    public state:GandalfState;
    
    public xTarget:number;
    public yTarget:number;
    public callback:EventListener;
    public tag:string;
    public card: Card;
    public inMordor: boolean;
        
    constructor() {
        super();

        this.x = Math.random() * (window.innerWidth - 67);
        this.y = Math.random() * (window.innerHeight - 110);
        this.speedmultiplier = Math.random() + 1;

        this.tag = "gandalf";
        this.div = document.createElement(this.tag);
        document.body.appendChild(this.div);
        this.div.style.backgroundImage = "url(images/"+this.tag+"_hungry.png)";

        // we slaan de click handler op in een variabele zodat we die makkelijk een listener kunnen toevoegen en verwijderen als het nodig is
        this.callback = (e:MouseEvent) => this.onClick(e);

        this.inMordor = false;
        this.state = new Sleeping(this);
    }

    // update afhankelijk van de action
    public update(){
        this.state.action()

        // in scherm tekenen
        this.facing = (this.xspeed > 0) ? -1 : 1;
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scale("+this.facing+",1)";
    }

    public onClick(e:MouseEvent):void {
        this.state.onClick();
    }

    // een random doel om naartoe te lopen
    public setTarget(){
        this.xTarget = Math.random() * (window.innerWidth-80);
        this.yTarget = Math.random() * (window.innerHeight-120);
    }


    // deze functie rekent de loopsnelheid uit
    public setSpeed(xdist:number, ydist:number):void {
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);
        this.xspeed = xdist/distance;
        this.yspeed = ydist/distance;

        this.xspeed *= this.speedmultiplier;
        this.yspeed *= this.speedmultiplier;
    }

    public sendCard(){
        if (this.inMordor == false){
            this.card = new Card(this.x);
            this.div.remove();
            this.inMordor = true;
        }
    }

    public notify(){
        this.state.notify();
    }
}