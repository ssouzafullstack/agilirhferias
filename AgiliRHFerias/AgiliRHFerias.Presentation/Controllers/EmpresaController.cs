using AgiliRHFerias.Service.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/empresa")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class EmpresaController : ControllerBase
    {
        private readonly IServiceManager _service;

        public EmpresaController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.EmpresaService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }
    }
}
