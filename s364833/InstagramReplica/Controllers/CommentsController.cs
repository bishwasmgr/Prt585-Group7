using Microsoft.AspNetCore.Mvc;
using InstagramReplica.Data;
using InstagramReplica.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;  // For IEnumerable<>
using System.Threading.Tasks;      // For Task<>

namespace InstagramReplica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CommentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Comment>> CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetComments), new { id = comment.Id }, comment);
        }
    }
}
