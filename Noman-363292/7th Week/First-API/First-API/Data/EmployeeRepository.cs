using Microsoft.EntityFrameworkCore;

namespace First_API.Data
{
    public class EmployeeRepository
    {
        private readonly AppDbContext _appDbContext;
        public EmployeeRepository(AppDbContext appDbContext) 
        {
            _appDbContext = appDbContext;
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            await _appDbContext.Set<Employee>().AddAsync(employee);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Employee>> GetAllEmployeeAsync()
        {
            return await _appDbContext.Employees.ToListAsync();
        }
    }
}
