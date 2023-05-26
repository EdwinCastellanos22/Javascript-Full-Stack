class BookService{
    constructor(){
        this.url= "http://localhost:3000/mongo/books/"
    }

    async getBooks (){
        const response= await fetch(this.url);
        const books= await response.json()
        return books
    }

    async postBook(book){
        const response = await fetch(this.url, {
            method: 'POST',
            body: book
        })
        const data= await response.json();
    }

    async deleteBook(bookID){
        const response= await fetch(`${this.url}${bookID}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })
        const data = await response.json()

    }
}

module.exports= BookService