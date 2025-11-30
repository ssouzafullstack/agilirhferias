using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.EscalasFerias;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/escalaFerias")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class EscalaFeriasController : ControllerBase
    {
        private readonly IServiceManager _service;

        public EscalaFeriasController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.EscalaFeriasService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            EscalaFeriasForUpdateDto result = await _service.EscalaFeriasService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] EscalaFeriasForCreationDto escalaFeriasForCreation)
        {
            EscalaFeriasDto created = await _service.EscalaFeriasService.CreateAsync(escalaFeriasForCreation);
            return CreatedAtRoute("Get", new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] EscalaFeriasForUpdateDto escalaFeriasForUpdate)
        {
            await _service.EscalaFeriasService.UpdateAsync(id, escalaFeriasForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.EscalaFeriasService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
