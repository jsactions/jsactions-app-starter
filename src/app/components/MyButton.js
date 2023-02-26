import {Component} from 'jsactions';
import {Event} from 'jsactions';
import {EventUtils} from 'jsactions';

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
        console.log("MyButton Custom Click Event Dispatched")
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
        }else{
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

export default MyButton;