import { View } from 'jsactions';
import { ElementUtils } from 'jsactions';
import { BindingUtils } from 'jsactions';
import MyButton from '../components/MyButton';
import HelloWorldModel from '../models/HelloWorldModel';



class HelloWorldView extends View {

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
            console.log("clicked recevied"+e.target.enabled)
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
        let brakEl = `</br></br>`
        _parentEl.insertAdjacentHTML('beforeend', brakEl);
    }

    removeViewHandler() {
        super.removeViewHandler();
    }
}

export default HelloWorldView;