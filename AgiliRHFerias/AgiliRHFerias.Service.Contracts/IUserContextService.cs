using AgiliRHFerias.Entities.Models;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AgiliRHFerias.Service.Contracts
{
    public interface IUserContextService
    {
        string? UserId { get; }
        string? UserName { get; }
        string? Email { get; }
        ClaimsPrincipal? Principal { get; }
        Task<User?> GetCurrentUserAsync();
    }
}
