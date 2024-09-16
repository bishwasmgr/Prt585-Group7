using First_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace First_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductRepository _productRepository;

        public ProductController(ProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpPost]
        public async Task<ActionResult> AddPrductAsync([FromBody] Product model)
        {
            await _productRepository.AddPrductAsync(model);
            return Ok();
        }

        [HttpGet]

        public async Task<ActionResult> GetProductsAsync()
        {
            var productList = await _productRepository.GetProductsAsync();
            return Ok(productList);
        }
    }
}
