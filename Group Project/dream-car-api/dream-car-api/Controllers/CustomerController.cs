﻿using dream_car_api.Data;
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

        [HttpGet("{id}")]
        public async Task<ActionResult> GetCustomerByIdAsync([FromRoute] int id)
        {
            var car = await _customerRepository.GetCustomerByIdAysnc(id);
            return Ok(car);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomerAsync([FromRoute] int id, [FromBody] Customer model)
        {
            await _customerRepository.UpdateCustomerAsync(id, model);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomerAsync([FromRoute] int id)
        {
            await _customerRepository.DeleteCustomerAsync(id);
            return Ok();
        }
    }
}
