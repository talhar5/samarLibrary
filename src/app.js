// book constructor
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class display {
  static populate() {
    let tableBody = document.getElementById("tableBody");
    let storedBooks = localStorage.getItem("allBooks");
    let allBooks = storedBooks == null ? [] : JSON.parse(storedBooks);
    let html = "";
    allBooks.forEach((book, index) => {
      html += [
        `<tr>`,
        `<th scope="row">${index}</th>`,
        `<td>${book.name}</td>`,
        `<td>${book.author}</td>`,
        `<td>${book.type}</td>`,
        `<td><a onClick='deleteBtn(${index})' class='btn btn-danger'>Delete</a></td>`,
        `</tr>`,
      ].join("");
    });
    tableBody.innerHTML = html;
  }

  // validate that the fields are not empty
  static validate(book) {
    return book.name.length > 2 && book.author.length > 2;
  }
  // to get book type from radio buttons
  static getBookType() {
    let typeFiction = document.getElementById("typeFiction").checked;
    let typeProgramming = document.getElementById("typeProgramming").checked;
    let typeReligious = document.getElementById("typeReligious").checked;
    if (typeFiction) {
      return "Fiction";
    } else if (typeProgramming) {
      return "Programming";
    } else if (typeReligious) {
      return "Religious";
    }
  }
  // alert method
  static alert(message, type) {
    const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");
    alertPlaceholder.append(wrapper);
    setTimeout(() => {
      wrapper.innerHTML = "";
    }, 2500);
  }
  // to clear the form
  static clear() {
    let form = document.getElementById("addBookForm");
    form.reset();
  }
}

display.populate();

// add book event listener
let addBookBtn = document.getElementById("addBookBtn");

addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let bookName = document.getElementById("addBookName").value;
  let bookAuthor = document.getElementById("addBookAuthor").value;
  let book = new Book(bookName, bookAuthor, display.getBookType());

  let storedBooks = localStorage.getItem("allBooks");
  let allBooks = storedBooks == null ? [] : JSON.parse(storedBooks);

  if (display.validate(book)) {
    allBooks.unshift(book);
    localStorage.setItem("allBooks", JSON.stringify(allBooks));
    display.alert("The book has been added.", "success");
    display.populate();
    display.clear();
  } else {
    display.alert("Too short name/author!", "danger");
  }
});

function deleteBtn(n) {
  let storedBooks = localStorage.getItem("allBooks");
  let allBooks = storedBooks == null ? [] : JSON.parse(storedBooks);
  allBooks.splice(n, 1);
  localStorage.setItem("allBooks", JSON.stringify(allBooks));
  display.populate();
}
