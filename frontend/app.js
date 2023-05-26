import './styles/app.css';
import UI from './UI';

document.getElementById('book-form').addEventListener("submit", (e)=>{
    
    const title= document.getElementById('title').value;
    const author= document.getElementById('author').value;
    const isbn= document.getElementById('isbn').value;
    const image= document.getElementById('image').files;

    const formData= new FormData();
    formData.append('image', image[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI;
    ui.addBook(formData);
    
    ui.renderMessage('New Book Added', 'success', 3000);

    e.preventDefault();

})

document.getElementById('books-card').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')){
        const id= e.target.getAttribute("_id");
        const ui= new UI;
        ui.deleteBook(id);

        ui.renderMessage('Book Removed', 'danger', 3000);
    }
    e.preventDefault();
})