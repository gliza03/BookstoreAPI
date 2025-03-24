import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<string>("title");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    useEffect(() => {
        const fetchBooks = async () => {
            // Add sort parameters to the API request
            const url = `http://localhost:5196/api/Book/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortField}&sortDirection=${sortDirection}`;
            
            try {
                const response = await fetch(url);
                const data = await response.json();
                setBooks(data.bookResults);
                setTotalBooks(data.totalBooks);
                // Calculate total pages based on total books and page size
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
                // If the API doesn't support sorting, we could implement client-side sorting here
                // This is a fallback in case the API doesn't support the sort parameters
            }
        };
        fetchBooks();
    }, [pageSize, pageNumber, sortField, sortDirection]);
    
    const handlePrevious = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    const handleNext = () => {
        if (pageNumber < totalPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const handleSort = (field: string) => {
        // If clicking on the same field, toggle direction
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            // If clicking on a new field, set it as the sort field and default to ascending
            setSortField(field);
            setSortDirection("asc");
        }
        // Reset to first page when sorting changes
        setPageNumber(1);
    };

    // Helper function to display sort indicators
    const getSortIndicator = (field: string) => {
        if (sortField === field) {
            return sortDirection === "asc" ? " ↑" : " ↓";
        }
        return "";
    };

    return (
        <>
            <h1>Books</h1>
            
            {/* Sorting controls */}
            <div className="sorting-controls">
                <span>Sort by: </span>
                <button 
                    onClick={() => handleSort("title")}
                    className={sortField === "title" ? "active-sort" : ""}
                >
                    Title{getSortIndicator("title")}
                </button>
                <button 
                    onClick={() => handleSort("author")}
                    className={sortField === "author" ? "active-sort" : ""}
                >
                    Author{getSortIndicator("author")}
                </button>
                <button 
                    onClick={() => handleSort("price")}
                    className={sortField === "price" ? "active-sort" : ""}
                >
                    Price{getSortIndicator("price")}
                </button>
            </div>
            
            {books.map((book) => (
                <div key={book.bookID} className="card">
                    <h3 className="card-title">
                        {book.title} by {book.author}
                    </h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Publisher:</strong> {book.publisher}</li>
                            <li><strong>ISBN:</strong> {book.isbn}</li>
                            <li><strong>Classification:</strong> {book.classification}</li>
                            <li><strong>Category:</strong> {book.category}</li>
                            <li><strong>Page Count:</strong> {book.pageCount}</li>
                            <li><strong>Price:</strong> {book.price}</li>
                        </ul>
                    </div>
                </div>
            ))}

            <br />

            <button onClick={handlePrevious} disabled={pageNumber <= 1}>Previous</button>
            {
                [...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index} 
                        onClick={() => setPageNumber(index + 1)}
                        style={{fontWeight: pageNumber === index + 1 ? 'bold' : 'normal'}}
                    >
                        {index + 1}
                    </button>
                ))
            }
            <button onClick={handleNext} disabled={pageNumber >= totalPages}>Next</button>

            <br />

            <label>
                Results per page:
                <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </label>
        </>
    );
}

export default Books;
