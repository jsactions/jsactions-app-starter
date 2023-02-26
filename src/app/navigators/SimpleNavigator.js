import { ViewNavigator } from 'jsactions';
import { EventRouter } from 'jsactions';
import HelloWorldView from '../views/HelloWorldView';

class SimpleNavigator extends ViewNavigator {
    constructor(_id, _parentId,_parentContainerId) {
        super(_id, _parentId,_parentContainerId);
    }

    initNavigator() {
        this.history = false;
        this.initEventRoutes();
    }

    createView(_viewId, _route, _navevent, _navparams, _viewStackId) {
        let tmpView = null;
        switch (_viewId) {
            case "helloview":
                tmpView = new HelloWorldView(_viewId, _route, _navevent, _navparams, _viewStackId);
                break;
            default:
                tmpView = new View(_viewId, _route, _navevent, _navparams, _viewStackId);
                break;

        }
        return tmpView;
    }

    initEventRoutes() {
        let helloEvntRoutes = [
            { navEvent: "Hello_NavEvent", viewstackId: "HelloWorldStack", viewId: "helloview", path: "/hello" }
        ];
        this.eventRouter = new EventRouter(helloEvntRoutes);
    }
}
export default SimpleNavigator;