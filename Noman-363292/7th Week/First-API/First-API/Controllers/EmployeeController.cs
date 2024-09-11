using First_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace First_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeRepository _employeeRepository;

        public EmployeeController(EmployeeRepository employeeRepository) 
        {
            _employeeRepository = employeeRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddEmployeeAsync([FromBody] Employee model)
        {
            await _employeeRepository.AddEmployeeAsync(model);
            return Ok();
        }

        [HttpGet]

        public async Task<ActionResult> GetEmployeeListAsync()
        {
            var employeeList =await _employeeRepository.GetAllEmployeeAsync();
            return Ok(employeeList);
        }
    }
}
