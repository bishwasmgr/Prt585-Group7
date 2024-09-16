using Microsoft.EntityFrameworkCore;

namespace First_API.Data
{
    public class ProductRepository
    {
        private readonly AppDbContext _appDbContext;
        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddPrductAsync(Product product)
        {
            await _appDbContext.Set<Product>().AddAsync(product);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Product>> GetProductsAsync()
        {
            return await _appDbContext.Products.ToListAsync();
        }
    }
}
