interface Subject{
    observers:Array<Observer>;
    subscribe(obj:Observer):void;
    unsubscribe(obj:Observer):void;
}