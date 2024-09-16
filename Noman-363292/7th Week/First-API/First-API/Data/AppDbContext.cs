using Microsoft.EntityFrameworkCore;

namespace First_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        
        public DbSet<ShareHolder> ShareHolders { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
