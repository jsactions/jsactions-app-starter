import {EventUtils} from 'jsactions';
import {EventBroadCaster} from 'jsactions';
import {NavigationEvent} from 'jsactions';
import AppViewManager from './AppViewManager';

class Application {
    constructor() {
        this.initialize();
    }

    initialize() {
        this.viewmanager = new AppViewManager();
    }

    start() {
        let helloNavEvent = new NavigationEvent(EventUtils.NAV_CHANGE_EVENT, "Hello_NavEvent", "Message :: Hello World !!!", "/hello");
        
        //Dispatch Hello Navigation Event
        EventBroadCaster.navEventChannel.dispatchEvent(helloNavEvent);
    }

}
export default Application;