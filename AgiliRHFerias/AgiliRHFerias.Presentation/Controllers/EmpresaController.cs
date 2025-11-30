using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Empresas;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpGet("combobox")]
        public async Task<IActionResult> GetCombobox()
        {
            var result = await _service.EmpresaService.GetComboboxAsync(trackChanges: false);
            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var result = await _service.EmpresaService.GetAsync(id, trackChanges: false);
            return Ok(result);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create([FromBody] EmpresaForCreationDto empresaForCreation)
        {
            EmpresaDto createdEmpresa = await _service.EmpresaService.CreateAsync(empresaForCreation);
            return CreatedAtRoute("Get", new { id = createdEmpresa.Id }, createdEmpresa);
        }

        [HttpPut("{id:guid}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(Guid id, [FromBody] EmpresaForUpdateDto empresaForUpdate)
        {
            await _service.EmpresaService.UpdateAsync(id, empresaForUpdate, trackChanges: true);
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.EmpresaService.DeleteAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
