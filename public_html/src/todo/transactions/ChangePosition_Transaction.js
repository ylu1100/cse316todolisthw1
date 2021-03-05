'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE POSITION. ITEM=INDEX
export default class ChangePosition extends jsTPS_Transaction {
    constructor(oldItem,newItem,id,initModel) {
        super();
        this.id = id;
        this.oldItem=oldItem;
        this.newItem=newItem;
        this.model=initModel
    }

    doTransaction() {
        this.model.changePos(this.newItem,this.id)
    }

    undoTransaction() {
        this.model.changePos(this.oldItem,this.id)
    }
}