'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../../common/jsTPS.js"

// THIS TRANSACTION IS FOR CHANGE POSITION. ITEM=INDEX
export default class AddOldItem extends jsTPS_Transaction {
    constructor(oldItem,initModel) {
        super();
        this.oldItem=oldItem;
        this.model=initModel
    }

    doTransaction() {
        this.model.removeItem(this.oldItem)
    }

    undoTransaction() {
        this.model.addOldItem(this.oldItem)
    }
}