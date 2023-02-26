import { EventDispatcher } from 'jsactions';

class HelloWorldModel extends EventDispatcher {
    constructor() {
        super();
        this.value = false;
        this.clickCount = 1;
    }

    incrementClick(){
        this.clickCount++;
        this.dispatchEvent("incrementEvent", this);
    }

    decrementClick(){
        this.clickCount--;
        this.dispatchEvent("decrementEvent", this);
    }

    getClickCount(){
        return this.clickCount;
    }

    setValue() {
        this.value = !(this.value);
        console.log("HelloWorldModel : value = "+this.value);
        this.dispatchEvent("change", this);
    }

    getValue() {
        return this.value;
    }
}

export default HelloWorldModel;