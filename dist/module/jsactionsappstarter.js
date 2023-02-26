import { Component, EventUtils, EventDispatcher, View as View$1, BindingUtils, ElementUtils, ViewNavigator, EventRouter, ViewManager, Router, NavigationEvent, EventBroadCaster } from 'https://www.unpkg.com/@jsactionsframework/jsactions@1.0.2/dist/jsactions.min.js';

class MyButton extends Component {

    
    /**
     *Creates an instance of MyButton.
     * @param {*} [_id=null] - "jsact-component" wrapper id
     * @param {*} [_parentViewId=null] - Parent View ID
     * @param {*} [_parentContainerId=null] - Parent Container ID
     * @param {boolean} [_createDOMElement=true] - Set "True" if HTML Template of Component generate internally.  Set - False when Template designed externally.
     * @memberof MyButton
     */
    constructor(_id = null, _parentViewId = null,_parentContainerId=null, _createDOMElement = true) {
        super(_id, _parentViewId,_parentContainerId, _createDOMElement);
    }


    /**
     *
     * Lifecycle Method
     * @param {string} [_label="Button"]
     * @param {string} [_formId="defaultform"]
     * @memberof MyButton
     */
    init(_label="Button",_formId = "defaultform") {
        this.label = _label;
        this.formId = _formId;
        // call super class init method
		super.init();
    }


    /**
     *
     * Lifecycle Method
     * @memberof MyButton
     */
    initComponent(){
        super.initComponent();
    }

    
    /**
     * Create HTML Elements for Button
     * LifeCycle Method 
     * @memberof MyButton
     */
    createDOMContent() {
		super.createDOMContent();
        let tmpCompContentEl = this.createComponentHTML();
        // Use following method to add Template to Component Wrapper
        this.addToComponentElement(tmpCompContentEl);
    }


    /**
     *
     * Call by Attached Method 
     * Implement all Event Handlers here
     * LifeCycle Method 
     * @memberof MyButton
     */
    addEventHandler() {
        super.addEventHandler();
        if(this.componentElement != null){
            let buttonEl = this.componentElement.querySelector("input[type='button']");
            buttonEl.addEventListener("click", (e) => { this.clickHandler(e); });
        }
    }

    clickHandler(event){
        event.preventDefault();
        let srcObjfrmEvt = event.target;
        console.log(srcObjfrmEvt.value + " :: HTML Button Click Event Received ::");
        console.log("MyButton Custom Click Event Dispatched");
        this.dispatchEvent(EventUtils.CLICK, this);
    }


    /**
     *
     * Implement Component Enabled here
     * this method call by "enabled" setter
     * @memberof MyButton
     */
    setComponentEnabled(){
        console.log(this.id+" Enabled = "+this.enabled);
        super.setComponentEnabled();
        let buttonEl = this.componentElement.querySelector("input[type='button']");
        if(this.enabled == false){
            buttonEl.setAttribute("disabled","disabled");
            buttonEl.classList.add("disablebutt");
        }else {
            if(buttonEl.hasAttribute("disabled")){
                buttonEl.removeAttribute("disabled");
                buttonEl.classList.remove("disablebutt");
            }
        }
    }

    /**
     *
     * Implement Component ReadOnly here
     * this method call by "readonly" setter
     * @memberof MyButton
     */
    setComponentReadOnly(){
        super.setComponentReadOnly();
    }

    /**
     *
     * call by createDOMContent
     * @memberof MyButton
     */
    createComponentHTML() {
        let btnHtml = `<input type="button" class="mybutton" value="${this.label}">`;
        return btnHtml;
    }

}

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

class HelloWorldView extends View$1 {

    constructor(_id, _route, _navevent, _navparams, _parentViewStackId) {
        super(_id, _route, _navevent, _navparams, _parentViewStackId);
    }

    initView() {
        super.initView();

        this.cmpButton1 = null;
        this.cmpButton2 = null;
        this.cmpButton3 = null;
        this.decreButton = null;
        this.myButtonModel = new HelloWorldModel();
    }

    //Overrides by SubClass
    // call by attachView
    bindView() {
        super.bindView();
        this.bindButtons();
    }

    /*
    Add HTML Element Event Handlers 
    call by attachView
    */
    addViewHandler() {
        super.addViewHandler();
        this.cmpButton2.addEventListener("click", (e) => 
        { 
            //this.bindButtons() ;
            console.log("clicked recevied"+e.target.enabled);
         });
    }



    bindButtons() {
        //let cmpButt2 = this.cmpButton2;
        //let cmpButt3 = this.cmpButton3;
        let labelEl = document.querySelector(".demobuttState");
        let labelClickEl = document.querySelector(".democlick");

        BindingUtils.addBinding(this.cmpButton1, "", "click", this.myButtonModel, "incrementClick", false);

        BindingUtils.addBinding(this.decreButton, "", "click", this.myButtonModel, "decrementClick", false);

        BindingUtils.addBinding(this.myButtonModel, "getClickCount", "incrementEvent", labelClickEl, "innerHTML", false);

        BindingUtils.addBinding(this.myButtonModel, "getClickCount", "decrementEvent", labelClickEl, "innerHTML", false);

       

        BindingUtils.addBinding(this.cmpButton2, "enabled", "click", this.myButtonModel, "setValue", false);
        BindingUtils.addBinding(this.myButtonModel, "getValue", "change", this.cmpButton3, "enabled", false);
        BindingUtils.addBinding(this.myButtonModel, "getValue", "change", labelEl, "innerHTML", false);
    }

    // call by attachView
    createViewContent() {
        let tmpViewContentEl = this.createViewHTML();
        this.addToViewElement(tmpViewContentEl);

        this.cmpButton1 = new MyButton("cmpBtn",this.id,"helloContainer",true);
        this.cmpButton1.init("My Component");
        this.cmpButton1.attach();
        this.cmpButton1.enabled = true;

        this.decreButton = new MyButton("decreBtn",this.id,"helloContainer",true);
        this.decreButton.init("Decrement Button");
        this.decreButton.attach();
        this.decreButton.enabled = true;


        
        // Add Break Element
        let buttonContEl = ElementUtils.container("helloContainer",this.id);
        //this.addBreakElement(buttonContEl);


        this.cmpButton2 = new MyButton("cmpBtn2",this.id,"bindDemoContainer",true);
        this.cmpButton2.init("Toggle Button");
        this.cmpButton2.attach();
        this.cmpButton2.enabled = true;

        // Add Break Element
        let bindContEl = ElementUtils.container("bindDemoContainer",this.id);
        this.addBreakElement(bindContEl);


        this.cmpButton3 = new MyButton("cmpBtn3",this.id,"bindDemoContainer",true);
        this.cmpButton3.init("Demo Button");
        this.cmpButton3.attach();
        this.cmpButton3.enabled = false;

        this.addBreakElement(bindContEl);
        this.addBreakElement(bindContEl);
    }

    createViewHTML() {
        let thisRef = this;
        let helloTmplHtml = `
         <div class="viewbg">
            <div>
            <p><h2>JSactionsjs AppStarter </span></h2></p>
                <p><h3>Demo 1 : View Id is - <span class="redtext">${this.id} </span></h3></p>
                <p><h4>Static View Contents Hello World !!!</h4></p>
            </div>
            <hr>
            
            <div> 
            <p><h3>Demo 2 : Verifying Passing View Parameter during navigation event</h3></p>
            <p> View Parameter Received ::: <span class="redtext">${thisRef.navParams}</span> </p>
            </div>
            <hr>
            
                <div>
                   <p> <h3>Demo 3 : Verifying Binding Custom Component Click using Model</h3></p>
                   <p> Click on below "My Component" Button to count number of clicks</p>
                   <p> <h4> "My Component" Button  Clicked <label class="democlick redtext" >0</label> times </h4></p>
                </div>
            <div class="jsact-container helloContainer"></div> 
            <hr>
            <div>
                   <p> <h3>Demo 4 : Verifying Binding Component Property using Model</h3></p>
                   <p> Click on below "Toggle Button" to Enable or Disable the "Demo Button" </p>
                   <p> <h4> "Demo Button" State : <label class="demobuttState redtext" >false</label> in Model </h4></p>
                </div>
            <div class="jsact-container bindDemoContainer"></div> 
        </div>
        `;
        return helloTmplHtml;
    }

    addBreakElement(_parentEl){
        let brakEl = `</br></br>`;
        _parentEl.insertAdjacentHTML('beforeend', brakEl);
    }

    removeViewHandler() {
        super.removeViewHandler();
    }
}

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

class AppViewManager extends ViewManager {

    initialize() {
        super.initialize();
        this.initRoutes();
    }

    createNavigator(_navigatorId, _parentId,_parentContainerId) {
        let tmpNavigator = null;
        switch (_navigatorId) {
            case "simpleNavigator":
                tmpNavigator = new SimpleNavigator(_navigatorId, _parentId,_parentContainerId);
            break;

            default:
                tmpNavigator = new ViewNavigator(_navigatorId, _parentId,_parentContainerId);

        }
        return tmpNavigator;
    }

    initRoutes() {
        let tmpRoutes = [
            { path: "/hello", navigatorId: "simpleNavigator",parentId: "root" }
        ];
        this.routes = new Router(tmpRoutes);
    }
}

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

export { AppViewManager, Application, HelloWorldModel, HelloWorldView, MyButton, SimpleNavigator };
