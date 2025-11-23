using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsReducaoDiasFerias;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/configReducaoDiasFerias")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class ConfigReducaoDiasFeriasController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ConfigReducaoDiasFeriasController(IServiceManager service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.ConfigReducaoDiasFeriasService.GetAsync(trackChanges: false);
            return Ok(result);
        }


        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] ConfigReducaoDiasFeriasForUpdateDto config)
        {
            await _service.ConfigReducaoDiasFeriasService.UpdateAsync(id, config, trackChanges: true);
            return NoContent();
        }
    }
}
