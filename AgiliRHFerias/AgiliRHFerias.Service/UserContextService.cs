using AgiliRHFerias.Entities.Models;
using AgiliRHFerias.Service.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public UserContextService(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }

        public ClaimsPrincipal? Principal => _httpContextAccessor.HttpContext?.User;

        public string? UserId => Principal?.FindFirstValue(ClaimTypes.NameIdentifier);
        public string? UserName => Principal?.Identity?.Name;
        public string? Email => Principal?.FindFirstValue(ClaimTypes.Email);

        public async Task<User?> GetCurrentUserAsync()
        {
            if (Principal == null || !Principal.Identity?.IsAuthenticated == true)
                return null;

            return await _userManager.GetUserAsync(Principal);
        }
    }
}
