// book constructor
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }

}

// add book event listener
let addBookBtn = document.getElementById("addBookBtn");
addBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
});
console.log("first");
