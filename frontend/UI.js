import BookService from "./services/BookServices";
const bookService = new BookService();
import { format } from "timeago.js";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.renderBooks();
});

class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    const booksContainer = document.getElementById("books-card");
    booksContainer.innerHTML = "";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "";
      div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${book.imagePath}" alt="" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="" class="btn btn-danger delete" _id="${
                                  book._id
                                }">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                            ${format(book.createAt)}
                        </div>
                </div>
            `;
      booksContainer.appendChild(div);
    });
  }

  async addBook(book) {
    await bookService.postBook(book);
    this.clearBookForm();
    this.renderBooks();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
  }

  renderMessage(mensaje, color, seg) {
    const div = document.createElement("div");
    div.className = `alert alert-${color} message`;
    div.appendChild(document.createTextNode(mensaje));

    const container = document.querySelector(".col-md-4");
    const bookForm = document.querySelector("#book-form");

    container.insertBefore(div, bookForm);
    setTimeout(() => {
      document.querySelector(".message").remove();
    }, seg);
  }

  async deleteBook(bookID) {
    await bookService.deleteBook(bookID);
    this.renderBooks();
  }
}

export default UI;
