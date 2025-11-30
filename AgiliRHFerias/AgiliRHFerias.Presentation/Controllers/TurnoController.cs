using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Turnos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/turnoTrabalho")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class TurnoController : ControllerBase
    {
        private readonly IServiceManager _service;

        public TurnoController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.TurnoService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            TurnoForUpdateDto result = await _service.TurnoService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] TurnoForCreationDto turnoForCreation)
        {
            TurnoDto created = await _service.TurnoService.CreateAsync(turnoForCreation);
            return CreatedAtRoute("Get", new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] TurnoForUpdateDto turnoForUpdate)
        {
            await _service.TurnoService.UpdateAsync(id, turnoForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.TurnoService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
