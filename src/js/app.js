window.addEventListener("load", function () {
  showCategories();

  // 2. add event listeners for categories
  // 3
});

function showCategories() {
  const parent = document.getElementById("categories");
  parent.addEventListener("click", handleCategoryClick);

  for (let value of data) {
    const element = document.createElement("div");
    element.textContent = value.name;
    element.setAttribute("data-category-id", value.id);
    // element.addEventListener('click', function(event) {})
    parent.appendChild(element);
  }
}

let id = "";

function handleCategoryClick(event) {
  id = parseInt(event.target.getAttribute("data-category-id"));
  if (!id) {
    return;
  }

  let products = [];

  for (let value of data) {
    if (value.id === id) {
      products = value.products;
      break;
    }
  }
  showProducts(products);
}

function showProducts(products) {
  const parent = document.getElementById("products");
  parent.innerHTML = "";

  for (let value of products) {
    const element = document.createElement("div");
    element.textContent = `${value.name} - $${value.price}`;
    element.setAttribute("data-product-id", value.id);
    element.classList.add("product");
    parent.appendChild(element);
  }
}

function showSuccess() {
  const success = document.getElementById("success");
  success.classList.add("show");
}

function showInfo() {
  const parent = document.getElementById("products");
  const info = document.getElementById("info");

  parent.addEventListener("click", function handleProductClick(event) {
    info.innerHTML = "";
    const i = parseInt(event.target.getAttribute("data-product-id"));
   
    if (!i) {
      return;
    }

    const currentItem = data[id - 1].products[i - 1];
    const element = document.createElement("div");
    const button = document.createElement("button");

    element.textContent = `${currentItem.info}`;
    button.textContent = `Buy`;
    button.classList.add("button");

    info.appendChild(element);
    info.appendChild(button);

    button.addEventListener("click", () => {
      showSuccess();
      setTimeout(function () {
        window.location.reload();
      }, 1500);
    });
  });
}

showInfo();
