using Microsoft.EntityFrameworkCore;

namespace First_API.Data
{
    public class ShareHolderRepository
    {
        private readonly AppDbContext _appDbContext;
        public ShareHolderRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task AddShareHolderAsync(ShareHolder shareHolder)
        {
            await _appDbContext.Set<ShareHolder>().AddAsync(shareHolder);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<ShareHolder>> GetAllShareHolderAsync()
        {
            return await _appDbContext.ShareHolders.ToListAsync();
        }
    }
}
