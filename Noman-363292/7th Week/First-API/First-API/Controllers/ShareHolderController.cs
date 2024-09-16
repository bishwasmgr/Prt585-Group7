using First_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace First_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShareHolderController : ControllerBase
    {
        private readonly ShareHolderRepository _ShareHolderRepository;

        public ShareHolderController(ShareHolderRepository shareHolderRepository)
        {
            _ShareHolderRepository = shareHolderRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddShareHolderAsync([FromBody] ShareHolder model)
        {
            await _ShareHolderRepository.AddShareHolderAsync(model);
            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetShareHolderAsync()
        {
            var employeeList = await _ShareHolderRepository.GetAllShareHolderAsync();
            return Ok(employeeList);
        }
    }
}
