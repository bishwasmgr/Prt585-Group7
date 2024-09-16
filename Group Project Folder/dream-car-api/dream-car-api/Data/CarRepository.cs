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

        //update-a-car

        public async Task UpdateCarAsync(int id, Car model)
        {
            var car = await _appDbContext.Cars.FindAsync(id);
            if (car == null)
            {
                throw new Exception("Car not found!");
            }
            car.carName = model.carName;
            car.price = model.price;
            car.carDescription = model.carDescription;
            car.model = model.model;

            await _appDbContext.SaveChangesAsync();
        }

        //delete-a-car
        public async Task DeleteCarAsync(int id)
        {
            var car = await _appDbContext.Cars.FindAsync(id);
            if (car == null)
            {
                throw new Exception("Car not found!");
            }
            _appDbContext.Cars.Remove(car);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
