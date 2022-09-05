class CalcController {
    constructor(){

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        this.setDisplayDateTime();

        setInterval(()=>{
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(val){
        this._operation[this._operation.length - 1] = val;
    }

    isOperator(val){
        return (['+', '-', '*', '%', '/'].indexOf(val) > -1);
    }

    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
    }

    pushOperation(val){
        this._operation.push(val);

        if(this._operation.length > 3){
            this.calc();
        }
    }

    setLastNumberToDisplay(){
        this.displayCalc(this.getLastOperation());
    }

    addOperation(val){

        if(isNaN(this.getLastOperation())){
            if(this.isOperator(val)){
                this.setLastOperation(val);
            }else if(isNaN(val)){
                console.log('Outra coisa', val);
            }else{
                this.pushOperation(val);
            }
        }else{
            if(this.isOperator(val)){
                this.pushOperation(val);
            }else{
                let newVal = this.getLastOperation().toString() + val.toString();
                this.setLastOperation(parseInt(newVal));
                this.setLastNumberToDisplay();
            }
        }

    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(val){
        switch (val){
            case 'ac':
                this.clearAll();
            break;

            case 'ce':
                this.clearEntry();
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'soma':
                this.addOperation('+');
            break;

            case 'ponto':
                this.addOperation('.');
            break;

            case 'igual':
                
            break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(val));
            break;

            default:
                this.setError();
            break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(time){
        this._timeEl.innerHTML = time;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(date){
        this._dateEl.innerHTML = date;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(val){
        this._displayCalcEl.innerHTML = val;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(date){
        this._currentDate = date;
    }
}