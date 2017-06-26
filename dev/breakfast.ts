class Breakfast implements Subject {

    private game:Game;
    private counter:number = 0;
    private bar:HTMLElement;
    private button:HTMLElement;
    private callback:EventListener;

    public observers:Array<Observer> = new Array<Observer>();
        
    constructor() {
        this.bar = <HTMLElement> document.getElementsByTagName("bar")[0];
        this.button = <HTMLElement> document.getElementsByTagName("foodbutton")[0];
        this.button.style.cursor =  "auto";
        this.callback = (e:MouseEvent) => this.onClick(e);    
    }

    public update():void {
        this.counter = Math.min(1, this.counter + 0.003);
        this.bar.style.width = (143 * this.counter) + "px";

        if(this.counter >= 1) {
            this.button.classList.add("blinking");
            this.button.addEventListener("click", this.callback);
            this.button.style.cursor =  "pointer";
        } 
    }

    private onClick(e:MouseEvent):void {
        this.game = Game.getInstance();
        console.log("Ontbijtjes uitdelen!");
        for (let i = 0; i < this.observers.length; i++){
            this.observers[i].notify();
        }
        this.counter = 0;
        this.button.removeEventListener("click", this.callback);
        this.button.classList.remove("blinking"); 
        this.button.style.cursor =  "auto";
    }

    public subscribe(obj:Observer){
        this.observers.push(obj);
    }

    public unsubscribe(obj:Observer){
        let i:number = this.observers.indexOf(obj);
        if(i != -1) {
            this.observers.splice(i, 1);
        }
    }
}