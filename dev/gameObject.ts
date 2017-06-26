abstract class GameObject{
    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public facing:number = 1;
    public div: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public width:number;
    public height:number;

    constructor(){
        this.width = 67;
        this.height = 119;
    }

    public update(){

    }

    public setTarget(){

    }

    public setSpeed(xdist:number, ydist:number){

    }
}