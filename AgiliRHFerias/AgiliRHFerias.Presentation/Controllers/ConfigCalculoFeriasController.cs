using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsCalculoFerias;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/configCalculoFerias")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class ConfigCalculoFeriasController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ConfigCalculoFeriasController(IServiceManager service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.ConfigCalculoFeriasService.GetAsync(trackChanges: false);
            return Ok(result);
        }


        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] ConfigCalculoFeriasForUpdateDto configCalculoFerias)
        {
            await _service.ConfigCalculoFeriasService.UpdateAsync(id, configCalculoFerias, trackChanges: true);
            return NoContent();
        }
    }
}
