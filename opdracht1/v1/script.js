let itemsContainer = document.getElementById("items-container");

let todosContainer = document.getElementById("todos-container");

let todoItems = document.getElementsByClassName("todo-item");

let mouseOffset = {x: 0, y: 0};

let isMouseDown = false;

let currentTodo = null;

let doElsCollide = function(el1, el2) {
    el1.offsetBottom = el1.offsetTop + el1.offsetHeight;
    el1.offsetRight = el1.offsetLeft + el1.offsetWidth;
    el2.offsetBottom = el2.offsetTop + el2.offsetHeight;
    el2.offsetRight = el2.offsetLeft + el2.offsetWidth;

    return !((el1.offsetBottom < el2.offsetTop) ||
             (el1.offsetTop > el2.offsetBottom) ||
             (el1.offsetRight < el2.offsetLeft) ||
             (el1.offsetLeft > el2.offsetRight))
};


for(let i = 0; i < 6; i++) {
  let snap = document.createElement("div");
  snap.className = "snap";
  todosContainer.appendChild(snap);
}

function snapTodo(todo, container) {
  let box = container.getBoundingClientRect();
  todo.style.left = box.x + "px";
  todo.style.top = box.y - 10 + "px";
}

setInterval(() => {
   let snaps = document.getElementsByClassName("snap");
   for(let i = 0; i < snaps.length; i++) {
     snaps[i].className = snaps[i].className.replace("over", "");
     if(doElsCollide(currentTodo, snaps[i])) {
       snaps[i].className += " over";
       if(!isMouseDown) {
         snapTodo(currentTodo, snaps[i]);
       }
     }
   }
}, 100);

function onMouseDown(e, item) {
  isMouseDown = true;
  currentTodo = item;
  mouseOffset = {x: item.offsetLeft - e.clientX, y: item.offsetTop - e.clientY};

  item.style.backgroundColor = "#E57373";
}

function onMouseMove(e, item) {
  e.preventDefault();
  if(isMouseDown) {
    //Move Item
    item.style.left = e.clientX + mouseOffset.x + "px";
    item.style.top = e.clientY + mouseOffset.y + "px";
  }
}

function onMouseUp(e, item) {
  isMouseDown = false;
  item.style.backgroundColor = "#F44336";
}

for(let i = 0; i < todoItems.length; i++) {
  let item = todoItems[i];

  item.addEventListener("mousedown", (e) => {
    onMouseDown(e, item);
  });

  document.body.addEventListener("mousemove", (e) => {
      onMouseMove(e, item);
  });

  item.addEventListener("mouseup", (e) => {
    onMouseUp(e, currentTodo);
  });


}
