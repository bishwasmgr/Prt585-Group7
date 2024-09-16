using Microsoft.EntityFrameworkCore;

namespace dream_car_api.Data
{
    public class DealerRepository
    {
        private readonly AppDbContext _appDbContext;

        public DealerRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Add new dealer
        public async Task AddNewDealerAsync(Dealer dealer)
        {
            await _appDbContext.Set<Dealer>().AddAsync(dealer);
            await _appDbContext.SaveChangesAsync();
        }

        // Get all dealers
        public async Task<List<Dealer>> GetAllDealersAsync()
        {
            return await _appDbContext.Dealers.ToListAsync();
        }

        // Get single dealer by ID
        public async Task<Dealer> GetDealerByIdAsync(int id)
        {
            return await _appDbContext.Dealers.FindAsync(id);
        }

        // Update an existing dealer
        public async Task UpdateDealerAsync(int id, Dealer model)
        {
            var dealer = await _appDbContext.Dealers.FindAsync(id);
            if (dealer == null)
            {
                throw new Exception("Dealer not found!");
            }
            dealer.DealerName = model.DealerName;
            dealer.Address = model.Address;
            dealer.Email = model.Email;
            dealer.Phone = model.Phone;

            await _appDbContext.SaveChangesAsync();
        }

        // Delete a dealer
        public async Task DeleteDealerAsync(int id)
        {
            var dealer = await _appDbContext.Dealers.FindAsync(id);
            if (dealer == null)
            {
                throw new Exception("Dealer not found!");
            }
            _appDbContext.Dealers.Remove(dealer);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
