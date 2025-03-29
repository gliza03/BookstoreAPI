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
        public IActionResult Get(int pageSize, int pageNumber = 1, string sortBy = "title", string sortDirection = "asc")
        {
            var query = _context.Books.AsQueryable();
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
    }
}
