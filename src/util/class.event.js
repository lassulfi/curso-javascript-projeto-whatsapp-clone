export class ClassEvent {

    constructor() {
        this._events = {};
    }

    on(eventName, event) {
        if(!this._events[eventName]) this._events[eventName] = new Array();

        this._events[eventName].push(event);        
    }

    trigger() {
        let args = [...arguments];
        let eventName = args.shift();

        args.push(new Event(eventName));

        if(this._events[eventName] instanceof Array) {
            this._events[eventName].forEach(event => {
                event.apply(null, args);
            });
        }
    }
}