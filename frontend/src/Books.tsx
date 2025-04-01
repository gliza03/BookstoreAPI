import { useEffect, useState } from "react";
import { Book } from "./types/Book";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { CartItem } from "./types/CartItem";

function Books({ selectedCategories }: { selectedCategories: string[] }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [, setTotalBooks] = useState<number>(0); // Remove unused 'totalBooks'
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<string>("title");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [showAlert, setShowAlert] = useState<boolean>(false); // State for alert visibility

    const { addItem } = useCart();
    const { bookID } = useParams<{ bookID: string }>(); // Correctly destructure 'useParams'

    const handleAddToCart = (book: Book) => {
        const newItem: CartItem = {
            bookID: book.bookID,
            title: book.title,
            author: book.author,
            price: book.price,
        };
        addItem(newItem);
        navigate("/cart");
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `category=${encodeURIComponent(cat)}`).join("&");

            // Add sort parameters to the API request
            const url = `http://localhost:5196/api/Book/AllBooks?pageSize=${pageSize}&pageNumber=${pageNumber}&sortBy=${sortField}&sortDirection=${sortDirection}${selectedCategories.length ? `&${categoryParams}` : ""}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setBooks(data.bookResults);
                setTotalBooks(data.totalBooks);
                // Calculate total pages based on total books and page size
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();

        // Show alert when filters are applied
        setShowAlert(true);
        const timer = setTimeout(() => setShowAlert(false), 1500); // Hide alert after 1.5 seconds
        return () => clearTimeout(timer); // Cleanup timeout
    }, [pageSize, pageNumber, sortField, sortDirection, selectedCategories]);

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
            {/* Bootstrap Alert */}
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Filter has been applied
                </div>
            )}

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
                    <button className='btn btn-warning' onClick={() => handleAddToCart(book)}>Add to Cart</button>

                    <button className='btn btn-info' onClick={() => navigate('/cart')}>View Cart</button>
                </div>
            ))}

            <br />

            <button onClick={handlePrevious} disabled={pageNumber <= 1}>Previous</button>
            {
                [...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setPageNumber(index + 1)}
                        style={{ fontWeight: pageNumber === index + 1 ? 'bold' : 'normal' }}
                    >
                        {index + 1}
                    </button>
                ))
            }
            <button onClick={handleNext} disabled={pageNumber >= totalPages}>Next</button>
            <br />

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
