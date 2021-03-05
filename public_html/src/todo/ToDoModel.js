'use strict'

import ToDoList from './ToDoList.js'
import ToDoListItem from './ToDoListItem.js'
import jsTPS from '../common/jsTPS.js'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction.js'
import ChangeTaskText from './transactions/ChangeTaskText_Transaction.js'
import ChangeDate from './transactions/ChangeDate_Transaction.js'
import ChangeStatus from './transactions/ChangeStatus_Transaction.js'
import ChangePosition from './transactions/ChangePosition_Transaction.js'
import AddOldItem from './transactions/AddOldItem_Transaction.js'

/**
 * ToDoModel
 * 
 * This class manages all the app data.
 */
export default class ToDoModel {
    constructor() {
        // THIS WILL STORE ALL OF OUR LISTS
        this.toDoLists = [];

        // THIS IS THE LIST CURRENTLY BEING EDITED
        this.currentList = null;

        // THIS WILL MANAGE OUR TRANSACTIONS
        this.tps = new jsTPS();

        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST
        this.nextListId = 0;
        this.taskChangeId=null
        // WE'LL USE THIS TO ASSIGN ID NUMBERS TO EVERY LIST ITEM
        this.nextListItemId = 0;
        this.deleteList=null;
    }

    /**
     * addItemToCurrentList
     * 
     * This function adds the itemToAdd argument to the current list being edited.
     * 
     * @param {*} itemToAdd A instantiated item to add to the list.
     */
    addItemToCurrentList(itemToAdd) {
        this.currentList.push(itemToAdd);
    }

    /**
     * addNewItemToCurrentList
     * 
     * This function adds a brand new default item to the current list.
     */
    addNewItemToCurrentList() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.addItemToList(this.currentList, newItem);
        return newItem;
    }

    /**
     * addItemToList
     * 
     * Function for adding a new item to the list argument using the provided data arguments.
     */
    addNewItemToList(list, initDescription, initDueDate, initStatus) {
        let newItem = new ToDoListItem(this.nextListItemId++);
        newItem.setDescription(initDescription);
        newItem.setDueDate(initDueDate);
        newItem.setStatus(initStatus);
        list.addItem(newItem);
        if (this.currentList) {
            this.view.refreshList(list);
        }
    }

    /**
     * addNewItemTransaction
     * 
     * Creates a new transaction for adding an item and adds it to the transaction stack.
     */
    addNewItemTransaction() {
        let transaction = new AddNewItem_Transaction(this);
        
        this.tps.addTransaction(transaction);
    }
    changeTaskTextTransaction(oldItem,newItem,id){
        let transaction = new ChangeTaskText(oldItem,newItem,id,this);
        
        this.tps.addTransaction(transaction);
    }
    changeDateTransaction(oldItem,newItem,id){
        let transaction = new ChangeDate(oldItem,newItem,id,this);
        
        this.tps.addTransaction(transaction);
    }
    changeStatusTransaction(oldItem,newItem,id){
        let transaction = new ChangeStatus(oldItem,newItem,id,this);
        
        this.tps.addTransaction(transaction);
    }
    changePositionTransaction(oldItem,newItem,id){
        let transaction = new ChangePosition(oldItem,newItem,id,this);
        
        this.tps.addTransaction(transaction);
    }
    removeOldItemTransaction(oldItem){
        let transaction = new AddOldItem(oldItem,this);
        
        this.tps.addTransaction(transaction);
    }
    resetStack(){
        this.tps.clearAllTransactions()
    }
    /**
     * addNewList
     * 
     * This function makes a new list and adds it to the application. The list will
     * have initName as its name.
     * 
     * @param {*} initName The name of this to add.
     */
    addNewList(initName) {
        let newList = new ToDoList(this.nextListId++);
        if (initName)
            newList.setName(initName);
        this.toDoLists.push(newList);
        this.view.appendNewListToView(newList);
        return newList;
    }

    /**
     * Adds a brand new default item to the current list's items list and refreshes the view.
     */
    addNewItem() {
        let newItem = new ToDoListItem(this.nextListItemId++);
        this.currentList.items.push(newItem);
        this.view.viewList(this.currentList,this.toDoLists);
        

        return newItem;
    }


    /**
     * Makes a new list item with the provided data and adds it to the list.
     */
    loadItemIntoList(list, description, due_date, assigned_to, completed) {
        let newItem = new ToDoListItem();
        newItem.setDescription(description);
        newItem.setDueDate(due_date);
        newItem.setAssignedTo(assigned_to);
        newItem.setCompleted(completed);
        this.addItemToList(list, newItem);
    }

    /**
     * Load the items for the listId list into the UI.
     */
    loadList(listId) {
        let listIndex = -1;
        for (let i = 0; (i < this.toDoLists.length) && (listIndex < 0); i++) {
            if (this.toDoLists[i].id === listId)
                listIndex = i;
        }
        if (listIndex >= 0) {
            let listToLoad = this.toDoLists[listIndex];
            this.currentList = listToLoad;
            this.view.viewList(this.currentList,this.toDoLists);
            
        }
    }

    /**
     * Redo the current transaction if there is one.
     */
    redo() {
        if (this.tps.hasTransactionToRedo()) {
            this.tps.doTransaction();
        }
    }   

    /**
     * Remove the itemToRemove from the current list and refresh.
     */
    removeItem(itemToRemove) {
        this.currentList.removeItem(itemToRemove);
        this.view.viewList(this.currentList);
    }
    changeDescription(desc,id){
        
        for(let i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].id==id){
                this.currentList.items[i].description=desc
                break;
            }
        }
        this.view.viewList(this.currentList);
       
    }
    changeDate(date,id){
   
        for(let i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].id==id){
                this.currentList.items[i].dueDate=date
                break;
            }
        }
        this.view.viewList(this.currentList);
    }
    changeStatus(status,id){
        for(let i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].id==id){
                this.currentList.items[i].status=status
                break;
            }
        }
        this.view.viewList(this.currentList);
    }
    changePos(index,id){
        for(let i=0;i<this.currentList.items.length;i++){
            if(this.currentList.items[i].id==id){
                let temp=this.currentList.items[index]
                this.currentList.items[index]=this.currentList.items[i]
                this.currentList.items[i]=temp
                break;
            }
        }
        this.view.viewList(this.currentList);
    }
    addOldItem(oldItem){
        this.currentList.items.push(oldItem);
        this.view.viewList(this.currentList,this.toDoLists);
        
    }
    /**
     * Finds and then removes the current list.
     */
    removeCurrentList() {
        let indexOfList = -1;
        for (let i = 0; (i < this.toDoLists.length) && (indexOfList < 0); i++) {
            if (this.toDoLists[i].id === this.currentList.id) {
                indexOfList = i;
            }
        }
        this.toDoLists.splice(indexOfList, 1);
        this.currentList = null;
         this.view.clearItemsList();
         this.view.refreshLists(this.toDoLists);
         this.closeDeleteListConfirmation();
        }
    //open delete dialog
    openDeleteListConfirmation(){
        document.getElementById("delete-list-dialog").style.display="block";
    } 
    //close delete dialog
    closeDeleteListConfirmation(){
        document.getElementById("delete-list-dialog").style.display="none";
    }    
    
    // WE NEED THE VIEW TO UPDATE WHEN DATA CHANGES.
    setView(initView) {
        this.view = initView;
    }
    

    getCurrentList(){
        return this.currentList;
    }
    /**
     * Undo the most recently done transaction if there is one.
     */
    undo() {
        if (this.tps.hasTransactionToUndo()) {
            this.tps.undoTransaction();
        }
    } 
}