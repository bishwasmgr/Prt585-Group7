using LibraryManagement.Data;
using LibraryManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BookController(LibraryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpPost("request-loan/{id}")]
        public async Task<IActionResult> RequestLoan(int id, [FromBody] int studentId)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null || !book.IsAvailable)
                return NotFound("Book not available");

            if (book.NumberOfCopies > 0)
            {
                var request = new BookRequest
                {
                    BookId = id,
                    StudentId = studentId,
                    RequestDate = DateTime.Now
                };

                _context.BookRequests.Add(request);
                book.NumberOfCopies--;
                await _context.SaveChangesAsync();

                return Ok("Book loan requested successfully");
            }

            return BadRequest("No copies available for loan");
        }
    }
}
