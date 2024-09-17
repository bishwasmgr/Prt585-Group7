using LibraryManagement.Data;
using LibraryManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly LibraryContext _context;

        public StudentController(LibraryContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return Ok(student);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Student loginData)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.StudentId == loginData.StudentId && s.Password == loginData.Password);

            if (student == null)
                return Unauthorized("Invalid login credentials");

            return Ok("Login successful");
        }

        [HttpGet("{id}/request-history")]
        public async Task<IActionResult> RequestHistory(int id)
        {
            var requests = await _context.BookRequests
                .Where(br => br.StudentId == id)
                .Include(br => br.Book)
                .ToListAsync();

            return Ok(requests);
        }
    }
}
