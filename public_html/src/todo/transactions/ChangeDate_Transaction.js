'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE DESCRIPTION
export default class ChangeDate extends jsTPS_Transaction {
    constructor(oldItem,newItem,id,initModel) {
        super();
        this.id = id;
        this.oldItem=oldItem;
        this.newItem=newItem;
        this.model=initModel
    
    }

    doTransaction() {
        this.model.changeDate(this.newItem,this.id)
    }

    undoTransaction() {
        this.model.changeDate(this.oldItem,this.id)
    }
}