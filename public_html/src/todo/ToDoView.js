'use strict'

/**
 * ToDoView
 * 
 * This class generates all HTML content for the UI.
 */
export default class ToDoView {
    constructor() {}

    // ADDS A LIST TO SELECT FROM IN THE LEFT SIDEBAR
    appendNewListToView(newList) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        
        // MAKE AND ADD THE NODE
        let newListId = "todo-list-" + newList.id;
        let listElement = document.createElement("div");
        listElement.setAttribute("id", newListId);
        listElement.setAttribute("class", "todo_button");
        listElement.appendChild(document.createTextNode(newList.name));
        listElement.addEventListener('click',function(){
            let controls=document.getElementsByClassName('list-item-control')
            for(let i=0;i<controls.length;i++){
                controls[i].style.pointerEvents='all'
                controls[i].style.color='white'
            }
            //document.getElementsByClassName('list-item-control').style.pointerEvents="all";
        })
        listsElement.appendChild(listElement);
        

        // SETUP THE HANDLER FOR WHEN SOMEONE MOUSE CLICKS ON OUR LIST
        let thisController = this.controller;
        listElement.onmousedown = function() {
            thisController.handleLoadList(newList.id);
        }
        
    }

    // REMOVES ALL THE LISTS FROM THE LEFT SIDEBAR
    clearItemsList() {
        let itemsListDiv = document.getElementById("todo-list-items-div");
        // BUT FIRST WE MUST CLEAR THE WORKSPACE OF ALL CARDS BUT THE FIRST, WHICH IS THE ITEMS TABLE HEADER
        let parent = itemsListDiv;
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    // REFRESHES ALL THE LISTS IN THE LEFT SIDEBAR
    refreshLists(lists) {
        // GET THE UI CONTROL WE WILL APPEND IT TO
        let listsElement = document.getElementById("todo-lists-list");
        listsElement.innerHTML = "";

        for (let i = 0; i < lists.length; i++) {
            let list = lists[i];
            this.appendNewListToView(list);
        }
    }
    
    // LOADS THE list ARGUMENT'S ITEMS INTO THE VIEW
    viewList(list) {
        // WE'LL BE ADDING THE LIST ITEMS TO OUR WORKSPACE
        let itemsListDiv = document.getElementById("todo-list-items-div");

        // GET RID OF ALL THE ITEMS
        this.clearItemsList();
        for (let i = 0; i < list.items.length; i++) {
            // NOW BUILD ALL THE LIST ITEMS
            let listItem = list.items[i];
            
            let listItemElement = "<div id='todo-list-item-" + listItem.id + "' class='list-item-card'>"
                                + "<div onclick='changeTodoDesc("+ listItem.id+");' id='todo-list-desc-"+listItem.id+ "'  class='task-col' > " + listItem.description  + "</div>"
                                +"<div id='todo-list-desc-input-"+ listItem.id+"' class='list-item-desc'><input  type='text' id='tododescchange-" + listItem.id + "' class='list-item-desc-input'value='"+listItem.description+"'></input></div>"
                                
                                + "<div id='todo-list-date-" + listItem.id + "' class='due-date-col' onclick='changeTodoDate("+listItem.id+")'>" + listItem.dueDate + "</div>"
                                + "<div style='margin-left:21%;display:none;' id='todo-list-date-input-" + listItem.id + "' class='due-date-col-input'><input type='date' class='list-item-date-input' value='"+listItem.dueDate+"'></input></div>"
                               
                                + "<div onclick='changeStatus("+ listItem.id+");' id='todo-list-status-" + listItem.id + "' class='status-col'>" + listItem.status + "</div>"
                                + "<div id='status-col-selector-div-" + listItem.id + "' style='display:none;position:absolute;left:55%;'><select style='width:140%;background-color:rgb(64,69,78);color:white' id='status-col-selector-" + listItem.id + "' onclick='changeStatus("+listItem.id+")''> <option value='complete'>complete</option> <option value='incomplete'>incomplete</option></select></div>" 

                                + "<div class='list-controls-col'>"
                                + " <div class='list-item-control material-icons'>keyboard_arrow_up</div>"
                                + " <div class='list-item-control material-icons'>keyboard_arrow_down</div>"
                                + " <div class='list-item-control material-icons'>close</div>"
                                + " <div class='list-item-control'></div>"
                                + " <div class='list-item-control'></div>"
                                + "</div>";
            
            itemsListDiv.innerHTML += listItemElement;
            
        }
        
        for (let i = 0; i < list.items.length; i++) {
            
            let listItem = list.items[i];
        document.getElementById('todo-list-desc-input-'+listItem.id).querySelector("input").addEventListener('blur',function(){
            let val=document.getElementById('todo-list-desc-input-'+listItem.id).querySelector("input").value
            listItem.description=val;
            document.getElementById('todo-list-desc-'+listItem.id).innerHTML=val;
            document.getElementById('todo-list-desc-input-'+listItem.id).style.display='none';
            document.getElementById('todo-list-desc-'+listItem.id).style.visibility='visible'
            console.log("blurdasdar")
        });
        
         let date=document.getElementById('todo-list-date-input-'+listItem.id)
         date.querySelector('input').addEventListener('blur',function(){
             
             let newDate=date.querySelector("input").value;
             listItem.dueDate=newDate;
             document.getElementById('todo-list-date-'+listItem.id).innerHTML=newDate;
             document.getElementById('todo-list-date-'+listItem.id).style.visibility='visible';
             date.style.display='none';
         });
         let statusSelect=document.getElementById('status-col-selector-'+listItem.id);
         for( let j=0;j<statusSelect.options.length;j++){
             
            if(statusSelect.options[j].value==listItem.status){
                statusSelect.selectedIndex=j;
                break;
            }
         }
         let status=document.getElementById('todo-list-status-'+listItem.id);
         let statusDiv=document.getElementById('status-col-selector-div-'+listItem.id);
         status.addEventListener('click',function(){
             statusSelect.focus()
         })
         statusSelect.addEventListener('blur',function(){
            statusDiv.style.display='none'
            status.style.visibility='visible'
        })
         statusSelect.addEventListener('click',function(){
             let newStatus=statusSelect.value;
             status.innerHTML=newStatus
             status.style.visibility='visible'
             listItem.status=newStatus
         })
         
    }
    }
    
    
    // THE VIEW NEEDS THE CONTROLLER TO PROVIDE PROPER RESPONSES
    setController(initController) {
        this.controller = initController;
    }
}