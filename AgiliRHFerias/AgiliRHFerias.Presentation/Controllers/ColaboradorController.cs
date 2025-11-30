using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Colaboradores;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/colaborador")]
    [ApiController]
    [Authorize]
    [Authorize(Roles = "Manager")]
    public class ColaboradorController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ColaboradorController(IServiceManager service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.ColaboradorService.GetAllAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            ColaboradorForUpdateDto result = await _service.ColaboradorService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] ColaboradorForCreationDto colaboradorForCreation)
        {
            ColaboradorDto created = await _service.ColaboradorService.CreateAsync(colaboradorForCreation);
            return CreatedAtRoute("Get", new { id = created.Id }, created);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] ColaboradorForUpdateDto colaboradorForUpdate)
        {
            await _service.ColaboradorService.UpdateAsync(id, colaboradorForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.ColaboradorService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
