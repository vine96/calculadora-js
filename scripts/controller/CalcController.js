class CalcController {
    constructor(){
        this._displayCalc = "0";
        this._dataAtual;
        this.initialize();
    }

    initialize(){
        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "28/08/2022";
        timeEl.innerHTML = "22:57";
    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(val){
        this._displayCalc = val;
    }

    get dataAtual(){
        return this._dataAtual;
    }

    set dataAtual(date){
        this.dataAtual = date;
    }
}