using Microsoft.EntityFrameworkCore;

namespace dream_car_api.Data
{
    public class CarRepository
    {
        private readonly AppDbContext _appDbContext;

        public CarRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        //add-car-function
        public async Task AddNewCarAsync(Car car)
        {
            await _appDbContext.Set<Car>().AddAsync(car);
            await _appDbContext.SaveChangesAsync();
        }

        //get-all-car

        public async Task<List<Car>> GetAllCarsAsync()
        {
            return await _appDbContext.Cars.ToListAsync();
        }

        //get-single-car-by-id
        public async Task<Car> GetCarByIdAysnc(int id)
        {
            return await _appDbContext.Cars.FindAsync(id);
        }
    }
}
