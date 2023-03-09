let personalData = [];

let orders = JSON.parse(localStorage.getItem("orders")) || [];

window.addEventListener("load", function () {
  showCategories();
});

function showCategories() {
  const parent = document.getElementById("categories");
  parent.addEventListener("click", handleCategoryClick);

  for (let value of data) {
    const element = document.createElement("div");
    element.textContent = value.name;
    element.setAttribute("data-category-id", value.id);
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

function showForm() {
  const form = document.getElementById("formWrap");
  form.classList.add("show");
}

function showInfo() {
  const parent = document.getElementById("products");
  const info = document.getElementById("info");

  parent.addEventListener("click", function handleProductClick(event) {
    info.innerHTML = "";
    const currentProductId = parseInt(event.target.getAttribute("data-product-id"));

    if (!currentProductId) {
      return;
    }

    const currentItem = data[id - 1].products[currentProductId - 1];
    personalData.push(`Ваш товар: ${currentItem.info}`);
    const element = document.createElement("div");
    const button = document.createElement("button");

    element.textContent = `${currentItem.info}`;
    button.textContent = `Buy`;
    button.classList.add("button");

    info.appendChild(element);
    info.appendChild(button);

    button.addEventListener("click", showForm);
  });
}

showInfo();

function showError() {
  const errorBlock = document.getElementById("error");
  errorBlock.classList.add("show");
  const returnButton = document.getElementById("return");
  returnButton.addEventListener("click", () => {
    errorBlock.classList.remove("show");
    personalData.splice(0, personalData.length);
  });
}

function showSuccessBlock() {
  personalData.splice(0, personalData.length);
  const dataContainer = document.getElementById("personalData");
  dataContainer.innerHTML = "";
  dataContainer.classList.remove("show");
  const successBlock = document.getElementById("success");
  successBlock.classList.add("show");
}

function showPersonalData() {
  const formWrap = document.getElementById("formWrap");
  formWrap.classList.remove("show");
  const dataContainer = document.getElementById("personalData");
  dataContainer.classList.add("show");
  personalData.forEach((el) => {
    const elem = document.createElement("p");
    elem.textContent = el;
    dataContainer.appendChild(elem);
  });
  const button = document.createElement("button");
  button.textContent = `Підтвердити замовлення`;
  button.classList.add("button");
  dataContainer.appendChild(button);
  button.addEventListener("click", showSuccessBlock);
}

document.querySelector("#confirm").addEventListener("click", function () {
  const infoForm = document.infoForm;
  const firstName = infoForm.firstName.value;
  const lastName = infoForm.lastName.value;
  personalData.push(`ПІБ: ${firstName} ${lastName}`);

  const city = infoForm.city;
  personalData.push(`Місто доставки: ${city.options[city.selectedIndex].textContent}`);

  const post = infoForm.post;
  personalData.push(`Відділення НП: ${post.options[post.selectedIndex].textContent}`);

  const paymentMethod = infoForm.wayToPay.value;
  personalData.push(`Спосіб оплати: ${paymentObj[paymentMethod]}`);

  const numberOfItems = infoForm.howMany.value;
  personalData.push(`Кількість товару, шт.: ${numberOfItems}`);

  const yourComment = infoForm.comment.value;
  personalData.push(`${yourComment}`);

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  personalData.push(`${date}`);

  if (!firstName || !lastName || city.selectedIndex === 0 || post.selectedIndex === 0 || !paymentMethod) {
    showError();
  } else {
    showPersonalData();
  }
  const order = JSON.stringify(personalData);
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
});

function refreshPage() {
  const successBlock = document.getElementById("success");
  successBlock.classList.remove("show");
  const products = document.getElementById("products");
  products.innerHTML = "";
  const info = document.getElementById("info");
  info.innerHTML = "";
}

function returnToCategories() {
  const continueButton = document.getElementById("continue");
  continueButton.addEventListener("click", refreshPage);
  const backButton = document.getElementById("backButton");
  backButton.addEventListener("click", () => {
    if (document.getElementById("main").classList.contains("hide")) {
      document.getElementById("myOrders").classList.remove("show");
      document.getElementById("main").classList.remove("hide");
      document.getElementById("orders").innerHTML = "";
      document.getElementById("order").innerHTML = "";
      refreshPage();
    } else {
      document.getElementById("myOrders").classList.remove("show");
      document.getElementById("orders").innerHTML = "";
      document.getElementById("order").innerHTML = "";
      refreshPage();
    }
  });
  const homeButton = document.getElementById("homeButton");
  homeButton.addEventListener("click", () => {
    if (document.getElementById("main").classList.contains("hide")) {
      document.getElementById("myOrders").classList.remove("show");
      document.getElementById("main").classList.remove("hide");
      document.getElementById("orders").innerHTML = "";
      document.getElementById("order").innerHTML = "";
      refreshPage();
    } else {
      document.getElementById("myOrders").classList.remove("show");
      document.getElementById("orders").innerHTML = "";
      document.getElementById("order").innerHTML = "";
      refreshPage();
    }
  });
}

returnToCategories();

function showMyOrders() {
  const myOrdersButton = document.getElementById("myOrdersButton");
  myOrdersButton.addEventListener("click", () => {
    document.getElementById("orders").innerHTML = "";
    document.getElementById("order").innerHTML = "";
    document.getElementById("main").classList.add("hide");
    const globalOrdersBlock = document.getElementById("myOrders");
    globalOrdersBlock.classList.add("show");
    const ordersBlock = document.getElementById("orders");
    orders.forEach(function (order, i) {
      const orderArr = order.split('"');
      const el = document.createElement("p");
      el.textContent = `${orderArr[1]}, ${orderArr[15]}`;
      ordersBlock.appendChild(el);

      el.addEventListener("click", (e) => {
        const concreteOrderBlock = document.getElementById("order");
        concreteOrderBlock.innerHTML = "";
        const el = document.createElement("p");
        el.textContent = `${orderArr[1]}, 
                          ${orderArr[3]}, 
                          ${orderArr[5]}, 
                          ${orderArr[7]}, 
                          ${orderArr[9]}, 
                          ${orderArr[11]}, 
                          ${orderArr[13]}, 
                          ${orderArr[15]},`;
        concreteOrderBlock.appendChild(el);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button");
        deleteButton.textContent = `Видалити`;
        concreteOrderBlock.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
          orders.splice(i, 1);
          localStorage.setItem("orders", JSON.stringify(orders));
          document.getElementById("order").innerHTML = "";
          e.target.parentNode.removeChild(e.target);
          showMyOrders();
        });
      });
    });
  });
}

showMyOrders();

console.log(orders);
