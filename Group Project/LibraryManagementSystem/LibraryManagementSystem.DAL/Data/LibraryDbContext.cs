using Microsoft.EntityFrameworkCore;
using LibraryManagementSystem.DAL.Models;

namespace LibraryManagementSystem.DAL.Data
{
    public class LibraryDbContext : DbContext
    {
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
