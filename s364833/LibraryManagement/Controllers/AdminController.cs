using LibraryManagement.Data;
using LibraryManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly LibraryContext _context;

        public AdminController(LibraryContext context)
        {
            _context = context;
        }

        // Add a new book (Admin only)
        [HttpPost("add-book")]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            var admin = await _context.Students.FirstOrDefaultAsync(s => s.Role == "Admin");
            if (admin == null)
            {
                return Unauthorized("Only admins can add books.");
            }

            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return Ok("Book added successfully");
        }

        // Update book information
        [HttpPut("update-book/{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.ISBN = updatedBook.ISBN;
            book.NumberOfCopies = updatedBook.NumberOfCopies;

            await _context.SaveChangesAsync();
            return Ok("Book updated successfully");
        }

        // Delete a book
        [HttpDelete("delete-book/{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null) return NotFound();

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return Ok("Book deleted successfully");
        }

        // View all book requests
        [HttpGet("view-requests")]
        public async Task<IActionResult> ViewRequests()
        {
            var requests = await _context.BookRequests
                .Include(br => br.Book)
                .Include(br => br.Student)
                .ToListAsync();

            return Ok(requests);
        }
    }
}
