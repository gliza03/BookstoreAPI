import { useEffect, useState } from "react";
import NewBookForm from "./NewBookForm";
import { deleteBook, fetchBooks } from "./api/booksAPI";
import Pagination from "./Pagination";
import { data } from "react-router-dom";
import EditBookForm from "./editBookForm";
import { useNavigate } from "react-router-dom";

const AdminBooksPage = () => {
    const navigate = useNavigate();

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1); // Use currentPage consistently
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalBooks, setTotalBooks] = useState<number>(0);
    const [sortField, setSortField] = useState<string>("title");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editBook, setEditBook] = useState<Book | null>(null);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to page 1 when page size changes
    };

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, currentPage, sortField, sortDirection, []);
                setBooks(data.bookResults);
                setTotalBooks(data.totalBooks);
                setTotalPages(Math.ceil(data.totalBooks / pageSize));
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, currentPage, sortField, sortDirection]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;
        try {
            await deleteBook(bookId);
            setBooks (books.filter((book) => book.bookID !== bookId));
        } catch (error: any) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading Books...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Admin Books Page</h1>
            <button className="btn btn-info" onClick={() => navigate('/')}>
                Return to View
            </button>

            {!showForm && (
                <button onClick={() => setShowForm(true)}>Add New Book</button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, currentPage, sortField, sortDirection, []).then(data => {
                            setBooks(data.bookResults);
                        });
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editBook && (
                <EditBookForm
                    Book={editBook}
                    onSuccess={() => {
                        setEditBook(null);
                        fetchBooks(pageSize, currentPage, sortField, sortDirection, []).then(data => {
                            setBooks(data.bookResults);
                        });
                    }}
                    onCancel={() => setEditBook(null)}
                />
            )}


            <table className="table table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.bookID}>
                            <td>{book.bookID}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publisher}</td>
                            <td>{book.isbn}</td>
                            <td>{book.classification}</td>
                            <td>{book.category}</td>
                            <td>{book.pageCount}</td>
                            <td>{book.price}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => setEditBook(book)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(book.bookID)} >Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </div>
    );
};

export default AdminBooksPage;