document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let task = taskInput.value.trim();
  if (!task) return;
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  taskInput.value = "";
  loadTasks();
}

function loadTasks() {
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${task} <button onclick="deleteTask(${index})">X</button>`;
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

let products = [
  { name: "Laptop", category: "electronics", price: 800, rating: 4.5 },
  { name: "Shirt", category: "clothing", price: 20, rating: 4.0 },
  { name: "Smartphone", category: "electronics", price: 500, rating: 4.7 },
  { name: "Jeans", category: "clothing", price: 40, rating: 4.3 },
];

function displayProducts(list) {
  let productList = document.getElementById("productList");
  productList.innerHTML = "";
  list.forEach((product) => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `${product.name} - $${product.price} - Rating: ${product.rating}`;
    productList.appendChild(div);
  });
}

function filterProducts() {
  let category = document.getElementById("filterCategory").value;
  let filtered =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);
  displayProducts(filtered);
}

function sortProducts(order) {
  products.sort((a, b) =>
    order === "asc" ? a.price - b.price : b.price - a.price
  );
  filterProducts();
}

function sortByRating() {
  products.sort((a, b) => b.rating - a.rating);
  filterProducts();
}

displayProducts(products);
