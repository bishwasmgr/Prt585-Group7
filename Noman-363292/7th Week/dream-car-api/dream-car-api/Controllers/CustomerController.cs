using dream_car_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace dream_car_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerRepository _customerRepository;

        public CustomerController(CustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpPost]

        public async Task<ActionResult> AddNewCustomerAsync([FromBody] Customer model)
        {
            await _customerRepository.AddNewCustomerAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCustomerAsync()
        {
            var customerList = await _customerRepository.GetAllCustomerAsync();
            return Ok(customerList);
        }
    }
}
