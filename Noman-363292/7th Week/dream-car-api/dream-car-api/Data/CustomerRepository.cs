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

        //get-customer-by-id
        public async Task<Customer> GetCustomerByIdAysnc(int id)
        {
            return await _appDbContext.Customers.FindAsync(id);
        }

        //update-a-customer
        public async Task UpdateCustomerAsync(int id, Customer model)
        {
            var customer = await _appDbContext.Customers.FindAsync(id);
            if (customer == null)
            {
                throw new Exception("Customer not found!");
            }
            customer.Name = model.Name;
            customer.Address = model.Address;
            customer.phone = model.phone;

            await _appDbContext.SaveChangesAsync();
        }

        //delete-a-car
        public async Task DeleteCustomerAsync(int id)
        {
            var customer = await _appDbContext.Customers.FindAsync(id);
            if (customer == null)
            {
                throw new Exception("Customer not found!");
            }
            _appDbContext.Customers.Remove(customer);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
