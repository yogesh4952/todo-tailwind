document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");

  const addTask = document.getElementById("addTask");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];

  tasks.forEach((element) => {
    renderTask(element);
  });
  addTask.addEventListener("click", () => {
    let taskInput = document.getElementById("inputText");
    const taskText = taskInput.value.trim();
    if (taskInput.value === "") return alert("Please enter a task");

    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };

    tasks.push(newTask);
    renderTask(newTask);
    saveTasks();
    taskInput.value = "";
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    li.classList.add(
      "w-[100%]",
      "list-none",
      "flex",
      "justify-between",
      "items-center",
      "p-2",
      "relative",
      "bg-gray-800",
      "h-12",
      "rounded-lg",
      "border-blue-900",
      "mb-4"
    );
    li.innerHTML = `<span>${task.text}</span><button
                class="h-[100%] hover:bg-white font-bold transition-colors hover:ease-linear hover:duration-75 hover:text-black w-[20%] text-white absolute right-0 top-0 bg-red-500 rounded-lg">
                Delete
              </button>`;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); //prevent toggle from firing
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    taskList.appendChild(li);
  }
  function saveTasks() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }
});
