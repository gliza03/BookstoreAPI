import { Book } from "../types/Book";

interface fetchBooksResponse {
    bookResults: Book[];
    totalBooks: number;
}

const API_URL = "https://bookproject-liza-ejhzaeg4gbcthaaf.eastus-01.azurewebsites.net/api/Book"

export const fetchBooks = async (
    pageSize: number,
    pageNumber: number,
    sortField: string,
    sortDirection: string,
    selectedCategories: string[]
): Promise<fetchBooksResponse> => {
    try{
        const categoryParams = selectedCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join("&");
        const url = `${API_URL}/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortField}&sortDirection=${sortDirection}${selectedCategories.length ? `&${categoryParams}` : ""}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            bookResults: data.bookResults as Book[],
            totalBooks: data.totalBooks,
        };
    }
    catch (error) {
        console.error("Error fetching books:", error);
        throw new Error("Failed to fetch books");
    }
    
}

export const addBook = async (book: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
        });
        if (response.ok) {
            const addedBook = await response.json();
            return addedBook;
        } else {
            throw new Error("Failed to add book");
        }
    } catch (error) {
        console.error("Error adding book:", error);
        throw new Error("Failed to add book");
    }
}

export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });
        if (response.ok) {
            const updatedBook = await response.json();
            return updatedBook;
        } else {
            throw new Error("Failed to update book");
        }
    } catch (error) {
        console.error("Error updating book:", error);
        throw new Error("Failed to update book");
    }
}

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookID}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw new Error("Failed to delete book");
    }
}