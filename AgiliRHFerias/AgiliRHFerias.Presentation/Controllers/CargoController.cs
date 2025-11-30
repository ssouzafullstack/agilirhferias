using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Cargos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/cargo")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class CargoController : ControllerBase
    {
        private readonly IServiceManager _service;

        public CargoController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.CargoService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            CargoForUpdateDto result = await _service.CargoService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] CargoForCreationDto cargoForCreation)
        {
            CargoDto created = await _service.CargoService.CreateAsync(cargoForCreation);
            return CreatedAtRoute("Get", new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] CargoForUpdateDto cargoForUpdate)
        {
            await _service.CargoService.UpdateAsync(id, cargoForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.CargoService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
