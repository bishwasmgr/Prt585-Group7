using dream_car_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dream_car_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly CarRepository _carRepository;

        public CarController(CarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddNewCarAsync([FromBody] Car model)
        {
            await _carRepository.AddNewCarAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCarAsync()
        {
            var carList = await _carRepository.GetAllCarsAsync();
            return Ok(carList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCarByIdAsync([FromRoute] int id)
        {
            var car = await _carRepository.GetCarByIdAysnc(id);
            return Ok(car);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCarAsync([FromRoute] int id, [FromBody] Car model)
        {
            await _carRepository.UpdateCarAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCarAsync([FromRoute] int id)
        {
            await _carRepository.DeleteCarAsync(id);
            return Ok();
        }
    }
}
