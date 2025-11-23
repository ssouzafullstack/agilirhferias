using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.ConfigsPeriodoAquisitivo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/configPeriodoAquisitivo")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class ConfigPeriodoAquisitivoController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ConfigPeriodoAquisitivoController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet(Name = "GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.ConfigPeriodoAquisitivoService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}", Name = "Get")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _service.ConfigPeriodoAquisitivoService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] ConfigPeriodoAquisitivoForCreationDto configPeriodoAquisitivo)
        {
            var createdConfig = await _service.ConfigPeriodoAquisitivoService.CreateAsync(configPeriodoAquisitivo);
            return CreatedAtRoute("Get", new { id = createdConfig.Id }, createdConfig);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] ConfigPeriodoAquisitivoForUpdateDto configPeriodoAquisitivo)
        {
            await _service.ConfigPeriodoAquisitivoService.UpdateAsync(id, configPeriodoAquisitivo, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.ConfigPeriodoAquisitivoService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
