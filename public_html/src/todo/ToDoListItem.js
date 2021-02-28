'use strict'

/**
 * ToDoListItem.js
 * 
 * This class represents an item for our list.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class ToDoListItem {
    /**
     * The constructor creates a default, empty item.
     */
    constructor(initId) {
        this.id = initId;
        this.description = "Unknown";
        let date=new Date();
        if(date.getMonth()+1<10){
            this.dueDate = date.getFullYear()+"-"+"0"+(date.getMonth()+1)+"-"+date.getDate();
        }
        else{
            this.dueDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        }
        this.status = "incomplete";
    }

    // GETTER/SETTER METHODS

    getId() {
        return this.id;
    }

    getDescription() {
        return this.description;
    }

    setDescription(initDescription) {
        this.description = initDescription;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(initDueDate) {
        this.dueDate = initDueDate;
    }

    getStatus() {
        return this.status;
    }

    setStatus(initStatus) {
        this.status = initStatus;
    }
}