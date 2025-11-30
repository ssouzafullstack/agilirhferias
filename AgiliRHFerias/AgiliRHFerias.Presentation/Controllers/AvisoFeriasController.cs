using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.AvisosFerias;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/avisoFerias")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class AvisoFeriasController : ControllerBase
    {
        private readonly IServiceManager _service;

        public AvisoFeriasController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.AvisoFeriasService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            AvisoFeriasForUpdateDto result = await _service.AvisoFeriasService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] AvisoFeriasForCreationDto AvisoFeriasForCreation)
        {
            AvisoFeriasDto created = await _service.AvisoFeriasService.CreateAsync(AvisoFeriasForCreation);
            return CreatedAtRoute("Get", new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] AvisoFeriasForUpdateDto AvisoFeriasForUpdate)
        {
            await _service.AvisoFeriasService.UpdateAsync(id, AvisoFeriasForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.AvisoFeriasService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
