using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsOrcamentoFerias;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/configOrcamentoFerias")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class ConfigOrcamentoFeriasController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ConfigOrcamentoFeriasController(IServiceManager service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _service.ConfigOrcamentoFeriasService.GetAsync(trackChanges: false);
            return Ok(result);
        }


        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] ConfigOrcamentoFeriasForUpdateDto config)
        {
            await _service.ConfigOrcamentoFeriasService.UpdateAsync(id, config, trackChanges: true);
            return NoContent();
        }
    }
}
