using Microsoft.EntityFrameworkCore;

namespace dream_car_api.Data
{
    public class CustomerRepository
    {
        private readonly AppDbContext _appDbContext;

        public CustomerRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        //add-a-new-customer
        public async Task AddNewCustomerAsync(Customer customer)
        {
            await _appDbContext.Set<Customer>().AddAsync(customer);
            await _appDbContext.SaveChangesAsync();
        }

        //get-all-customer
        public async Task<List<Customer>> GetAllCustomerAsync()
        {
            return await _appDbContext.Customers.ToListAsync();
        }
    }
}
