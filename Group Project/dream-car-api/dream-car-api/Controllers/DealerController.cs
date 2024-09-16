using dream_car_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dream_car_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DealerController : ControllerBase
    {
        private readonly DealerRepository _dealerRepository;

        public DealerController(DealerRepository dealerRepository)
        {
            _dealerRepository = dealerRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddNewDealerAsync([FromBody] Dealer model)
        {
            await _dealerRepository.AddNewDealerAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllDealersAsync()
        {
            var dealerList = await _dealerRepository.GetAllDealersAsync();
            return Ok(dealerList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetDealerByIdAsync([FromRoute] int id)
        {
            var dealer = await _dealerRepository.GetDealerByIdAsync(id);
            return Ok(dealer);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDealerAsync([FromRoute] int id, [FromBody] Dealer model)
        {
            await _dealerRepository.UpdateDealerAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDealerAsync([FromRoute] int id)
        {
            await _dealerRepository.DeleteDealerAsync(id);
            return Ok();
        }
    }
}
