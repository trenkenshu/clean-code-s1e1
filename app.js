//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder = document.getElementById("todo");//ul of #incompleteTasks
var completedTasksHolder = document.getElementById("done");//completed-tasks

//New task list item
var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");
  listItem.classList.add("task-list__item");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");
  label.innerText = taskString;
  label.className = "task-list__item-title";
  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task-list__item-dismiss";
  editInput.type = "text";
  editInput.className = "task-list__item-input";
  //innerText encodes special characters, HTML does not.
  editButton.innerText = "Edit";
  editButton.className = "task-list__item-action task-list__item-action_edit";
  deleteButton.className = "task-list__item-action task-list__item-action_delete";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.className = "task-list__item-icon";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

var addTask = function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

var editTask = function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector(".task-list__item-input");
  var label = listItem.querySelector(".task-list__item-title");
  var editBtn = listItem.querySelector(".task-list__item-action_edit");
  var containsClass = listItem.classList.contains("task-list__item-edit-mode");
  
  if(containsClass){
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }else{
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
  }

  listItem.classList.toggle("task-list__item-edit-mode");
};

var deleteTask=function(){
  console.log("Delete Task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

var taskCompleted = function(){
  console.log("Complete Task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function(){
  console.log("Incomplete Task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

var ajaxRequest = function(){
  console.log("AJAX Request");
}

addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

var bindTaskEvents = function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".task-list__item-dismiss");
  var editButton = taskListItem.querySelector(".task-list__item-action_edit");
  var deleteButton = taskListItem.querySelector(".task-list__item-action_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

