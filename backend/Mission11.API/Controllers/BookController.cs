using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;
using System.Linq;

namespace Mission11.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        public BookController(BookDbContext context) => _context = context;

        [HttpGet("AllBooks")]
        public IActionResult Get(int pageSize, int pageNumber = 1, string sortBy = "title", string sortDirection = "asc", [FromQuery] List<string> category = null)
        {

            var query = _context.Books.AsQueryable();

            if (category != null && category.Any())
            {
                query = query.Where(p => category.Contains(p.Category));
            }

            query = sortBy.ToLower() switch
            {
                "title" => sortDirection.ToLower() == "asc"
                    ? query.OrderBy(b => b.Title)
                    : query.OrderByDescending(b => b.Title),

                "author" => sortDirection.ToLower() == "asc"
                    ? query.OrderBy(b => b.Author)
                    : query.OrderByDescending(b => b.Author),

                "price" => sortDirection.ToLower() == "asc"
                    ? query.OrderBy(b => b.Price)
                    : query.OrderByDescending(b => b.Price),

                // Default to title if an invalid sort field is provided
                _ => sortDirection.ToLower() == "asc"
                    ? query.OrderBy(b => b.Title)
                    : query.OrderByDescending(b => b.Title)
            };

            // Get total count before pagination
            var totalBooks = query.Count();

            // Apply pagination - note the fix here: using pageSize instead of pageNumber in Skip calculation
            var bookResults = query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { bookResults, totalBooks });
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(categories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book book)
        {
            _context.Books.Add(book);
            _context.SaveChanges();
            return Ok(book);
        }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int bookID,[FromBody] Book book)
        {
            var existingBook = _context.Books.Find(bookID);
            if (existingBook != null)
            {
                existingBook.Title = book.Title;
                existingBook.Author = book.Author;
                existingBook.Publisher = book.Publisher;
                existingBook.ISBN = book.ISBN;
                existingBook.Classification = book.Classification;
                existingBook.Category = book.Category;
                existingBook.PageCount = book.PageCount;
                existingBook.Price = book.Price;

                _context.Books.Update(existingBook);
                _context.SaveChanges();


                return Ok(existingBook);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete("DeleteBook/{BookID}")]
        public IActionResult DeleteBook(int BookID)
        {
            var book = _context.Books.Find(BookID);
            if (book != null)
            {
                _context.Books.Remove(book);
                _context.SaveChanges();
                return Ok(book);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
