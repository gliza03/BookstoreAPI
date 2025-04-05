import React from "react";
import { addBook } from "./api/booksAPI";
import { Book } from "./types/Book";

interface newBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewProjectForm = ({ onSuccess, onCancel }: newBookFormProps) => {
    const [book, setBook] = React.useState<Book>({
        bookID: 0,
        title: '',
        author: '',
        publisher: 0,
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        });
        
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(book);
        onSuccess();
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2>New Book Form</h2>
            <label>Book Title: <input type="text" name="title" value={book.title} onChange={handleChange} /></label>
            <label>Book Author: <input type="text" name="author" value={book.author} onChange={handleChange} /></label>
            <label>Book Publisher: <input type="number" name="publisher" value={book.publisher} onChange={handleChange} /></label>
            <label>Book ISBN: <input type="text" name="isbn" value={book.isbn} onChange={handleChange} /></label>
            <label>Book Classification: <input type="text" name="classification" value={book.classification} onChange={handleChange} /></label>
            <label>Book Category: <input type="text" name="category" value={book.category} onChange={handleChange} /></label>
            <label>Book Page Count: <input type="number" name="pageCount" value={book.pageCount} onChange={handleChange} /></label>
            <label>Book Price: <input type="number" name="price" value={book.price} onChange={handleChange} /></label>
            <button type="submit">Add Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>

        </form>
    )
}

export default NewProjectForm;