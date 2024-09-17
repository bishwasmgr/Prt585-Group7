using LibraryManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookRequest> BookRequests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed admin user
            modelBuilder.Entity<Student>().HasData(
                new Student
                {
                    Id = 1,
                    StudentId = "A12345",
                    Name = "Admin",
                    Password = "admin123", // In a real app, password should be hashed
                    Role = "Admin"
                }
            );
        }
    }
}
