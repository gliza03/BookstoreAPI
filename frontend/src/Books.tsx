import { useEffect, useState } from "react";
import { Book } from "./types/Book";
import { useNavigate } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { CartItem } from "./types/CartItem";
import { fetchBooks } from "./api/booksAPI";
import Pagination from "./Pagination";

function Books({ selectedCategories }: { selectedCategories: string[] }) {
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortField, setSortField] = useState<string>("title");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { addItem } = useCart();

    const handleAddToCart = (book: Book) => {
        const newItem: CartItem = {
            bookID: book.bookID,
            title: book.title,
            author: book.author,
            price: book.price,
            publisher: book.publisher,
            isbn: book.isbn,
            classification: book.classification,
            category: book.category,
            pageCount: book.pageCount,
        };
        addItem(newItem);
        navigate("/cart");
    };

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNumber, sortField, sortDirection, selectedCategories);
                setBooks(data.bookResults);
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();

        setShowAlert(true);
        const timer = setTimeout(() => setShowAlert(false), 1500);
        return () => clearTimeout(timer);
    }, [pageSize, pageNumber, sortField, sortDirection, selectedCategories]);

    if (loading) {
        return <div>Loading Books...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSort = (field: string) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
        setPageNumber(1); // Reset to first page when sorting
    };

    const getSortIndicator = (field: string) => {
        if (sortField === field) {
            return sortDirection === "asc" ? " ↑" : " ↓";
        }
        return "";
    };

    return (
        <>
            {showAlert && (
                <div className="alert alert-success" role="alert">
                    Filter has been applied
                </div>
            )}

                <button className="btn btn-success" onClick={() => navigate('/adminbooks')}>
                    Go to Admin Page
                </button>

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

            {books.length === 0 ? (
                <div>No books found</div>
            ) : (
                books.map((book) => (
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
                        <button className="btn btn-warning" onClick={() => handleAddToCart(book)}>
                            Add to Cart
                        </button>
                        <button className="btn btn-info" onClick={() => navigate('/cart')}>
                            View Cart
                        </button>
                    </div>
                ))
            )}

            <br />
            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(page) => setPageNumber(page)}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageNumber(1);
                }}
            />
        </>
    );
}

export default Books;