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
        }
        document.getElementById("redo-button").onmousedown = function() {
            appModel.redo();
        }
        document.getElementById("delete-list-button").onmousedown=function(){
            appModel.openDeleteListConfirmation();
        }
        document.getElementById("delete-listno").onmousedown=function(){
            appModel.closeDeleteListConfirmation();
        }
        
        document.getElementById("delete-listyes").onmousedown=function(){
            appModel.removeCurrentList();
        }
        
        document.getElementById("add-item-button").onmousedown = function() {
            appModel.addNewItemTransaction();
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