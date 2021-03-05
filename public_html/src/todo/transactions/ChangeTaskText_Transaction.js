'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE DESCRIPTION
export default class ChangeTaskText extends jsTPS_Transaction {
    constructor(oldItem,newItem,id,initModel) {
        super();
        this.id = id;
        this.oldItem=oldItem;
        this.newItem=newItem;
        this.model=initModel
    }

    doTransaction() {
        this.model.changeDescription(this.newItem,this.id)
    }

    undoTransaction() {
        this.model.changeDescription(this.oldItem,this.id)
    }
}