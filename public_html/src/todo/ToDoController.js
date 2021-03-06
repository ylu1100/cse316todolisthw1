'use strict'

/**
 * ToDoController
 * 
 * This class serves as the event traffic manager, routing all
 * event handling responses.
 */
export default class ToDoController {    
    constructor() {}

    setModel(initModel) {
        this.model = initModel;
        let appModel = this.model;
        // SETUP ALL THE EVENT HANDLERS SINCE THEY USE THE MODEL
        document.getElementById("add-list-button").onmousedown = function() {
            appModel.addNewList();
        }
        document.getElementById("undo-button").onmousedown = function() {
            
            appModel.undo();
            if(appModel.getUndoSize()==0){
                document.getElementById('undo-button').classList.add('add_list_disabled')
            }
            else{
                document.getElementById('undo-button').classList.remove('add_list_disabled')
            }
            if(appModel.getRedoSize()==0){
                document.getElementById('redo-button').classList.add('add_list_disabled')
            }
            else{
                document.getElementById('redo-button').classList.remove('add_list_disabled')
            }
            let firstRow=document.getElementsByClassName('list-item-card list-item-row')[0]
                let firstRowIcons=firstRow.getElementsByClassName('list-item-control material-icons')
                firstRowIcons[0].style.pointerEvents='none'
                firstRowIcons[0].style.color='rgb(53,58,68)'
                 let allRows=document.getElementsByClassName('list-item-card list-item-row')
                 for(let i=1;i<allRows[i].length;i++){
                     let allRowIcons=allRows[i].getElementsByClassName('list-item-control material-icons')
                     for(let x=0;x<allRowIcons.length;x++){
                        allRowIcons[x].style.pointerEvents='all'
                        allRowIcons[x].style.color='white'
                     }
                 }
                 let lastRowIcons=document.getElementsByClassName('list-item-card list-item-row')[document.getElementsByClassName('list-item-card list-item-row').length-1].getElementsByClassName('list-item-control material-icons')
                 lastRowIcons[1].style.pointerEvents='none'
                 lastRowIcons[1].style.color='rgb(53,58,68)'
        }
        document.getElementById("redo-button").onmousedown = function() {
            
            appModel.redo();
            if(appModel.getUndoSize()==0){
                document.getElementById('undo-button').classList.add('add_list_disabled')
            }
            else{
                document.getElementById('undo-button').classList.remove('add_list_disabled')
            }
            if(appModel.getRedoSize()==0){
                document.getElementById('redo-button').classList.add('add_list_disabled')
            }
            else{
                document.getElementById('redo-button').classList.remove('add_list_disabled')
            }
            let firstRow=document.getElementsByClassName('list-item-card list-item-row')[0]
                let firstRowIcons=firstRow.getElementsByClassName('list-item-control material-icons')
                firstRowIcons[0].style.pointerEvents='none'
                firstRowIcons[0].style.color='rgb(53,58,68)'
                 let allRows=document.getElementsByClassName('list-item-card list-item-row')
                 for(let i=1;i<allRows[i].length;i++){
                     let allRowIcons=allRows[i].getElementsByClassName('list-item-control material-icons')
                     for(let x=0;x<allRowIcons.length;x++){
                        allRowIcons[x].style.pointerEvents='all'
                        allRowIcons[x].style.color='white'
                     }
                 }
                 let lastRowIcons=document.getElementsByClassName('list-item-card list-item-row')[document.getElementsByClassName('list-item-card list-item-row').length-1].getElementsByClassName('list-item-control material-icons')
                 lastRowIcons[1].style.pointerEvents='none'
                 lastRowIcons[1].style.color='rgb(53,58,68)'
        }
        document.getElementById("delete-list-button").onmousedown=function(){
            appModel.openDeleteListConfirmation();
        }
        document.getElementById("delete-listno").onmousedown=function(){
            appModel.closeDeleteListConfirmation();
        }
        document.getElementById('close-list-button').onmousedown=function(){
            appModel.resetStack();
            document.getElementById('add-list-button').classList.remove('add_list_disabled')
            document.getElementById('redo-button').classList.add('add_list_disabled')
            document.getElementById('undo-button').classList.add('add_list_disabled')

            while (document.getElementById('todo-list-items-div').firstChild) {
                document.getElementById('todo-list-items-div').removeChild(document.getElementById('todo-list-items-div').firstChild);
            }
            let todoLists=document.getElementById('todo-lists-list').getElementsByClassName('todo_button')
            for (let i=0;i<todoLists.length;i++){
                todoLists[i].style.color=''
                todoLists[i].classList.remove('todo_button_selected')
                todoLists[i].classList.add('todo_button_unselected')
            }
            let controls=document.getElementsByClassName('list-item-control')
            for (let i=0;i<controls.length;i++){
                controls[i].style.pointerEvents='none'
                controls[i].style.color='rgb(53,58,68)'
            }
        }
        document.getElementById("delete-listyes").onmousedown=function(){
            appModel.removeCurrentList();
            document.getElementById('add-list-button').classList.remove('add_list_disabled')
            appModel.resetStack();
            document.getElementById('redo-button').classList.add('add_list_disabled')
            document.getElementById('undo-button').classList.add('add_list_disabled')
            let controls=document.getElementsByClassName('list-item-control')
            for(let i=0;i<controls.length;i++){
                controls[i].style.pointerEvents='none'
                controls[i].style.color='rgb(53,58,68)'
            }
        }
        
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
            let firstRow=document.getElementsByClassName('list-item-card list-item-row')[0]
                let firstRowIcons=firstRow.getElementsByClassName('list-item-control material-icons')
                
                firstRowIcons[0].style.pointerEvents='none'
                firstRowIcons[0].style.color='rgb(53,58,68)'
                firstRowIcons[1].style.pointerEvents='all'
                firstRowIcons[1].style.color='white'
                firstRowIcons[2].style.pointerEvents='all'
                firstRowIcons[2].style.color='white'
               
               
                 let allRows=document.getElementsByClassName('list-item-card list-item-row')
                 for(let i=1;i<allRows.length;i++){
                     let allRowIcons=allRows[i].getElementsByClassName('list-item-control material-icons')
                     for(let x=0;x<allRowIcons.length;x++){
                        allRowIcons[x].style.pointerEvents='all'
                        allRowIcons[x].style.color='white'
                     }
                 }
                 
                 let lastRowIcons=document.getElementsByClassName('list-item-card list-item-row')[document.getElementsByClassName('list-item-card list-item-row').length-1].getElementsByClassName('list-item-control material-icons')
                 lastRowIcons[1].style.pointerEvents='none'
                 lastRowIcons[1].style.color='rgb(53,58,68)'
                
        }  
       
    }
    
    // PROVIDES THE RESPONSE TO WHEN A USER CLICKS ON A LIST TO LOAD
    handleLoadList(listId) {
        // UNLOAD THE CURRENT LIST AND INSTEAD LOAD THE CURRENT LIST
        
        this.model.loadList(listId);
        
        
        

        // let listItems=this.model.getCurrentList().items
        // for(let i =0;i<listItems.length;i++){
        //    document.getElementById('todo-list-desc-input-'+listItems[i].id).querySelector("input").addEventListener('blur',function(){
        //     let val=document.getElementById('todo-list-desc-input-'+listItems[i].id).querySelector("input").value
        //     listItems[i].description=val;
        //     document.getElementById('todo-list-desc-'+listItems[i].id).innerHTML=val;
        //     document.getElementById('todo-list-desc-input-'+listItems[i].id).style.display='none';
        //     document.getElementById('todo-list-desc-'+listItems[i].id).style.visibility='visible'
        //     console.log("blurr")
        // });
        
        //  let date=document.getElementById('todo-list-date-input-'+listItems[i].id)
        //  date.querySelector('input').addEventListener('blur',function(){
        //      let newDate=date.querySelector("input").value;
        //      listItems[i].dueDate=newDate;
        //      document.getElementById('todo-list-date-'+listItems[i].id).innerHTML=newDate;
        //      document.getElementById('todo-list-date-'+listItems[i].id).style.visibility='visible';
        //      date.style.display='none';
        //  });
        //  let statusSelect=document.getElementById('status-col-selector-'+listItems[i].id);
        //  for( let j=0;j<statusSelect.options.length;j++){
             
        //     if(statusSelect.options[j].value==listItems[i].status){
        //         statusSelect.selectedIndex=j;
        //         break;
        //     }
        //  }
        //  let status=document.getElementById('todo-list-status-'+listItems[i].id);
        //  let statusDiv=document.getElementById('status-col-selector-div-'+listItems[i].id);
        //  statusSelect.addEventListener('click',function(){
        //      let newStatus=statusSelect.value;
        //      status.innerHTML=newStatus
        //      status.style.visibility='visible'
        //      listItems[i].status=newStatus
        //  })
        //  statusSelect.addEventListener('blur',function(){ 
        //     statusDiv.style.display='none'
        // })
        // }
        //console.log(this.model.getCurrentList().items)
        
    }
    
}