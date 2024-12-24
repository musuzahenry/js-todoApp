
const toddoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");



let todo = JSON.parse(localStorage.getItem("todo-list"));
if(!todo){
    todo =[];
}




function reset_input(formInput){
    formInput.value =""
    formInput.focus()
}




function clearItems(){
    localStorage.removeItem("todo-list")
    todo = []
    ReadToDoItems()
}




function CreateToDoItems(){

    if(toddoValue.value === ""){
        todoAlert.innerHTML = "Please enter your text!"
        reset_input(toddoValue)
    }else{
        let IsPresent = false;
        todo.forEach((element)=>{
            if(element.item == toddoValue.value){
                IsPresent = true;
            }
     });
        
     if(IsPresent){
        //setAlertMessage("This item already exists in the list")
        setAlertMessage("Item already exist, please enter another item")
        reset_input(toddoValue)
        return; //terminta execution and return void
    }

    if (!todo){
            todo=[]
    }  

    let itemList = {item:toddoValue.value, status:false};
        todo.push(itemList);
        setLocalStorage()
    }

    reset_input(toddoValue)
    //setAlertMessage("Todo Item created Successfully")

    ReadToDoItems()
    
}




function setAlertMessage(msg){
    todoAlert.innerHTML = msg
}



function ReadToDoItems(){ 
 
    let index =0
    let style=""
    listItems.innerHTML = ""

    todo.forEach((element)=>{
        let li = document.createElement("li");
        li.setAttribute("id", "list-"+todo.indexOf(element))
        console.log( "list-"+todo.indexOf(element))
        //let style ="";
        if(element.status===true){
            style="style='text-decoration:line-through;'"
        }else{
            style=""
        }
        const todoItems =`<div ${style} title ="Hit Double Click And Comlete"
         ondblclick = 'CompletedToDoItems(this)' id="todo-text-${todo.indexOf(element)}">
         ${todo.indexOf(element)}: ${element.item}
         </div>   
         ${style === ""?"":"<div><img class='todo-controls' src='images/check-mark.png'></div>"} 
         
         ${
            style === ""?
            " <div><img id='edit-"+todo.indexOf(element)+"' class='edit todo-controls' onclick='UpdateToDoItems(this)' src='images/pencil.png'></div></div>"
            
            :""
         }
          <img id="del-${todo.indexOf(element)}" class="delete todo-controls" onclick="DeleteToDoItems(this)" src="images/delete.png"> </div>
        `
        li.innerHTML = todoItems;
        listItems.appendChild(li);
        index+=1
    })//close for each element

    
}




function UpdateToDoItems(e){

    buttonId = e.id 
    itemID = buttonId.split("-")[1]
    element = document.getElementById("todo-text-"+itemID)
    let dismissBtn = document.createElement("button")
    dismissBtn.setAttribute("id", "dismiss")
    dismissBtn.innerHTML = "<span>x</span> Cancel"
    let input = document.createElement("input");
    input.setAttribute("id", "input-"+itemID);
    input.value = element.innerText.split(":")[1].trim();
    let saveBtn = document.createElement("button");
    saveBtn.innerText = "Save"

    let poper = document.createElement("div");
    let popTitle = document.createElement("h3");
    popTitle.innerHTML = "<strong>Edit To Do Item</strong>";
    popTitle.style.textAlign ="center";
    poper.appendChild(popTitle)
    poper.setAttribute("id", "poper");
    poper.style.visibility = "visible";
    poper.appendChild(dismissBtn)
    poper.appendChild(input)
    poper.appendChild(saveBtn)
    let html = document.getElementsByTagName("body")[0]
    html.appendChild(poper)

    saveBtn.addEventListener("click", (e)=>{
        EditItemContent(e, itemID, input, poper)
    });
    dismissBtn.addEventListener("click", (e)=>{
        RemovePoper(e, poper) 
    });   
    
}




function EditItemContent(e, itemID,  input,  poper){
       todo[itemID].item = input.value
    RemovePoper(e, poper)    
    setLocalStorage()
    ReadToDoItems()
}




function RemovePoper(e, poper){
    poper.remove() 
}




function setLocalStorage(){
    localStorage.setItem("todo-list", JSON.stringify(todo))
}




function CompletedToDoItems(e){
    itemID = e.id.split("-")[2]
    //console.log(itemID)
    todo[itemID].status = true
    setLocalStorage()
    ReadToDoItems()
}




function DeleteToDoItems(e){
  targetID = e.id.split("-")[1]
  todo.forEach((element)=>{
    if (todo.indexOf(element) == targetID){
        todoItem = document.getElementById("list-"+todo.indexOf(element))
        todoItem.remove()
        todo.splice(todo.indexOf(element),1)
        todoItem=document.getElementById("list-"+todo.indexOf(element))
        setLocalStorage()

    }
  })

  //ReadToDoItems()
}




ReadToDoItems()
