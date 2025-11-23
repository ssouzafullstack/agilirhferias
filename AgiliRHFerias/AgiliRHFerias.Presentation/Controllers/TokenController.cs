using AgiliRHFerias.Presentation.ActionFilters;
using AgiliRHFerias.Service.Contracts;
using AgiliRHFerias.Shared.DataTransferObjects.Authentication;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AgiliRHFerias.Presentation.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IServiceManager _service;

        public TokenController(IServiceManager service)
        {
            _service = service;
        }

        [HttpPost("refresh")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenDto tokenDto)
        {
            var tokenDtoToReturn = await _service.AuthenticationService.RefreshToken(tokenDto);
            return Ok(tokenDtoToReturn);
        }
    }
}
